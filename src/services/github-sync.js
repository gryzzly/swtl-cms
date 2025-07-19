// services/github-sync.js
import { b64EncodeUnicode, b64DecodeUnicode } from "../utils.js";

export class GithubSync {
  constructor(octokit, config, contentManager, githubConfig) {
    this.octokit = octokit;
    this.config = config;
    this.contentManager = contentManager;
    this.githubConfig = githubConfig;
  }

  async fetchRemoteConfig() {
    try {
      const configFile = await this.octokit.repos.getContent({
        owner: this.config.githubUser,
        repo: this.config.githubRepo,
        path: this.config.configFile || this.githubConfig.paths.config,
      });

      return JSON.parse(b64DecodeUnicode(configFile.data.content));
    } catch (error) {
      console.error("Error fetching remote config:", error);
      throw new Error("Failed to fetch remote configuration: " + error.message);
    }
  }

  async fetchRemoteContent() {
    try {
      const contentFile = await this.octokit.repos.getContent({
        owner: this.config.githubUser,
        repo: this.config.githubRepo,
        path: this.config.contentFile || this.githubConfig.paths.content,
      });

      return JSON.parse(b64DecodeUnicode(contentFile.data.content));
    } catch (error) {
      console.error("Error fetching remote content:", error);
      throw new Error("Failed to fetch remote content: " + error.message);
    }
  }

  async syncToGithub() {
    try {
      // Get local content
      const localContent = await this.contentManager.getContent();

      // Get current remote content and its SHA
      const { data: currentFile } = await this.octokit.repos.getContent({
        owner: this.config.githubUser,
        repo: this.config.githubRepo,
        path: this.config.contentFile || this.githubConfig.paths.content,
      });

      const remoteContent = JSON.parse(b64DecodeUnicode(currentFile.content));

      // Merge content
      const contentToSync = this.contentManager.mergeContents(
        localContent,
        remoteContent,
      );

      // Clean up items that are in deletedIds
      for (const collectionName in contentToSync.collections) {
        contentToSync.collections[collectionName] = contentToSync.collections[
          collectionName
        ].filter((item) => !contentToSync.deletedIds[item.id]);
      }

      // Upload the merged content
      await this.octokit.repos.createOrUpdateFileContents({
        owner: this.config.githubUser,
        repo: this.config.githubRepo,
        path: this.config.contentFile || this.githubConfig.paths.content,
        message: `Content update ${new Date().toISOString()}`,
        content: b64EncodeUnicode(JSON.stringify(contentToSync, null, 2)),
        sha: currentFile.sha,
      });

      // Update local state with merged content
      await this.contentManager.setStore("content-json", contentToSync);

      return contentToSync;
    } catch (error) {
      console.error("Sync to GitHub failed:", error);
      throw error;
    }
  }
}
