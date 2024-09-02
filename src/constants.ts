import { RoutePaths } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const PAGE_TITLES: Partial<Record<RoutePaths<typeof routeTree>, string>> = {
  "/": "Home",
  "/about": "About",
  "/contact": "Contact",
};

