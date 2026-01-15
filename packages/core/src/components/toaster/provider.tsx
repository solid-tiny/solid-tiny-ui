import css from "sass:./toaster.scss";
import type { JSX } from "solid-js/jsx-runtime";
import { For, Portal } from "solid-js/web";
import { mountStyle } from "solid-tiny-utils";
import { context } from "./context";
import { ToasterLocator } from "./locator";
import { OneToaster } from "./one-toaster";
import type { ToastPosition } from "./type";

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

export function TinyToasterProvider(props: {
  children: JSX.Element;
  defaultDuration?: number;
  defaultPosition?: ToastPosition;
}) {
  mountStyle(css, "tiny-toaster");

  const Context = context.initial({
    defaultDuration: () => props.defaultDuration,
    defaultPosition: () => props.defaultPosition,
  });

  const [, actions] = Context.value;

  const positions = [
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ] as const;

  return (
    <Context.Provider>
      <Portal>
        <ToasterContainer>
          <For each={positions}>
            {(pos) => (
              <ToasterLocator position={pos}>
                <For each={actions.getToastsByPosition(pos)}>
                  {(toast) => <OneToaster {...toast} />}
                </For>
              </ToasterLocator>
            )}
          </For>
        </ToasterContainer>
      </Portal>
      {props.children}
    </Context.Provider>
  );
}
