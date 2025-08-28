import { html } from "swtl";
import { get } from "../vendor/idb-keyval.js";

export async function Collection({ collectionName }) {
  const content = await get("content-json");
  const config = await get("config-json");
  const basePath = await get("basepath");

  const collectionConfig = config.collections.find(
    ({ name }) => collectionName === name,
  );
  const items = content.collections[collectionName] || [];

  return html`<div>
    <h2>✎ ${collectionName}</h2>
    <a href="${basePath}/collections/${collectionName}/new"
      ><button>Add to ${collectionConfig.label}</button></a
    >
    ${items.map((item /*, itemIndex*/) => {
      return `<li>
        <a href="${basePath}/collections/${collectionName}/${item.id}/edit">
          <button>${item.title}</button>
        </a>
      </li>`;
    })}
  </div>`;
}
