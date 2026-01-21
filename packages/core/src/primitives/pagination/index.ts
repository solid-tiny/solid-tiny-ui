import { itemContext, rootContext } from "./context";
import { Ellipsis } from "./ellipsis";
import { Item, NextButton, PrevButton } from "./item";
import { Root } from "./root";

export const PaginationCore = Object.assign(Root, {
  Item,
  PrevButton,
  NextButton,
  Ellipsis,
  useRootContext: rootContext.useContext,
  useItemContext: itemContext.useContext,
});
