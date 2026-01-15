import { createSignal, type JSX, Show } from "solid-js";
import { createPresence, dataIf, type PresencePhase } from "solid-tiny-utils";
import { extraAriasAndDatasets } from "../../utils";
import { context } from "./context";

function Content(props: {
  children: JSX.Element;
  key: string;
  ref: (el: HTMLElement) => void;
  presencePhase: PresencePhase;
  class?: string;
  style?: string | JSX.CSSProperties;
}) {
  return (
    <div
      {...extraAriasAndDatasets(props)}
      class={props.class}
      data-entering={dataIf(
        ["pre-enter", "entering"].includes(props.presencePhase)
      )}
      data-exiting={dataIf(props.presencePhase === "exiting")}
      data-key={props.key}
      ref={props.ref}
      style={props.style}
    >
      {props.children}
    </div>
  );
}

export function Panel(props: {
  children: JSX.Element;
  key: string;
  class?: string;
  style?: string | JSX.CSSProperties;
}) {
  const [state] = context.useContext();
  const [ref, setRef] = createSignal<HTMLElement | undefined>();

  const presence = createPresence(() => state.active === props.key, {
    enterDuration: () => {
      const el = ref();
      if (!el) {
        return 0;
      }
      const styles = getComputedStyle(el);
      const duration = Number.parseFloat(styles.animationDuration || "0");

      return styles.animationDuration.endsWith("ms")
        ? duration
        : duration * 1000;
    },
    exitDuration: 150,
  });

  return (
    <Show when={presence.isMounted()}>
      <Content {...props} presencePhase={presence.phase()} ref={setRef} />
    </Show>
  );
}
