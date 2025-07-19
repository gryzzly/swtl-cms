export class ApiHandlers {
  constructor(baseConfig) {
    const { BASEPATH, contentManager, getGithubSync, set } = baseConfig;
    this.BASEPATH = BASEPATH;
    this.contentManager = contentManager;
    this.getGithubSync = getGithubSync;
    this.set = set;

    // Define URL patterns for routing
    this.collectionsPathPattern = new URLPattern(
      `${BASEPATH}/collections/:collectionName/{:id}?/:action?`,
      self.location.origin,
    );

    this.syncPathPattern = new URLPattern(
      `${BASEPATH}/sync`,
      self.location.origin,
    );
  }

  /**
   * Determine if the request is an API request that should be handled by this module
   */
  isApiRequest(request) {
    if (request.method !== "POST") return false;

    const url = request.url;
    return (
      this.syncPathPattern.test(url) || this.collectionsPathPattern.test(url)
    );
  }

  /**
   * Main handler for API requests
   */
  async handleRequest(event) {
    const { request } = event;
    const url = request.url;

    // Handle sync requests
    const syncPathMatch = this.syncPathPattern.exec(url);
    if (syncPathMatch) {
      return this.handleSyncRequest(event);
    }

    // Handle collection requests
    const collectionsPathMatch = this.collectionsPathPattern.exec(url);
    if (collectionsPathMatch) {
      return this.handleCollectionsRequest(event, collectionsPathMatch);
    }

    // If no pattern matches (shouldn't happen due to isApiRequest check)
    return new Response("Not found", { status: 404 });
  }

  /**
   * Handle GitHub synchronization requests
   */
  async handleSyncRequest(event) {
    try {
      const githubSync = await this.getGithubSync();
      if (!githubSync) {
        return Response.redirect(`${this.BASEPATH}/login`);
      }

      await githubSync.syncToGithub();
      // Update last sync time
      await this.set("last-sync-time", Date.now());
      // Redirect back to the page they were on
      return Response.redirect(event.request.referrer || this.BASEPATH);
    } catch (error) {
      console.error("Sync failed:", error);
      return Response.redirect(`${this.BASEPATH}?error=sync_failed`);
    }
  }

  /**
   * Handle collection update requests
   */
  async handleCollectionsRequest(event, pathMatch) {
    try {
      const formData = await event.request.formData();
      const collectionName = pathMatch.pathname.groups.collectionName;
      const itemId = pathMatch.pathname.groups.id;
      const isDeleteAction = pathMatch.pathname.groups.action === "delete";

      // Get content manager to handle the collection update
      await this.contentManager.updateCollection(
        collectionName,
        itemId,
        formData,
        isDeleteAction,
      );

      // Remember last edited collection
      if (!isDeleteAction) {
        await this.set("last-edited-collection", collectionName);
      }

      // If we're online, try to sync
      try {
        const githubSync = await this.getGithubSync();
        if (githubSync) {
          await githubSync.syncToGithub();
          await this.set("last-sync-time", Date.now());
        }
      } catch (error) {
        console.error("Auto-sync failed:", error);
        // Continue with redirect even if sync fails
      }

      return Response.redirect(
        `${this.BASEPATH}/collections/${collectionName}/`,
      );
    } catch (error) {
      console.error("Collection update failed:", error);
      return Response.redirect(`${this.BASEPATH}?error=update_failed`);
    }
  }
}
