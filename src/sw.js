import { html, Router } from "swtl";
import { Html } from "./pages/Html.js";
import { Octokit } from "@octokit/rest";
import "urlpattern-polyfill";

import { set, get } from "./vendor/idb-keyval.js";

// TODOS:
// - [x] Add simple image field
//  - Does it simply upload to github? If so, show the image from memory until
// the hooks built the site and the image become available via a URL
// - [x] Add a polyfill for Safari and Firefox for the URLPattern stuff
//
// IDEAS:
// 1. When editing pages, add UI to select a collection to render on that page.
// 2. Make running adming independent of connection to github if config and content are present?
// What’s the simplest way to offer a sync?

// FIXME: deletion of database breaks sw

import { b64EncodeUnicode, b64DecodeUnicode } from "./utils.js";


let config = {};

const GITHUB_CONFIG = {
  paths: {
    config: 'config.json',
    content: 'content.json'
  }
}

// self.location.pathname is /admin/sw.js, so we remove the filename
// to get the containing directory
const BASEPATH = self.location.pathname.replace(/\/sw\.js$/, '');

function escapeHTML(html) {
  return html.replace(/&/g, '&amp;')
             .replace(/</g, '&lt;')
             .replace(/>/g, '&gt;')
             .replace(/"/g, '&quot;')
             .replace(/'/g, '&#039;');
}

function mergeContents(localContent, remoteContent) {
  // Create new content object
  const mergedContent = {
    lastModified: Math.max(localContent.lastModified, remoteContent.lastModified),
    collections: {},
    // Track deletions with timestamps { id: timestamp }
    deletedIds: {
      ...(localContent.deletedIds || {}),
      ...(remoteContent.deletedIds || {})
    }
  };

  // Clean up old deletions (older than 30 days)
  const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
  mergedContent.deletedIds = Object.fromEntries(
    Object.entries(mergedContent.deletedIds)
      .filter(([_, timestamp]) => timestamp > thirtyDaysAgo)
  );

  // Get all collection names from both local and remote
  const allCollectionNames = new Set([
    ...Object.keys(localContent.collections || {}),
    ...Object.keys(remoteContent.collections || {})
  ]);

  // Merge each collection
  for (const collectionName of allCollectionNames) {
    const localItems = localContent.collections[collectionName] || [];
    const remoteItems = remoteContent.collections[collectionName] || [];

    const itemsMap = new Map();

    // Add all remote items first (if not deleted)
    remoteItems.forEach(item => {
      if (!Object.keys(mergedContent.deletedIds).includes(item.id)) {
        itemsMap.set(item.id, item);
      }
    });

    // Add/override with local items (if not deleted)
    localItems.forEach(item => {
      if (!Object.keys(mergedContent.deletedIds).includes(item.id)) {
        itemsMap.set(item.id, item);
      }
    });

    // Convert map back to array
    mergedContent.collections[collectionName] = Array.from(itemsMap.values());
  }

  return mergedContent;
}


// FIXME: this selection of the component to render (and its attributes?) needs
// to happen based on the config
// field.widget === "text-editor"
//   ?
//   : `<input id="${fieldKey}" name="${field.name}">`
//
// Updated selectWidget function to handle custom widgets
function selectWidget(field, fieldKey, currentItem) {
  const value = currentItem && currentItem[field.name]
    ? typeof currentItem[field.name] === "string"
      ? escapeHTML(currentItem[field.name])
      : currentItem[field.name]
    : '';

  // Handle built-in widgets first
  switch (field.widget) {
    case "date":
      const dateValue = value ? new Date(parseInt(value)).toISOString().split('T')[0] : '';
      return `
        <input
          type="date"
          id="${fieldKey}"
          name="${field.name}"
          value="${dateValue}"
        />
        <input
          type="hidden"
          name="${field.name}-type"
          value="date"
        />`;
  }

  // If it's a custom widget, ensure it's loaded and return the element
  if (field.widgetUrl) {
    return `<${field.widget}
      id="${fieldKey}"
      name="${field.name}"
      value="${value}"
      ${field.widgetConfig ? `config='${JSON.stringify(field.widgetConfig)}'` : ''}
    ></${field.widget}>`;
  }

  // Default to basic text input
  return `<input id="${fieldKey}" name="${field.name}" value="${value}"/>`;
}
let octokit;

async function SyncStatus({ children, title, styles = [] }) {
  const octokit = await getOctokit();
  const cmsConfig = await get('config');
  const configFile = await octokit.repos.getContent({
    owner: cmsConfig.githubUser,
    repo: cmsConfig.githubRepo,
    path: GITHUB_CONFIG.paths.config,
  });
  const contentFile = await octokit.repos.getContent({
    owner: cmsConfig.githubUser,
    repo: cmsConfig.githubRepo,
    path: GITHUB_CONFIG.paths.content,
  });

  const remoteContent = JSON.parse(b64DecodeUnicode(contentFile.data.content));
  const localContent = await get("content-json");

  if (localContent.lastModified > remoteContent.lastModified) {
    return html`<div>
      <p style="border: 1px solid; padding: 10px; background: white;">Local content has updates</p>
      <form action="${BASEPATH}/sync" method="POST">
        <button type="submit">Sync</button>
      </form>
    </div>`;
  }

  return html`<div>
    <p style="border: 1px solid; padding: 10px; background: lightgrey;">Local content is synced</p>
  </div>`;
}

async function getOctokit() {
  if (octokit) {
    return octokit;
  }
  const token = await get("token");
  return (octokit = new Octokit({
    auth: token,
  }));
}

const router = new Router({
  baseHref: BASEPATH,
  routes: [
    {
      path: "/login",
      plugins: [
        {
          name: "auth-plugin",
          async beforeResponse({ url, query, params, request }) {
            const token = await get("token");
            if (token) {
              return Response.redirect(BASEPATH);
            }
          },
        },
      ],
      render: () => {
        return html` <${Html} title="swtl" basePath="${BASEPATH}">
          <div class="authorise view view-active">
            <style>
              .authorise {
                width: 4.75em;
                height: 1.75em;
                overflow: hidden;
              }
            </style>
            <iframe
              id="authorise-iframe"
              scrolling="no"
              seamleass
              src="https://oauth-proxy.vercel.app/pages/login.html"
            ></iframe>
            <script>
              function onMessage(event) {
                if (event.origin !== "https://oauth-proxy.vercel.app") {
                  return;
                }
                const token = event.data;
                navigator.serviceWorker.controller.postMessage({
                  event: "authorised",
                  token,
                });
                location = "${BASEPATH}";
              }
              window.addEventListener("message", onMessage);
            </script>
          </div>
        <//>`;
      },
    },
    {
      path: '/',
      plugins: [
        {
          name: "auth-plugin",
          async beforeResponse({ url, query, params, request }) {
            const token = await get("token");
            if (!token) {
              return Response.redirect(`${BASEPATH}/login`);
            }
            const octokit = await getOctokit();
            const cmsConfig = await get('config');

            try {
              const configFile = await octokit.repos.getContent({
                owner: cmsConfig.githubUser,
                repo: cmsConfig.githubRepo,
                path: GITHUB_CONFIG.paths.config,
              });
              const config = JSON.parse(b64DecodeUnicode(configFile.data.content));
              await set(
                "config-json",
                config
              );
              // Prefetch widget scripts after config is loaded
              await prefetchWidgetScripts(config);
            } catch (e) {
              console.error(e);
              console.error("Create a config file!");
            }
            try {
              const contentFile = await octokit.repos.getContent({
                owner: cmsConfig.githubUser,
                repo: cmsConfig.githubRepo,
                path: GITHUB_CONFIG.paths.content,
              });
              const remoteContent = JSON.parse(b64DecodeUnicode(contentFile.data.content));
              const localContent = await get("content-json");
              // merge from server if lastModified on the server is newer
              if (
                !localContent ||
                localContent.lastModified < remoteContent.lastModified ||
                !localContent.lastModified
              ) {
                const mergedContent = mergeContents(localContent || { collections: {} }, remoteContent);
                await set("content-json", mergedContent);
              }
            } catch (e) {
              console.error(e);
            }
          },
        },
      ],
      render: async ({ params, query, request }) => {
        const config = await get("config-json");

        return html`
          <${Html} title="Start" basePath=${BASEPATH}>
            <${SyncStatus} />
            ${config.collections.map(({ name, label }) => {
              return `<div><a href="${BASEPATH}/collections/${name}/"><button>${label}</button></a></div>`;
            })}
          <//>
        `;
      },
    },
    {
      path: `/collections/:collectionName/`,
      render: async function ({ url, query, params, request }) {
        const content = await get("content-json");
        const config = await get("config-json");
        const collectionName = params.collectionName;
        const collectionConfig = config.collections.find(
          ({ name }) => collectionName === name,
        );
        const items = content.collections[collectionName] || [];

        return html`<${Html} title="${collectionName}" basePath=${BASEPATH}>
          <style>
            li {
              list-style: none;
            }
          </style>
          <a href="${BASEPATH}"><button>Back</button></a>
          <${SyncStatus} />
          <div>
            <h2>✎ ${collectionName}</h2>
            <a href="${BASEPATH}/collections/${collectionName}/new"
              ><button>Add to ${collectionConfig.label}</button></a
            >
            ${items.map((item, itemIndex) => {
              return `<li><a href="${BASEPATH}/collections/${collectionName}/${item.id}/edit"><button>${item.title}</button></a></li>`;
            })}
          </div>
        <//>`;
      },
    },
    {
      path: `/collections/:collectionName/new`,
      render: async function ({ params }) {
        performance.mark("get-db");
        const content = await get("content-json");
        const config = await get("config-json");
        performance.mark("got-db");
        console.log(
          "Time it took to load content (ms)",
          performance.measure("Loading Content", "get-db", "got-db").duration,
        );
        const collectionName = params.collectionName;
        const collectionConfig = config.collections.find(
          ({ name }) => collectionName === name,
        );
        const scripts = collectionConfig.fields.map(({widgetUrl, widget}) => widgetUrl ? widget : null).filter(w => w);

        return html`<${Html} title="editing" basePath="${BASEPATH}" scripts="${scripts}">
          <a href="${BASEPATH}"><button>Back</button></a>
          <${SyncStatus} />
          <form action="${BASEPATH}/collections/${collectionName}/" method="POST">
            <h2>New item for ${collectionName}</h2>
            ${collectionConfig.fields
              .map((field) => {
                const fieldKey = `${collectionName}-${field.name}`;

                return `<fieldset>
                <label for="${fieldKey}">${field.label}</label>

                ${selectWidget(field, fieldKey)}
              </fieldset>`;
              })
              .join("")}
            <input type="submit" />
          </form>
        <//>`;
      },
    },
    {
      path: `/collections/:collectionName/:itemId/edit`,
      render: async function ({ url, query, params, request }) {
        performance.mark("get-db");
        const content = await get("content-json");
        const config = await get("config-json");
        performance.mark("got-db");
        console.log(
          "Time it took to load content (ms)",
          performance.measure("Loading Content", "get-db", "got-db").duration,
        );
        const collectionName = params.collectionName;
        const collectionConfig = config.collections.find(
          ({ name }) => collectionName === name,
        );
        const items = content.collections[collectionName] || [];
        const currentItem = items.find(({ id }) => id === params.itemId);
        const scripts = collectionConfig.fields.map(({widgetUrl, widget}) => widgetUrl ? widget : null).filter(w => w);

        return html`<${Html} title="editing" basePath="${BASEPATH} scripts="${scripts}">
          <a href="${BASEPATH}/collections/${collectionName}/"><button>Back</button></a>
          <form
            action="${BASEPATH}/collections/${collectionName}${"/"}${params.itemId}"
            method="POST"
          >
            <h2>${currentItem?.title}</h2>
            ${collectionConfig.fields
              .map((field) => {
                const fieldKey = `${collectionName}-${field.name}`;

                return `<fieldset>
                <label for="${fieldKey}">${field.label}</label>

                <input type="hidden" name="id" value=${currentItem.id}>
                <input type="hidden" name="collectionName" value=${collectionName}>
                  ${selectWidget(field, fieldKey, currentItem)}
              </fieldset>`;
              })
              .join("")}
            <input type="submit" />
            <input
              type="submit"
              formaction="${BASEPATH}/collections/${collectionName}${"/"}${currentItem.id}/delete"
              value="Delete"
            />
          </form>
        <//>`;
      },
    },
  ]
});

  // ],
  // TODO:
  // - on content create / save generate id (Date.now()), set created_at and
  // modified_at, generate title from textual field or alt of an image, and use
  // id if none, but regenerate later. alternatively define "display" field in
  // config
  //
  // Ideas:
  //
  // Make a post handler that uploads the image and returns its saved path or URL
  // in case a CDN is used.
  // [x] Test adding web components that add to formData
  //
// });

// https://dev.to/gelopfalcon/service-worker-and-its-self-skipwaiting-44o5
// The following example causes a newly installed service worker
// to progress into the activatingstate, regardless of whether
// there is already an active service worker.
// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/skipWaiting
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

async function fetchAndCacheScript(url, scriptId) {
  const response = await fetch(url);
  const content = await response.text();
  await set(`script-${scriptId}`, content);
  return content;
}

// How to match a trailing slash but also an optional param
// https://github.com/whatwg/urlpattern/issues/14
// Use {} notation to not "consume" the slash by the param notation
const collectionsPathPattern = new URLPattern(
  `${BASEPATH}/collections/:collectionName/{:id}?/:action?`,
  self.location.origin,
);

const syncPathPattern = new URLPattern(
  `${BASEPATH}/sync`,
  self.location.origin,
);

const remoteScriptPattern = new URLPattern(
  `${BASEPATH}/remote/{:scriptId}.js`,
  self.location.origin
);


self.addEventListener("fetch", async (event) => {
  let scriptMatch = remoteScriptPattern.exec(event.request.url);

  if (scriptMatch) {
    event.respondWith((async () => {
      const scriptId = scriptMatch.pathname.groups.scriptId;
      const config = await get("config-json");

      // Find script URL from config
      const scriptUrl = config.collections
        .flatMap(c => c.fields)
        .find(f => f.widget === scriptId)
        ?.widgetUrl;

      if (!scriptUrl) {
        return new Response('Script not found', { status: 404 });
      }

      // Try to get cached script
      const cachedScript = await get(`script-${scriptId}`);
      if (cachedScript) {
        return new Response(cachedScript, {
          headers: { 'Content-Type': 'application/javascript' }
        });
      }

        // Fetch and cache if not found
      const script = await fetchAndCacheScript(scriptUrl, scriptId);
      return new Response(script, {
        headers: { 'Content-Type': 'application/javascript' }
      });
    })());
    return;
  }
});

self.addEventListener("fetch", async (event) => {
  let collectionsPathMatch = null;
  let syncPathMatch = null;

  if (event.request.method === "POST") {
    console.log('POST request to:', event.request.url);

    if ((syncPathMatch = syncPathPattern.exec(event.request.url))) {
      console.log('Handling sync request');
      event.respondWith(
        (async () => {
          try {
            await syncToGithub();
            // Redirect back to the page they were on
            return Response.redirect(event.request.referrer || BASEPATH);
          } catch (error) {
            console.error('Sync failed:', error);
            return Response.redirect(`${BASEPATH}?error=sync_failed`);
          }
        })()
      );
      return;
    }

    if ((collectionsPathMatch = collectionsPathPattern.exec(event.request.url))) {
      console.log('Handling collections request');
      event.respondWith(
        (async () => {
          const formData = await event.request.formData();
          const content = await get("content-json");
          const collectionName = collectionsPathMatch.pathname.groups.collectionName;
          const itemId = collectionsPathMatch.pathname.groups.id;
          const isDeleteAction = (collectionsPathMatch.pathname.groups.action === "delete");

          let items = content.collections[collectionName] || [];
          const currentItemIndex = items.findIndex(({ id }) => id === itemId);

          if (isDeleteAction && itemId) {
            items.splice(currentItemIndex, 1);
            content.deletedIds = content.deletedIds || {};
            content.deletedIds[itemId] = Date.now();
          } else {
            const now = Date.now();
            const item = {
              id: itemId || `${Math.random().toString(36).slice(2, 9)}`,
              createdAt: currentItemIndex > -1 ? items[currentItemIndex].createdAt : now,
              modifiedAt: now
            };

            for (const [key, value] of formData.entries()) {
              if (value && formData.get(`${key}-type`) === 'date') {
                item[key] = new Date(value).getTime();
              } else {
                item[key] = value;
              }
            }

            if (currentItemIndex > -1) {
              items[currentItemIndex] = item;
            } else {
              items.push(item);
            }
          }

          content.collections[collectionName] = items;
          content.lastModified = Date.now();
          await set("content-json", content);

          return Response.redirect(
            `${BASEPATH}/collections/${collectionName}/`,
          );
        })()
      );
      return;
    }
  }
});

// after the frontend authorises via Github OAuth, we send the message with a token
// to the SW so it can be persisted for the future use
self.addEventListener(
  "message",
  async function serviceWorkerOnAuthMessage({ data }) {
    if (data.event === "authorised") {
      await set("token", data.token);
    }
  },
);

// After the service worker is registered, we send a config
// from html to the service worker to be persisted
self.addEventListener(
  "message",
  async function serviceWorkerOnConfigMessage({ data }) {
    if (data.event === "config") {
      await set("config", data.config);
    }
  },
);


// IMPORTANT:
// enable swtl router only after any other own fetch listeners,
// so that "API" POST requests are handled first
self.addEventListener("fetch", async (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(router.handleRequest(event.request));
  }
});

// Update the sync function to use merging
async function syncToGithub() {
  try {
    const octokit = await getOctokit();
    const localContent = await get("content-json");
    const cmsConfig = await get('config');

    // Get current remote content
    const { data: currentFile } = await octokit.repos.getContent({
      owner: cmsConfig.githubUser,
      repo: cmsConfig.githubRepo,
      path: "content.json",
    });

    const remoteContent = JSON.parse(b64DecodeUnicode(currentFile.content));

    console.log(remoteContent)

    // Always merge with remote to prevent lost updates
    const contentToSync = mergeContents(localContent, remoteContent);

    // Upload the merged content
    await octokit.repos.createOrUpdateFileContents({
      owner: cmsConfig.githubUser,
      repo: cmsConfig.githubRepo,
      path: "content.json",
      message: `Content update ${new Date().toISOString()}`,
      content: b64EncodeUnicode(JSON.stringify(contentToSync, null, 2)),
      sha: currentFile.sha
    });

    // Update local state with merged content
    await set("content-json", contentToSync);

  } catch (error) {
    console.error('Sync failed:', error);
  }
}

// Add this function to handle initial script fetching
async function prefetchWidgetScripts(config) {
  const scripts = config.collections
    .flatMap(c => c.fields)
    .filter(f => f.widget && f.widgetUrl)
    .map(f => ({
      id: f.widget,
      url: f.widgetUrl
    }));

  console.log('Prefetching widget scripts:', scripts);

  for (const script of scripts) {
    try {
      // Check if already cached
      const cached = await get(`script-${script.id}`);
      if (!cached) {
        console.log(`Fetching script: ${script.id}`);
        await fetchAndCacheScript(script.url, script.id);
      }
    } catch (error) {
      console.error(`Failed to prefetch script ${script.id}:`, error);
    }
  }
}
