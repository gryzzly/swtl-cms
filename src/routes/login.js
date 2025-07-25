import { html } from "swtl";
import { get } from "../vendor/idb-keyval.js";

export function loginRoute(
  basePath,
  { Html, SyncStatus, contentManager, widgetManager, authManager },
) {
  return {
    path: "/login",
    plugins: [
      {
        name: "auth-plugin",
        async beforeResponse({ url, query, params, request }) {
          const token = await get("token");
          if (token) {
            return Response.redirect(basePath);
          }
        },
      },
    ],
    render: () => {
      return html` <${Html} title="swtl" basePath="${basePath}">
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
              location = "${basePath}";
            }
            window.addEventListener("message", onMessage);
          </script>
        </div>
      <//>`;
    },
  };
}
