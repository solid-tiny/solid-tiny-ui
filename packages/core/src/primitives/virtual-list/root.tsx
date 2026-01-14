import { mergeRefs } from "@solid-primitives/refs";
import type { JSX } from "solid-js";
import {
  type ComponentProps,
  createEffect,
  createMemo,
  onCleanup,
  onMount,
  splitProps,
} from "solid-js";
import { combineStyle } from "solid-tiny-utils";
import { type ItemRect, context } from "./context";

export interface VirtualListRootProps
  extends Omit<ComponentProps<"div">, "children"> {
  count: number;
  estimateSize?: number;
  horizontal?: boolean;
  overscan?: number;
  children: (index: number) => JSX.Element;
  onScroll?: (offset: number) => void;
}

export function Root(props: VirtualListRootProps) {
  let scrollerRef!: HTMLDivElement;
  let contentRef!: HTMLDivElement;
  const [local, others] = splitProps(props, [
    "count",
    "estimateSize",
    "horizontal",
    "overscan",
    "children",
    "onScroll",
    "style",
    "ref",
  ]);

  const Context = context.initial({
    horizontal: () => local.horizontal ?? false,
    overscan: () => local.overscan ?? 3,
  });

  const [state, actions] = Context.value;

  // Initialize item rects with estimated sizes
  createEffect(() => {
    const count = local.count;
    const estimateSize = local.estimateSize ?? 50;
    
    const rects: ItemRect[] = [];
    for (let i = 0; i < count; i++) {
      rects.push({
        index: i,
        offsetStart: i * estimateSize,
        offsetEnd: (i + 1) * estimateSize,
        size: estimateSize,
      });
    }
    
    actions.setState("itemRects", rects);
    actions.setState("totalSize", count * estimateSize);
  });

  // Measure viewport size
  onMount(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const size = state.horizontal
          ? entry.contentRect.width
          : entry.contentRect.height;
        actions.setState("viewportSize", size);
      }
    });

    resizeObserver.observe(scrollerRef);
    onCleanup(() => resizeObserver.disconnect());
  });

  // Handle scroll
  const handleScroll = (e: Event) => {
    const target = e.currentTarget as HTMLElement;
    const offset = state.horizontal ? target.scrollLeft : target.scrollTop;
    actions.setState("scrollOffset", offset);
    actions.setState("scrolling", true);
    local.onScroll?.(offset);
  };

  // Debounce scrolling state
  createEffect(() => {
    if (state.scrolling) {
      const timer = setTimeout(() => {
        actions.setState("scrolling", false);
      }, 150);
      onCleanup(() => clearTimeout(timer));
    }
  });

  const visibleItems = createMemo(() => {
    const range = state.visibleRange;
    const items: JSX.Element[] = [];
    for (let i = range.start; i < range.end; i++) {
      items.push(local.children(i));
    }
    return items;
  });

  const offsetStyle = createMemo(() => {
    const range = state.visibleRange;
    const rect = state.itemRects[range.start];
    if (!rect) return {};
    
    return state.horizontal
      ? { paddingLeft: `${rect.offsetStart}px` }
      : { paddingTop: `${rect.offsetStart}px` };
  });

  return (
    <Context.Provider>
      <div
        {...others}
        ref={mergeRefs(local.ref, (el) => {
          scrollerRef = el;
        })}
        onScroll={handleScroll}
        style={combineStyle(
          {
            overflow: "auto",
            position: "relative",
          },
          local.style
        )}
      >
        <div
          ref={contentRef}
          style={combineStyle(
            state.horizontal
              ? {
                  width: `${state.totalSize}px`,
                  height: "100%",
                  display: "flex",
                }
              : {
                  height: `${state.totalSize}px`,
                  width: "100%",
                },
            offsetStyle()
          )}
        >
          {visibleItems()}
        </div>
      </div>
    </Context.Provider>
  );
}
