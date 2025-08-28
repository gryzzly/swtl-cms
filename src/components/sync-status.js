import { html } from "swtl";
import { get } from "../vendor/idb-keyval.js";

export async function SyncStatus({ contentManager }) {
  const lastSyncTime = (await get("last-sync-time")) || 0;
  const hasLocalChanges = await contentManager.hasLocalChanges();
  const basePath = await get("basepath");

  return html`<style>
      .sync-status {
        position: fixed;
        bottom: 20px;
        left: 20px;
        right: 20px;
      }
    </style>
    <div class="sync-status">
      ${hasLocalChanges
        ? `<p style="border: 1px solid; padding: 10px; background: white;">Local content has updates</p>`
        : ""}
      <form action="${basePath}/sync" method="POST">
        <button type="submit">Sync</button>
      </form>
    </div>`;
}
