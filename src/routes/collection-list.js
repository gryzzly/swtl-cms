import { html } from "swtl";
import { get } from "../vendor/idb-keyval.js";

export function collectionListRoute({
  Html,
  SyncStatus,
  contentManager,
  widgetManager,
  authManager,
}) {
  return {
    path: `/collections/:collectionName/`,
    render: async function ({ url, query, params, request }) {
      const basePath = await get("basepath");
      const content = await get("content-json");
      const config = await get("config-json");
      const collectionName = params.collectionName;
      const collectionConfig = config.collections.find(
        ({ name }) => collectionName === name,
      );
      const items = content.collections[collectionName] || [];
      return html`<${Html} title="${collectionName}" basePath=${basePath}>
        <style>
          li {
            list-style: none;
          }
        </style>
        <${SyncStatus}
          contentManager=${contentManager}
          basePath="${basePath}"
        />
        <a href="${basePath}"><button>Back</button></a>
        <div>
          <h2>✎ ${collectionName}</h2>
          <a href="${basePath}/collections/${collectionName}/new"
            ><button>Add to ${collectionConfig.label}</button></a
          >
          ${items.map((item, itemIndex) => {
            return `<li><a href="${basePath}/collections/${collectionName}/${item.id}/edit"><button>${item.title}</button></a></li>`;
          })}
        </div>
      <//>`;
    },
  };
}
