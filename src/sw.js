import { html, Router } from 'swtl';
import { Html } from './pages/Html.js';

import { set, get } from './vendor/idb-keyval.js';

const router = new Router({
  routes: [
    {
      path: '/login',
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
            consoleToHost('before response')
            try {
              const token = await get('token');
              consoleToHost(token);
            }
            catch(e) {
              return Response.redirect('/login')
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
  clients.claim().then(() => {
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) =>
        client.postMessage({ type: "SW_CONSOLE", message: msg })
      );
    });
  })
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


self.addEventListener("message", async function serviceWorkerOnMessage ({event, data}) {
  console.log('service worker on message')
  if (data.event === 'authorised') {
    await set('token', data.token);
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) =>
        client.postMessage({ type: "SW_CONSOLE", message: 'recorded token in db' })
      );
    });
  }
});
