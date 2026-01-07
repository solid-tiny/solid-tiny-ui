import { createSignal, type JSX, Show } from "solid-js";
import { createPresence, dataIf } from "solid-tiny-utils";
import { extraAriasAndDatasets } from "../../utils";
import { context } from "./context";

function Content(props: {
  children: JSX.Element;
  key: string;
  ref: (el: HTMLElement) => void;
  status: string;
  class?: string;
  style?: string | JSX.CSSProperties;
}) {
  return (
    <div
      {...extraAriasAndDatasets(props)}
      class={props.class}
      data-closing={dataIf(props.status === "closing")}
      data-key={props.key}
      data-opening={dataIf(props.status === "opening")}
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

  const [show, presenceState] = createPresence({
    show: () => state.active === props.key,
    element: ref,
  });

  return (
    <Show when={show()}>
      <Content {...props} ref={setRef} status={presenceState()} />
    </Show>
  );
}
