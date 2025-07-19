import { html } from "swtl";
import { get } from "../vendor/idb-keyval.js";
import { selectWidget } from "../utils/widget-utils.js";

export function newItemRoute(
  basePath,
  { Html, SyncStatus, contentManager, widgetManager, authManager },
) {
  return {
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
      const scripts = collectionConfig.fields
        .map(({ widgetUrl, widget }) =>
          widgetUrl
            ? widgetUrl.includes("localhost")
              ? widgetUrl
              : widget
            : null,
        )
        .filter((w) => w);
      return html`<${Html}
        title="editing"
        basePath="${basePath}"
        scripts="${scripts}"
      >
        <${SyncStatus}
          basePath="${basePath}"
          contentManager=${contentManager}
        />
        <a href="${basePath}"><button>Back</button></a>
        <form action="${basePath}/collections/${collectionName}/" method="POST">
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
  };
}
