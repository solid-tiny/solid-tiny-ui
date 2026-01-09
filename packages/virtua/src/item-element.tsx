import { Ref } from "@solid-primitives/refs";
import { createResizeObserver } from "@solid-primitives/resize-observer";
import { createSignal, For, type JSX, onMount } from "solid-js";
import { createWatch } from "solid-tiny-utils";
import { context } from "./context";

function ItemElement(props: { index: number; children: JSX.Element }) {
  const [, actions] = context.useContext();
  const [ref, setRef] = createSignal<HTMLElement | null>(null);

  createResizeObserver(ref, ({ height }) => {
    actions.setState("heightMap", props.index, height);
  });

  onMount(() => {
    const el = ref();
    if (!el) {
      return;
    }

    createWatch(
      () => actions.getItemOffset(props.index),
      (offset) => {
        const el = ref();
        if (el) {
          el.style.transform = `translateY(${offset}px)`;
        }
      }
    );
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

export function ItemElements(props: { children: () => JSX.Element }) {
  const [state] = context.useContext();

  return (
    <For each={state.visibleIndexes}>
      {(index) => <ItemElement index={index}>{props.children()}</ItemElement>}
    </For>
  );
}
