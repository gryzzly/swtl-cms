// routes/home-route.js
import { html } from "swtl";
import { Octokit } from "@octokit/rest";
import { b64DecodeUnicode } from "../utils.js";

export function homeRoute(
  basePath,
  { Html, SyncStatus, contentManager, widgetManager, authManager },
) {
  return {
    path: "/",
    plugins: [
      {
        name: "auth-plugin",
        async beforeResponse({ url, query, params, request }) {
          const token = await authManager.getToken();
          if (!token) {
            return Response.redirect(`${basePath}/login`);
          }

          try {
            // Setup GitHub sync logic
            const octokit = new Octokit({ auth: token });
            const cmsConfig = await contentManager.getStore("config");

            // Fetch and store config
            try {
              const configFile = await octokit.repos.getContent({
                owner: cmsConfig.githubUser,
                repo: cmsConfig.githubRepo,
                path: cmsConfig.configFile || GITHUB_CONFIG.paths.config,
              });
              const config = JSON.parse(
                b64DecodeUnicode(configFile.data.content),
              );
              await contentManager.setStore("config-json", config);

              // Prefetch widget scripts after config is loaded
              await widgetManager.prefetchWidgetScripts(config);
            } catch (e) {
              if (e.message.includes("Bad credentials")) {
                await authManager.clearToken();
              }
              console.error("Config error:", e);
            }

            // Fetch and merge content
            try {
              const contentFile = await octokit.repos.getContent({
                owner: cmsConfig.githubUser,
                repo: cmsConfig.githubRepo,
                path: cmsConfig.contentFile || GITHUB_CONFIG.paths.content,
              });
              const remoteContent = JSON.parse(
                b64DecodeUnicode(contentFile.data.content),
              );
              const localContent = await contentManager.getContent();

              const mergedContent = contentManager.mergeContents(
                localContent,
                remoteContent,
              );
              await contentManager.setStore("last-sync-time", Date.now());
              await contentManager.setStore("content-json", mergedContent);
            } catch (e) {
              console.error("Content sync error:", e);
            }
          } catch (error) {
            console.error("Home route setup error:", error);
          }
        },
      },
    ],
    render: async ({ params, query, request }) => {
      const config = await contentManager.getStore("config-json");
      const lastEditedCollectionName =
        (await contentManager.getStore("last-edited-collection")) ||
        config.collections[0]?.name;

      const collectionConfig = config.collections.find(
        ({ name }) => lastEditedCollectionName === name,
      );

      return html`
        <${Html} title="Start" basePath=${basePath}>
          <style>
            .new-item-control {
              position: fixed;
              top: 20px;
              right: 20px;
              z-index: 100;
            }
          </style>

          <!-- New Item Dropdown -->
          <div class="new-item-control">
            <button>
              <a href="${basePath}/collections/${lastEditedCollectionName}/new"
                >Add to
                ${collectionConfig?.label || lastEditedCollectionName}</a
              >
            </button>
          </div>

          <${SyncStatus}
            contentManager=${contentManager}
            basePath=${basePath}
          />
          ${config.collections.map(({ name, label }) => {
            return `<div><a href="${basePath}/collections/${name}/"><button>${label}</button></a></div>`;
          })}
        <//>
      `;
    },
  };
}
