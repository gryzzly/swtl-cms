/**
 * Manages content collections with CRUD operations and sync capabilities
 */
export class ContentManager {
  /**
   * @param {Function} getStore - Function to retrieve data from store
   * @param {Function} setStore - Function to save data to store
   */
  constructor(getStore, setStore) {
    if (typeof getStore !== "function" || typeof setStore !== "function") {
      throw new Error(
        "ContentManager requires valid getStore and setStore functions",
      );
    }
    this.getStore = getStore;
    this.setStore = setStore;
    this.storeKey = "content-json";
    this.syncTimeKey = "last-sync-time";
  }

  /**
   * Creates default content structure
   * @returns {Object} Default content structure
   */
  createDefaultContent() {
    return {
      collections: {},
      deletedIds: {},
      lastModified: Date.now(),
    };
  }

  /**
   * Retrieves content from the store
   * @returns {Promise<Object>} Content object with collections and deletedIds
   */
  async getContent() {
    const content = await this.getStore(this.storeKey);
    return content || this.createDefaultContent();
  }

  /**
   * Creates a unique ID
   * @returns {string} Generated unique ID
   */
  generateId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }

  /**
   * Updates or deletes an item in a collection
   * @param {string} collectionName - Name of the collection
   * @param {string|null} itemId - ID of the item, null for new items
   * @param {FormData|Object} formData - Form data to update
   * @param {boolean} isDeleteAction - Whether this is a delete operation
   * @returns {Promise<Object>} Updated content object
   */
  async updateCollection(
    collectionName,
    itemId,
    formData,
    isDeleteAction = false,
  ) {
    if (!collectionName) {
      throw new Error("Collection name is required");
    }

    const content = await this.getContent();
    const timestamp = Date.now();

    // Initialize collection if it doesn't exist
    content.collections[collectionName] =
      content.collections[collectionName] || [];
    const items = content.collections[collectionName];

    const currentItemIndex = itemId
      ? items.findIndex(({ id }) => id === itemId)
      : -1;
    const itemExists = currentItemIndex > -1;

    if (isDeleteAction && itemId) {
      // Delete operation
      if (itemExists) {
        items.splice(currentItemIndex, 1);
      }

      // Record deletion timestamp
      content.deletedIds[itemId] = timestamp;
    } else {
      // Create or update operation
      const newId = itemId || this.generateId();
      let item = itemExists ? { ...items[currentItemIndex] } : {};

      item = {
        ...item,
        id: newId,
        createdAt: itemExists ? items[currentItemIndex].createdAt : timestamp,
        modifiedAt: timestamp,
      };

      // Process form data
      if (formData instanceof FormData) {
        for (const [key, value] of formData.entries()) {
          item[key] = value;
        }
      } else if (formData && typeof formData === "object") {
        // Handle regular objects as well
        Object.assign(item, formData);
      }

      // Update or add the item
      if (itemExists) {
        items[currentItemIndex] = item;
      } else {
        items.push(item);
      }
    }

    content.lastModified = timestamp;
    await this.setStore(this.storeKey, content);
    return content;
  }

  /**
   * Merges local and remote content
   * @param {Object} localContent - Local content object
   * @param {Object} remoteContent - Remote content object
   * @returns {Object} Merged content object
   */
  mergeContents(localContent = {}, remoteContent = {}) {
    // Initialize with proper structure
    const mergedContent = this.createDefaultContent();

    // Ensure we have proper structure for both inputs
    const safeLocalContent = {
      collections: localContent?.collections || {},
      deletedIds: localContent?.deletedIds || {},
    };

    const safeRemoteContent = {
      collections: remoteContent?.collections || {},
      deletedIds: remoteContent?.deletedIds || {},
    };

    // Merge deletedIds from both sources
    const allDeletedIds = new Set([
      ...Object.keys(safeLocalContent.deletedIds),
      ...Object.keys(safeRemoteContent.deletedIds),
    ]);

    // Take the latest deletion timestamp
    for (const id of allDeletedIds) {
      const localTimestamp = safeLocalContent.deletedIds[id] || 0;
      const remoteTimestamp = safeRemoteContent.deletedIds[id] || 0;
      mergedContent.deletedIds[id] = Math.max(localTimestamp, remoteTimestamp);
    }

    // Clean up old deletions (older than 30 days)
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    mergedContent.deletedIds = Object.fromEntries(
      Object.entries(mergedContent.deletedIds).filter(
        ([_, timestamp]) => timestamp > thirtyDaysAgo,
      ),
    );

    // Get all collection names
    const allCollectionNames = new Set([
      ...Object.keys(safeLocalContent.collections),
      ...Object.keys(safeRemoteContent.collections),
    ]);

    // Merge each collection
    for (const collectionName of allCollectionNames) {
      const localItems = safeLocalContent.collections[collectionName] || [];
      const remoteItems = safeRemoteContent.collections[collectionName] || [];
      const itemsMap = new Map();

      // Prioritize most recently modified items
      [...remoteItems, ...localItems].forEach((item) => {
        if (!item?.id) return; // Skip invalid items

        // Skip deleted items
        if (mergedContent.deletedIds[item.id]) return;

        const existingItem = itemsMap.get(item.id);

        // Use the item with the most recent modification
        if (
          !existingItem ||
          (item.modifiedAt || 0) > (existingItem.modifiedAt || 0)
        ) {
          itemsMap.set(item.id, {
            ...item,
            modifiedAt: item.modifiedAt || Date.now(),
          });
        }
      });

      // Convert map back to array
      mergedContent.collections[collectionName] = Array.from(itemsMap.values());
    }

    return mergedContent;
  }

  /**
   * Checks if there are local changes since the last sync
   * @returns {Promise<boolean>} True if there are unsynchronized changes
   */
  async hasLocalChanges() {
    const lastSyncTime = (await this.getStore(this.syncTimeKey)) || 0;
    const content = await this.getContent();

    // Check if anything was modified after the last sync
    const hasModifiedItems = Object.values(content.collections)
      .flat()
      .some((item) => item?.modifiedAt > lastSyncTime);

    // Check if any deletions happened after the last sync
    const hasDeletedItems = Object.values(content.deletedIds).some(
      (deletedAt) => deletedAt > lastSyncTime,
    );

    return hasModifiedItems || hasDeletedItems;
  }

  /**
   * Updates the last sync timestamp
   * @returns {Promise<number>} The new sync timestamp
   */
  async updateSyncTime() {
    const timestamp = Date.now();
    await this.setStore(this.syncTimeKey, timestamp);
    return timestamp;
  }

  /**
   * Clears all content data
   * @returns {Promise<void>}
   */
  async clearAllData() {
    await this.setStore(this.storeKey, this.createDefaultContent());
  }
}
