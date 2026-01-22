import { context } from "./context";
import { Items } from "./items";
import { Root } from "./root";

export const PaginationCore = Object.assign(Root, {
  Items,
  useContext: context.useContext,
});

export type { PaginationPager, PaginationPageType } from "./context";
