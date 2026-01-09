import type { Accessor } from "solid-js";
import { access } from "solid-tiny-utils";
import { context } from "./context";
import { ItemElements } from "./item-element";
import { ScrollElement } from "./scroll-element";

export function createVirtuaList<T>(opts: { items: Accessor<T[]> }) {
  const Context = context.initial({
    totalItemsCount: () => access(opts.items).length,
  });
  const [state] = Context.value;

  return [
    state,
    {
      Provider: Context.Provider,
      ScrollElement,
      ItemElements,
    },
  ] as const;
}
