import { Ref } from "@solid-primitives/refs";
import { createResizeObserver } from "@solid-primitives/resize-observer";
import {
  createMemo,
  createSignal,
  For,
  type JSX,
  onCleanup,
  onMount,
} from "solid-js";
import { createWatch } from "solid-tiny-utils";
import { context } from "./context";

function ItemElement(props: { index: number; children: JSX.Element }) {
  const [state, actions] = context.useContext();
  const [ref, setRef] = createSignal<HTMLElement | null>(null);

  createResizeObserver(ref, ({ height }) => {
    if (!ref()) {
      return;
    }
    actions.setState("heightMap", props.index, height);
    actions.setState("inViewHeightMap", props.index, height);
  });

  onMount(() => {
    const offset = createMemo(() => state.inViewOffsetMap[props.index]);

    createWatch(offset, (offset) => {
      if (offset !== undefined) {
        ref()?.style.setProperty("top", `${offset}px`);
      }
    });
  });

  onCleanup(() => {
    //biome-ignore lint/style/noNonNullAssertion: remove entry
    actions.setState("inViewHeightMap", props.index, undefined!);
  });

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

export function ItemElements(props: {
  children: (itemIndex: number) => JSX.Element;
}) {
  const [state] = context.useContext();

  return (
    <For each={state.visibleIndexes}>
      {(index) => (
        <ItemElement index={index}>{props.children(index)}</ItemElement>
      )}
    </For>
  );
}
