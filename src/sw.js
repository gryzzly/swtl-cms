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

// self.location.pathname is /admin/sw.js, so we remove the filename
  // to get the containiong directory
const BASEPATH = self.location.pathname.replace(/\/sw\.js$/, '');


// FIXME: this selection of the component to render (and its attributes?) needs
// to happen based on the config
// field.widget === "text-editor"
//   ?
//   : `<input id="${fieldKey}" name="${field.name}">`
//
function selectWidget(field, fieldKey, currentItem) {
  const value = currentItem ? currentItem[field.name] : ``;

  if (field.widget === "text-editor") {
    return `<prosemirror-editor id="${fieldKey}" name="${field.name}" html="${value}"></prosemirror-editor>`;
  }
  if (field.widget === "cloudinary-upload") {
    return `<cloudinary-upload
      id=${fieldKey}
      name="${field.name}"
      value="${value}"
      url="https://api.cloudinary.com/v1_1/dcvrycv7k/image/upload"
    ></cloudinary-upload>`;
  }
  return `<input id="${fieldKey}" name="${field.name}" value="${value}"/>`;
}

let octokit;

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
            try {
              const configFile = await octokit.repos.getContent({
                owner: "gryzzly",
                repo: "petya",
                path: "config.json",
              });
              await set(
                "config-json",
                JSON.parse(b64DecodeUnicode(configFile.data.content)),
              );
            } catch (e) {
              console.error(e);
              console.error("Create a config file!");
            }
            try {
              const contentFile = await octokit.repos.getContent({
                owner: "gryzzly",
                repo: "petya",
                path: "content.json",
              });
              const localContent = await get("content-json");
              // load from server if lastModified on the server is newer
              if (
                !localContent ||
                localContent.lastModified <
                  contentFile.data.content.lastModified ||
                !localContent.lastModified
              ) {
                await set(
                  "content-json",
                  JSON.parse(b64DecodeUnicode(contentFile.data.content)),
                );
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
          <div>
            <h2>Collection: ${collectionName}</h2>
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
        debugger;
        return html`<${Html} title="editing" basePath=${BASEPATH}>
          <a href="${BASEPATH}"><button>Back</button></a>
          <form action="${BASEPATH}/collections/${collectionName}/" method="POST">
            <h2>New item for ${collectionName}</h2>
            ${collectionConfig.fields
              .map((field) => {
                const fieldKey = `${collectionName}-${field.name}`;

                return `<fieldset>
                <label for="${fieldKey}">${field.label}</label>

                <!-- input type="hidden" name="collectionName" value=${collectionName} -->
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

        return html`<${Html} title="editing">
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

// How to match a trailing slash but also an optional param
// https://github.com/whatwg/urlpattern/issues/14
// Use {} notation to not "consume" the slash by the param notation
const collectionsPathPattern = new URLPattern(
  `${BASEPATH}/collections/:collectionName/{:id}?`,
  self.location.origin,
);

self.addEventListener("fetch", async (event) => {
  let collectionsPathMatch = null;

  if (
    event.request.method === "POST" &&
    (collectionsPathMatch = collectionsPathPattern.exec(event.request.url))
  ) {
    event.respondWith(
      (async () => {
        console.log("responding to collectionsPathPattern");
        // Intercept the request and clone it so we can access the body
        const clonedRequest = event.request.clone();
        const formData = await clonedRequest.formData();
        const collectionName =
          collectionsPathMatch.pathname.groups.collectionName;
        const itemId = collectionsPathMatch.pathname.groups.id;

        const content = await get("content-json");
        const config = await get("config-json");

        const collectionConfig = config.collections.find(
          ({ name }) => collectionName === name,
        );

        const items = content.collections[collectionName] || [];

        const currentItemIndex = itemId
          ? items.findIndex(({ id }) => id === itemId)
          : items.length;

        debugger;

        items[currentItemIndex] = items[currentItemIndex] || {};

        if (!itemId) {
          // FIXME: use UUID instead of Math.random ;-)
          items[currentItemIndex].id = `${Math.random()}`;
        }

        collectionConfig.fields.map((field) => {
          items[currentItemIndex][field.name] = formData.get(field.name);
        });

        content.collections[collectionName] = items;
        // FIXME: writing lastModified is crucial
        // perhaps it should happen as a hook to data modifications?
        content.lastModified = Date.now();

        performance.mark("save-db");
        await set("content-json", JSON.parse(JSON.stringify(content)));
        performance.mark("saved-db");
        console.log(
          "Time it took to save content (ms)",
          performance.measure("Saving Content", "save-db", "saved-db").duration,
        );

        return Response.redirect(
          itemId
            ? `${BASEPATH}/${event.request.url}/edit`
            : `${BASEPATH}/${items[currentItemIndex].id}/edit`,
        );
      })(),
    );
    return;
  }
  // if (
  //   event.request.method === "POST" &&
  //   // what should this URL be?
  //   event.request.url.endsWith("/collections/pages/edit")
  // ) {
  //   event.respondWith(
  //     (async () => {
  //       // Intercept the request and clone it so we can access the body
  //       const clonedRequest = event.request.clone();
  //       const formData = await clonedRequest.formData();

  //       const content = await get("content-json");

  //       const items = content.collections[formData.get("collectionName")];
  //       const currentItemIndex = items.findIndex(
  //         ({ id }) => id === formData.get("id"),
  //       );

  //       for (const entry of formData.entries()) {
  //         console.log(entry);
  //         const [name, value] = entry;
  //         items[currentItemIndex][name] = value;
  //       }

  //       performance.mark("save-db");
  //       await set("content-json", JSON.parse(JSON.stringify(content)));
  //       performance.mark("saved-db");
  //       console.log(
  //         "Time it took to save content (ms)",
  //         performance.measure("Saving Content", "save-db", "saved-db").duration,
  //       );

  //       return Response.redirect(event.request.url);
  //     })(),
  //   );
  //   return;
  // }
});

// after the frontend authorises via Github OAuth, we send the message with a token
// to the SW so it can be persisted for the future use
self.addEventListener(
  "message",
  async function serviceWorkerOnMessage({ data }) {
    if (data.event === "authorised") {
      await set("token", data.token);
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