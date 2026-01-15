import { mergeRefs, Ref } from "@solid-primitives/refs";
import type { JSX } from "solid-js";
import { createWatch, makeEventListener } from "solid-tiny-utils";
import { context } from "./context";

export function Trigger(props: {
  ref?: HTMLElement | ((el: HTMLElement) => void);
  children: JSX.Element;
}) {
  const [state, actions, staticData] = context.useContext();

  createWatch(
    () => state.refTrigger,
    (refTrigger) => {
      if (!refTrigger) {
        return;
      }

      makeEventListener(refTrigger, "mouseenter", () => {
        state.trigger === "hover" && actions.setOpen(true);
      });

      makeEventListener(refTrigger, "mouseleave", () => {
        state.trigger === "hover" && actions.setOpen(false);
      });

      makeEventListener(refTrigger, "click", () => {
        state.trigger === "click" &&
          actions.setOpen(staticData.presencePhase() === "idle");
      });
    }
  );

  return (
    <Ref
      ref={
        mergeRefs(props.ref, (el) => {
          actions.setState("refTrigger", el);
        }) as Ref<Element | undefined>
      }
    >
      {props.children}
    </Ref>
  );
}
