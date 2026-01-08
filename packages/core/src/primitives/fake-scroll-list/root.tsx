import type { JSX } from "solid-js";
import { combineStyle, createWatch } from "solid-tiny-utils";
import { context } from "./context";

export function Root(props: {
  children: JSX.Element;
  class?: string;
  style?: JSX.CSSProperties | string;
  items: string[];
  visibleItemsCount: number;
  itemHeight: number;
  inViewIndex: number;
  onInViewIndexChange: (index: number) => void;
}) {
  const Context = context.initial({
    items: () => props.items,
    visibleItemsCount: () => props.visibleItemsCount,
    itemHeight: () => props.itemHeight,
  });

  const [state, actions] = Context.value;

  createWatch(
    () => props.inViewIndex,
    (index) => {
      if (index !== state.fixedInViewIndex) {
        actions.setState("inViewIndex", index);
      }
    }
  );

  createWatch(
    () => state.fixedInViewIndex,
    (inViewIndex) => {
      if (inViewIndex !== props.inViewIndex) {
        props.onInViewIndexChange(inViewIndex);
      }
    }
  );

  const handleOnWheel = (e: WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const { deltaY } = e;
    const index = state.inViewIndex;
    const newIndex = deltaY > 0 ? index + 1 : index - 1;
    if (state.shouldFake) {
      if (
        newIndex >= -state.overScan + 3 &&
        newIndex < state.items.length + state.overScan - 3
      ) {
        actions.setState("inViewIndex", newIndex);
      }
    } else if (newIndex >= 0 && newIndex < state.items.length) {
      actions.setState("inViewIndex", newIndex);
    }
  };

  return (
    <Context.Provider>
      <div
        class={props.class}
        onWheel={handleOnWheel}
        style={combineStyle(
          {
            height: `${props.itemHeight * props.visibleItemsCount}px`,
            width: "100%",
            overflow: "hidden",
          },
          props.style
        )}
      >
        {props.children}
      </div>
    </Context.Provider>
  );
}
