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

export function OneToaster(props: Toast) {
  const [ref, setRef] = createSignal<HTMLDivElement | null>(null);
  const [state, actions] = context.useContext();
  const [show, setShow] = createSignal(true);

  const [mount, presenceState] = createPresence({
    element: () => ref() || undefined,
    show,
  });

  createWatch(mount, (shouldMount) => {
    if (!shouldMount) {
      actions.removeToast(props.id);
    }
  });

  return (
    <Show when={mount()}>
      <div
        class="tiny-toast"
        data-status={presenceState()}
        onMouseEnter={() => {
          actions.setState("pauseRemoval", true);
        }}
        onMouseLeave={() => {
          actions.setState("pauseRemoval", false);
        }}
        ref={setRef}
        role="presentation"
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
