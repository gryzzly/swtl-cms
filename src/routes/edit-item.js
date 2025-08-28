import { html } from "swtl";
import { get } from "../vendor/idb-keyval.js";
import { selectWidget } from "../utils/widget-utils.js";

export function editItemRoute({ Html }) {
  return {
    path: `/collections/:collectionName/:itemId/edit`,
    render: async function ({ url, query, params, request }) {
      performance.mark("get-db");
      const basePath = await get("basepath");
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
      const scripts = collectionConfig.fields
        .map(({ widgetUrl, widget }) =>
          widgetUrl
            ? widgetUrl.includes("localhost")
              ? widgetUrl
              : widget
            : null,
        )
        .filter((w) => w);
      return html`<${Html} title="editing" basePath="${basePath} scripts="${scripts}">
        <a href="${basePath}/collections/${collectionName}/"><button>Back</button></a>
        <form
          action="${basePath}/collections/${collectionName}${"/"}${params.itemId}"
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
            formaction="${basePath}/collections/${collectionName}${"/"}${currentItem.id}/delete"
            value="Delete"
          />
        </form>
      <//>`;
    },
  };
}
