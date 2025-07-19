// components/SyncStatus.js
import { html } from "swtl";

export async function SyncStatus({ contentManager, basePath }) {
  const lastSyncTime = (await contentManager.getStore("last-sync-time")) || 0;
  const hasLocalChanges = await contentManager.hasLocalChanges();

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
