import { Ref } from "@solid-primitives/refs";
import { createResizeObserver } from "@solid-primitives/resize-observer";
import { createSignal, type JSX } from "solid-js";
import { createEventListener, createWatch } from "solid-tiny-utils";
import { context } from "./context";

export function ScrollElement(props: { children: JSX.Element }) {
  const [state, actions] = context.useContext();
  const [ref, setRef] = createSignal<HTMLElement | null>(null);

  createEventListener(ref, "scroll", (e) => {
    const el = e.currentTarget as HTMLElement;
    actions.setState("scrollTop", el.scrollTop);
  });

  createResizeObserver(ref, ({ height }) => {
    actions.setState("viewportHeight", height);
  });

  const allInRange = (start: number, end: number, keys: number[]) => {
    for (let i = start; i <= end; i++) {
      if (!keys.includes(i)) {
        return false;
      }
    }
    return true;
  };

  createWatch(
    () =>
      [
        state.startIndex,
        state.endIndex,
        { ...state.inViewHeightMap },
        state.averageItemHeight,
        state.scrollTop,
        state.viewportHeight,
      ] as const,
    ([startIndex, endIndex, heightMap, h]) => {
      if (startIndex < 0 || startIndex > endIndex) {
        return;
      }

      const keys = Object.keys(heightMap).map(Number);

      if (allInRange(startIndex, endIndex, keys)) {
        let offset = startIndex * h;
        for (let i = startIndex; i <= endIndex; i++) {
          actions.setState("inViewOffsetMap", i, offset);
          const itemHeight = heightMap[i] || 0;
          offset += itemHeight;
        }
      }
    }
  );

  return (
    <Ref
      ref={(el) => {
        setRef((el as HTMLElement) || null);
      }}
    >
      {props.children}
    </Ref>
  );
}
