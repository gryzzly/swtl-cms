import { get as getStore, set as setStore } from "../vendor/idb-keyval.js";

// services/widget-manager.js
export class WidgetManager {
  async handleScriptRequest(scriptMatch) {
    try {
      const scriptId = scriptMatch.pathname.groups.scriptId;
      const config = await getStore("config-json");

      // Find script URL from config
      const scriptUrl = config.collections
        .flatMap((c) => c.fields)
        .find((f) => f.widget === scriptId)?.widgetUrl;

      if (!scriptUrl) {
        return new Response("Script not found", { status: 404 });
      }

      // Try to get cached script
      const cachedScript = await getStore(`script-${scriptId}`);
      if (cachedScript) {
        return new Response(cachedScript, {
          headers: { "Content-Type": "application/javascript" },
        });
      }

      // Fetch and cache if not found
      const script = await this.fetchAndCacheScript(scriptUrl, scriptId);
      return new Response(script, {
        headers: { "Content-Type": "application/javascript" },
      });
    } catch (error) {
      console.error("Error handling script request:", error);
      return new Response("Error loading script: " + error.message, {
        status: 500,
      });
    }
  }

  async fetchAndCacheScript(url, scriptId) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch script: ${response.status} ${response.statusText}`,
        );
      }

      const content = await response.text();
      await setStore(`script-${scriptId}`, content);
      return content;
    } catch (error) {
      console.error(`Error fetching script ${scriptId}:`, error);
      throw error;
    }
  }

  async prefetchWidgetScripts(config) {
    const scripts = config.collections
      .flatMap((c) => c.fields)
      .filter((f) => f.widget && f.widgetUrl)
      .map((f) => ({
        id: f.widget,
        url: f.widgetUrl,
      }));

    console.log("Prefetching widget scripts:", scripts);

    for (const script of scripts) {
      // do not prefetch localhost scripts
      if (script.url.includes("localhost")) {
        continue;
      }

      try {
        // Check if already cached
        const cached = await getStore(`script-${script.id}`);
        if (!cached) {
          console.log(`Fetching script: ${script.id}`);
          await this.fetchAndCacheScript(script.url, script.id);
        }
      } catch (error) {
        console.error(`Failed to prefetch script ${script.id}:`, error);
      }
    }
  }

  getScriptsForCollection(collectionConfig) {
    return collectionConfig.fields
      .map(({ widgetUrl, widget }) =>
        widgetUrl
          ? widgetUrl.includes("localhost")
            ? widgetUrl
            : widget
          : null,
      )
      .filter((w) => w);
  }
}
