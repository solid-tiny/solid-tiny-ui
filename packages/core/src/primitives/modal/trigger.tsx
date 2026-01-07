import { mergeRefs, Ref } from "@solid-primitives/refs";
import { type JSX, onMount } from "solid-js";
import { makeEventListener } from "solid-tiny-utils";

import { context } from "./context";

export function Trigger(props: {
  children: JSX.Element;
  ref?: Ref<Element | undefined>;
}) {
  let ref!: Element;
  const [, actions] = context.useContext();

  onMount(() => {
    makeEventListener(ref, "click", () => {
      actions.setState("open", true);
    });
  });

  return (
    <Ref
      ref={mergeRefs(props.ref, (r) => {
        if (r) {
          ref = r;
        }
      })}
    >
      {props.children}
    </Ref>
  );
}
