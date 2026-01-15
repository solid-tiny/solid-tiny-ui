import { createSignal, onMount, Show, untrack } from "solid-js";
import { createPresence, createWatch } from "solid-tiny-utils";
import { context } from "./context";
import type { Toast } from "./type";

function HiddenAutoRemoval(props: {
  duration: number;
  pause: boolean;
  onEnd: () => void;
}) {
  const initialDuration = untrack(() => props.duration);

  let ref!: HTMLDivElement;

  onMount(() => {
    requestAnimationFrame(() => {
      ref.style.width = "0";
    });
    createWatch(
      () => [props.duration, props.pause] as const,
      ([duration, pause]) => {
        // biome-ignore lint/style/noNonNullAssertion: safe
        const percent = ref.clientWidth / ref.parentElement!.clientWidth;

        if (pause) {
          ref.style.width = `${percent * 100}%`;
          ref.style.transition = "none";
        } else {
          ref.style.width = "0";
          ref.style.transition = `width ${duration * percent}ms linear`;
        }
      },
      { defer: true }
    );
  });

  return (
    <div
      onTransitionEnd={props.onEnd}
      ref={ref}
      style={{
        width: "100%",
        position: "absolute",
        transition: `width ${initialDuration}ms linear`,
      }}
    />
  );
}

function getItemRealHeight(el: HTMLDivElement) {
  const prevHeight = el.style.height;
  el.style.height = "auto";
  const height = el.clientHeight;
  el.style.height = prevHeight;
  return height;
}

export function OneToaster(props: Toast) {
  const [state, actions] = context.useContext();
  const [show, setShow] = createSignal(true);

  const [height, setHeight] = createSignal(0);

  const presence = createPresence(show, {
    enterDuration: 150,
    exitDuration: 150,
  });

  createWatch(presence.isMounted, (shouldMount) => {
    if (!shouldMount) {
      actions.removeToast(props.id);
    }
  });

  let ref!: HTMLDivElement;

  return (
    <Show when={presence.isMounted()}>
      <div
        class="tiny-toast"
        data-presence-phase={presence.phase()}
        onMouseEnter={() => {
          actions.setState("pauseRemoval", true);
        }}
        onMouseLeave={() => {
          actions.setState("pauseRemoval", false);
        }}
        ref={ref}
        role="presentation"
        style={{
          height: 0,
          transition: "height 150ms ease-in-out",
          overflow: "hidden",
        }}
      >
        {props.message}
        <HiddenAutoRemoval
          duration={props.duration}
          onEnd={() => {
            setShow(false);
          }}
          pause={state.pauseRemoval}
        />
      </div>
    </Show>
  );
}
