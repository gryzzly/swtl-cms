import { html } from "swtl";
import { Collection } from "./collection";
import { getContentManager } from "../services/content-manager";
import { get } from "../vendor/idb-keyval.js";

export async function Collections() {
  const contentManager = getContentManager();
  const config = await get("config-json");
  const hasCollections = Boolean(config.collections.length);
  const hasOneCollection = config.collections.length === 1;

  if (!hasCollections) {
    return html`<p>You haven’t defined any collections in your config yet.</p>`;
  }

  if (hasOneCollection) {
    return html`<${Collection}
      collectionName="${config.collections[0].name}"
    />`;
  }

  return html`${config.collections.map(({ name, label }) => {
    return `<div>
          <a href="${basePath}/collections/${name}/">
            <button>${label}</button>
          </a>
        </div>`;
  })}`;
}
