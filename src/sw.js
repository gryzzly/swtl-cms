import { html, Router } from "swtl";
import { Octokit } from "@octokit/rest";
import "urlpattern-polyfill";
import { set, get, del } from "./vendor/idb-keyval.js";
import { b64EncodeUnicode, b64DecodeUnicode } from "./utils.js";

// Import modularized components
import { getContentManager } from "./services/content-manager.js";
import { WidgetManager } from "./services/widget-manager.js";
import { GithubSync } from "./services/github-sync.js";
import { Auth } from "./services/auth.js";
import { ApiHandlers } from "./services/api-handlers.js";
import { generateRoutes } from "./routes/index.js";
import { SyncStatus } from "./components/sync-status.js";
import { Html } from "./pages/Html.js";

// Configuration constants
const GITHUB_CONFIG = {
  paths: {
    config: "config.json",
    content: "content.json",
  },
};

// Get base path for the service worker
const BASEPATH = self.location.pathname.replace(/\/sw\.js$/, "");

set("basepath", BASEPATH);

// Initialize service managers
const contentManager = getContentManager();
const widgetManager = new WidgetManager(get, set, BASEPATH);
const authManager = new Auth(get, set, del);

// Initialize Github sync service (with lazy initialization)
let githubSyncInstance = null;
const getGithubSync = async () => {
  if (!githubSyncInstance) {
    const token = await authManager.getToken();
    if (!token) return null;

    const octokit = new Octokit({ auth: token });
    const config = await get("config");
    githubSyncInstance = new GithubSync(
      octokit,
      config,
      contentManager,
      GITHUB_CONFIG,
    );
  }
  return githubSyncInstance;
};

// Initialize API handlers
const apiHandlers = new ApiHandlers({
  BASEPATH,
  contentManager,
  getGithubSync,
  set,
});

// Create router with all routes
const router = new Router({
  baseHref: BASEPATH,
  routes: generateRoutes({
    Html,
    SyncStatus,
    contentManager,
    widgetManager,
    authManager,
  }),
});

// Service Worker event listeners
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    clients.claim().then(() => {
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) =>
          client.postMessage({ type: "SW_ACTIVATED" }),
        );
      });
    }),
  );
});

// Define URL pattern for remote scripts
const remoteScriptPattern = new URLPattern(
  `${BASEPATH}/remote/{:scriptId}.js`,
  self.location.origin,
);

// Handle remote script requests
self.addEventListener("fetch", async (event) => {
  const scriptMatch = remoteScriptPattern.exec(event.request.url);
  if (scriptMatch) {
    event.respondWith(widgetManager.handleScriptRequest(scriptMatch));
    return;
  }
});

// Handle API POST requests
self.addEventListener("fetch", async (event) => {
  if (apiHandlers.isApiRequest(event.request)) {
    event.respondWith(apiHandlers.handleRequest(event));
    return;
  }
});

// Message handlers for authorization and configuration
self.addEventListener("message", async ({ data }) => {
  if (data.event === "authorised") {
    await authManager.setToken(data.token);
    // Reset Github sync instance when token changes
    githubSyncInstance = null;
  } else if (data.event === "config") {
    await set("config", data.config);
    // Reset Github sync instance when config changes
    githubSyncInstance = null;
  }
});

// Default fetch handler for navigation requests
self.addEventListener("fetch", async (event) => {
  const url = new URL(event.request.url);
  const staticFileExtensions = [
    ".css",
    ".js",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".svg",
    ".ico",
    ".woff",
    ".woff2",
    ".ttf",
    ".otf",
    ".eot",
    ".mp3",
    ".mp4",
    ".webp",
    ".webm",
  ];

  const isStaticFile = staticFileExtensions.some((ext) =>
    url.pathname.endsWith(ext),
  );

  if (event.request.mode === "navigate" && !isStaticFile) {
    event.respondWith(router.handleRequest(event.request));
  }
});
