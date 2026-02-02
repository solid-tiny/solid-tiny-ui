import { autoUpdate } from "@floating-ui/dom";
import { mergeRefs } from "@solid-primitives/refs";
import type { JSX } from "solid-js";
import { onCleanup, onMount, Show, splitProps } from "solid-js";
import { Portal } from "solid-js/web";
import {
  createClickOutside,
  createPresence,
  createVisibilityObserver,
  createWatch,
  dataIf,
  noop,
} from "solid-tiny-utils";
import { getAnimationDurationMs } from "../../utils/duration";
import { context } from "./context";
import { runSolidEventHandler } from "./utils";

function FloatingContentCore(
  props: {
    zIndex?: number | "auto";
  } & JSX.HTMLAttributes<HTMLDivElement>
) {
  const [state, actions, staticData] = context.useContext();
  const [localProps, otherProps] = splitProps(props, [
    "children",
    "zIndex",
    "ref",
    "onMouseEnter",
    "onMouseLeave",
    "onAnimationEnd",
  ]);

  createClickOutside(
    () => state.refContent,
    () => {
      if (state.trigger !== "manual") {
        actions.setOpen(false);
      }
    },
    { ignore: [() => state.refTrigger] }
  );

  const isVisible = createVisibilityObserver(() => state.refTrigger, {
    initialValue: true,
  });

  createWatch(isVisible, (v) => {
    if (!v) {
      actions.setOpen(false);
    }
  });

  let cleanup = noop;

  onMount(() => {
    createWatch(
      () => [state.refTrigger, state.refContent],
      ([refTrigger, refContent]) => {
        if (refTrigger && refContent) {
          cleanup();
          cleanup = autoUpdate(refTrigger, refContent, () => {
            actions.updatePos();
          });
        }
      }
    );

    createWatch(
      () => state.disabled,
      (d) => {
        if (d) {
          actions._setOpen(false);
        }
      }
    );
  });

  onCleanup(() => {
    cleanup();
  });

  return (
    <div
      ref={(el) => {
        actions.setState("refContent", el);
      }}
      style={{
        transform: `translate3d(${state.x}px, ${state.y}px, 0px)`,
        top: 0,
        left: 0,
        position: "fixed",
        "z-index": localProps.zIndex ?? "auto",
        "min-width": "max-content",
        "pointer-events": "auto",
        opacity: state.initialized ? 1 : 0,
      }}
    >
      <div
        {...otherProps}
        data-entering={dataIf(
          ["pre-enter", "entering"].includes(staticData.presencePhase())
        )}
        data-exiting={dataIf(["exiting"].includes(staticData.presencePhase()))}
        data-placement={state.placement}
        data-presence-phase={staticData.presencePhase()}
        onMouseEnter={(e) => {
          if (state.canHoverContent && state.trigger === "hover") {
            actions.setOpen(true);
          }
          runSolidEventHandler(e, localProps.onMouseEnter);
        }}
        onMouseLeave={(e) => {
          if (state.canHoverContent && state.trigger === "hover") {
            actions.setOpen(false);
          }
          runSolidEventHandler(e, localProps.onMouseLeave);
        }}
        ref={mergeRefs(localProps.ref, (el) => {
          actions.setState("refContentInner", el);
        })}
        role="presentation"
      >
        {localProps.children}
      </div>
    </div>
  );
}

export function Content(
  props: {
    zIndex?: number | "auto";
  } & JSX.HTMLAttributes<HTMLDivElement>
) {
  const [state, , staticData] = context.useContext();

  const presence = createPresence(() => state.open, {
    enterDuration: () => getAnimationDurationMs(state.refContentInner),
    exitDuration: () => getAnimationDurationMs(state.refContentInner),
  });

  staticData.presencePhase = presence.phase;

  return (
    <Show when={presence.isMounted()}>
      <Portal mount={document.body}>
        <FloatingContentCore {...props} />
      </Portal>
    </Show>
  );
}
