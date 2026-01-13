import { itemContext, rootContext } from "./context";
import { Item, ItemInput, ItemLabel } from "./item";
import { Root } from "./root";

export const RadioGroupCore = Object.assign(Root, {
  Item,
  ItemInput,
  ItemLabel,
  useRootContext: rootContext.useContext,
  useItemContext: itemContext.useContext,
});
