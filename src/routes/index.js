import { loginRoute } from "./login.js";
import { homeRoute } from "./home.js";
import { collectionListRoute } from "./collection-list.js";
import { newItemRoute } from "./new-item.js";
import { editItemRoute } from "./edit-item.js";

export function generateRoutes(basePath, services) {
  return [
    loginRoute(basePath, services),
    homeRoute(basePath, services),
    collectionListRoute(basePath, services),
    newItemRoute(basePath, services),
    editItemRoute(basePath, services),
  ];
}
