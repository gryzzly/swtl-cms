import { loginRoute } from "./login.js";
import { homeRoute } from "./home.js";
import { collectionListRoute } from "./collection-list.js";
import { newItemRoute } from "./new-item.js";
import { editItemRoute } from "./edit-item.js";

export function generateRoutes(services) {
  return [
    loginRoute(services),
    homeRoute(services),
    collectionListRoute(services),
    newItemRoute(services),
    editItemRoute(services),
  ];
}
