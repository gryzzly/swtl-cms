import { html, Router } from 'swtl';
import { Html } from './pages/Html.js';
import { Octokit } from "@octokit/rest"

import { set, get } from './vendor/idb-keyval.js';

// FIXME: deletion of database breaks sw

let octokit;

async function getOctokit() {
  if (octokit) {
    return octokit;
  }
  const token = await get('token');
  console.log(token);
  return (octokit = new Octokit({
    auth: token
  }));
}

const router = new Router({
  routes: [
    {
      path: '/login',
      plugins: [{
        name: 'auth-plugin',
        async beforeResponse({url, query, params, request}) {
          const token = await get('token');
          if (token) {
            return Response.redirect('/');
          }
        }
      }],
      render: () => {
        return html`
        <${Html} title="swtl">
        <div class="authorise view view-active">
          <style>
            .authorise {
              width: 4.75em;
              height: 1.75em;
              overflow: hidden;
            }
          </style>
          <iframe id="authorise-iframe" scrolling=no seamleass src="https://oauth-proxy.vercel.app/pages/login.html"></iframe>
          <script>
          function onMessage (event) {
            console.log(event);
            if (event.origin !== 'https://oauth-proxy.vercel.app') {
              return;
            }
            const token = event.data;
            navigator.serviceWorker.controller.postMessage({
              event: 'authorised',
              token
            });
            location = '/';
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
          name: 'auth-plugin',
          async beforeResponse({url, query, params, request}) {
            console.log('before response')
            const token = await get('token');
            if (!token) {
              return Response.redirect('/login')
            }
            console.log('here');
            const octokit = await getOctokit();
            try {
              contentFile = await octokit.repos.getContent({
                owner: 'gryzzly',
                repo: 'mishareyzlin.com',
                path: 'content/content.json'
              });
              console.log(contentFile)
            } catch (e) {
              console.error(e);
            }
          }
        }
      ],
      render: ({params, query, request}) => html`
        <${Html} title="swtl">
          <h1>Hellllo</h1>
        <//>
      `
    },
    {
      path: '/list',
      render: ({params, query, request}) => html`
        <${Html} title="foo">
          <h2>Foo</h2>
        <//>
      `
    }
  ],
});

// https://dev.to/gelopfalcon/service-worker-and-its-self-skipwaiting-44o5
// The following example causes a newly installed service worker
// to progress into the activatingstate, regardless of whether
// there is already an active service worker.
// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/skipWaiting
self.addEventListener("install", () => {
  self.skipWaiting();
});

function consoleToHost(msg) {
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({ type: "SW_CONSOLE", message: msg })
    });
  });
}

self.addEventListener("activate", (event) => {
  event.waitUntil(
    clients.claim().then(() => {
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) =>
          client.postMessage({ type: "SW_ACTIVATED" })
        );
      });
    })
  );
});

// enable swtl router
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(router.handleRequest(event.request));
  }
});


self.addEventListener("message", async function serviceWorkerOnMessage ({data}) {
  if (data.event === 'authorised') {
    await set('token', data.token);
    await consoleToHost('set token');
  }
});
