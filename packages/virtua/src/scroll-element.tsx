import { Ref } from "@solid-primitives/refs";
import { createResizeObserver } from "@solid-primitives/resize-observer";
import { createSignal, type JSX } from "solid-js";
import { createEventListener } from "solid-tiny-utils";
import { context } from "./context";

export function ScrollElement(props: { children: JSX.Element }) {
  const [, actions] = context.useContext();
  const [ref, setRef] = createSignal<HTMLElement | null>(null);

  createEventListener(ref, "scroll", (e) => {
    const el = e.currentTarget as HTMLElement;
    actions.setState("scrollTop", el.scrollTop);
  });

  createResizeObserver(ref, ({ height }) => {
    actions.setState("viewportHeight", height);
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
