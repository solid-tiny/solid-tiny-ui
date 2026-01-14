import { mergeRefs } from "@solid-primitives/refs";
import type { ComponentProps, JSX } from "solid-js";
import { onCleanup, onMount, splitProps } from "solid-js";
import { combineStyle } from "solid-tiny-utils";
import { context } from "./context";

// Threshold for size change detection (in pixels)
const SIZE_CHANGE_THRESHOLD = 1;

export interface VirtualItemProps extends ComponentProps<"div"> {
  index: number;
  children: JSX.Element;
}

export function Item(props: VirtualItemProps) {
  let elementRef!: HTMLDivElement;
  const [local, others] = splitProps(props, ["index", "children", "style", "ref"]);
  const [state, actions] = context.useContext();

  onMount(() => {
    const resizeObserver = new ResizeObserver(() => {
      const size = state.horizontal
        ? elementRef.offsetWidth
        : elementRef.offsetHeight;

      // Update the item rect with actual measured size
      const itemRects = [...state.itemRects];
      const currentRect = itemRects[local.index];
      
      if (currentRect && Math.abs(currentRect.size - size) > SIZE_CHANGE_THRESHOLD) {
        const diff = size - currentRect.size;
        currentRect.size = size;
        currentRect.offsetEnd = currentRect.offsetStart + size;

        // Update subsequent items' offsets
        for (let i = local.index + 1; i < itemRects.length; i++) {
          itemRects[i].offsetStart += diff;
          itemRects[i].offsetEnd += diff;
        }

        actions.setState("itemRects", itemRects);
        actions.setState("totalSize", state.totalSize + diff);
      }
    });

    resizeObserver.observe(elementRef);
    onCleanup(() => resizeObserver.disconnect());
  });

  return (
    <div
      {...others}
      ref={mergeRefs(local.ref, (el) => {
        elementRef = el;
      })}
      data-index={local.index}
      style={combineStyle(
        {
          "flex-shrink": "0",
        },
        local.style
      )}
    >
      {local.children}
    </div>
  );
}
