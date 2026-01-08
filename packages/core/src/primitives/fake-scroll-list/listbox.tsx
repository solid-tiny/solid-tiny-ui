import { createMemo, For, type JSX, onMount } from "solid-js";
import { runAtNextAnimationFrame } from "solid-tiny-utils";
import { context } from "./context";

export function Listbox(props: {
  children: (label: string, key: string) => JSX.Element;
}) {
  const [state, actions] = context.useContext();
  const renderItems = createMemo(() => {
    const keyedItems = state.items.map((item, index) => ({
      item,
      key: `${index}`,
    }));
    if (state.shouldFake) {
      const items = [
        ...keyedItems.map((k) => ({
          item: k.item,
          key: `${k.key}-pre`,
        })),
        ...keyedItems,
        ...keyedItems.map((k) => ({
          item: k.item,
          key: `${k.key}-post`,
        })),
      ];
      const startIndex = state.items.length - state.overScan;
      const endIndex = 2 * state.items.length + state.overScan;
      return items.slice(startIndex, endIndex);
    }
    return keyedItems;
  });

  let ref!: HTMLDivElement;

  onMount(() => {
    runAtNextAnimationFrame(() => {
      ref.style.transition = "transform 0.2s ease";
    });
  });

  const checkPos = () => {
    if (state.inViewIndex < 0 || state.inViewIndex >= state.items.length) {
      ref.style.transition = "none";
      actions.setState("inViewIndex", state.fixedInViewIndex);
      runAtNextAnimationFrame(() => {
        ref.style.transition = "transform 0.2s ease";
      });
    }
  };

  const translateY = createMemo(() => {
    const centerHeight =
      Math.floor(state.visibleItemsCount / 2) * state.itemHeight;
    const overScanHeight = state.overScan * state.itemHeight;
    return (
      -state.inViewIndex * state.itemHeight + centerHeight - overScanHeight
    );
  });

  return (
    <div
      onTransitionEnd={() => {
        checkPos();
      }}
      ref={ref}
      style={{
        transform: `translateY(${translateY()}px)`,
      }}
    >
      <For each={renderItems()}>
        {(item) => props.children(item.item, item.key)}
      </For>
    </div>
  );
}
