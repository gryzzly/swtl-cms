/**
 * This is the JavaScript entry point of the application.
 *
 * Here’s how we get to execute its code:
 * First, user loads the index.html file. This index.html is built from
 * src/index.html.tpl in the github action. That file contains the setup
 * code for initializing the service worker (registering the service worker
 * and passing custom configuration).
 *
 * During the build, environment variables are replaced with the custom values –
 *
 * SWTL_CMS_GITHUB_USER
 * SWTL_CMS_GITHUB_REPO
 * SWTL_CMS_CONFIG_FILE
 * SWTL_CMS_CONTENT_FILE
 *
 * This allows setting which repository will be used, and what file names
 * to use for storing the config and the content. Github user  and repo *must*
 * be set, the config and content have reasonable defaults, so can be omitted.
 *
 * Once the service worker code below is executed, the admin service worker will
 * take over network events and manage the routing based on the CMS configuration.
 */
import { html, Router } from "swtl";
import { Octokit } from "@octokit/rest";
import "urlpattern-polyfill";
import { set as setStore, get as getStore } from "./vendor/idb-keyval.js";

// Import modularized components
import { getContentManager } from "./services/content-manager.js";
import { WidgetManager } from "./services/widget-manager.js";
import { GithubSync } from "./services/github-sync.js";
import { Auth } from "./services/auth.js";
import { ApiHandlers } from "./services/api-handlers.js";
import { generateRoutes } from "./routes/index.js";
import { SyncStatus } from "./components/sync-status.js";
import { Html } from "./pages/Html.js";

// Get base path for the service worker
const BASEPATH = self.location.pathname.replace(/\/sw\.js$/, "");

// Save basepath for the components to use
setStore("basepath", BASEPATH);

// Initialize service managers
const contentManager = getContentManager();
const widgetManager = new WidgetManager();
const authManager = new Auth();

// Initialize Github sync service (with lazy initialization)
let githubSyncInstance = null;
const getGithubSync = async () => {
  if (!githubSyncInstance) {
    const token = await authManager.getToken();
    if (!token) return null;

    const octokit = new Octokit({ auth: token });
    const config = await getStore("config");
    githubSyncInstance = new GithubSync(octokit, config, contentManager);
  }
  return githubSyncInstance;
};

// Initialize API handlers
const apiHandlers = new ApiHandlers({
  BASEPATH,
  contentManager,
  getGithubSync,
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

/**
 * SW activation handler:
 * - Takes immediate control of all pages (claim)
 * - Notifies all open tabs that SW is ready
 * - Prevents SW termination until complete (waitUntil)
 */
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
  // "authorised" is fired in routes/login.js in the
  if (data.event === "authorised") {
    await authManager.setToken(data.token);
    // Reset Github sync instance when token changes
    githubSyncInstance = null;
    // "config" is fired within the "shell" index.html that installs the service
    // worker, it passes the ENV variable values to the application
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
