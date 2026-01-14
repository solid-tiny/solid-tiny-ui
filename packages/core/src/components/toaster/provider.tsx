import css from "sass:./toaster.scss";
import type { JSX } from "solid-js/jsx-runtime";
import { For, Portal } from "solid-js/web";
import { mountStyle } from "solid-tiny-utils";
import { context } from "./context";
import { OneToaster } from "./one-toaster";

function ToasterContainer(props: {
  children: JSX.Element;
  zIndex?: number;
  padding?: number;
}) {
  return (
    <div
      style={{
        "z-index": props.zIndex ?? 9999,
        position: "fixed",
        inset: props.padding ? `${props.padding}px` : "16px",
        "pointer-events": "none",
      }}
    >
      {props.children}
    </div>
  );
}

export function TinyToasterProvider(props: { children: JSX.Element }) {
  mountStyle(css, "tiny-toaster");

  const Context = context.initial();

  const [state] = Context.value;

  return (
    <Context.Provider>
      <Portal>
        <ToasterContainer>
          <For each={state.toasts}>
            {(toast) => (
              // Render your Toast component here
              <OneToaster {...toast} />
            )}
          </For>
        </ToasterContainer>
      </Portal>
      {props.children}
    </Context.Provider>
  );
}
