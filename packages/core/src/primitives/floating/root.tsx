import type { JSX } from "solid-js/jsx-runtime";
import { callMaybeCallableChild, createWatch } from "solid-tiny-utils";
import { context } from "./context";
import type { FloatingUiCoreProps } from "./types";

export function Root(
  props: {
    children:
      | JSX.Element
      | ((...args: ReturnType<typeof context.useContext>) => JSX.Element);
  } & FloatingUiCoreProps
) {
  const Context = context.initial({
    trigger: () => props.trigger,
    originalPlacement: () => props.placement,
    openDelay: () => props.openDelay,
    closeDelay: () => props.closeDelay,
    canHoverContent: () => props.canHoverContent,
    disabled: () => props.disabled,
    plugin: () => ({
      ...context.defaultValue().plugin,
      ...props.floatingOption,
    }),
  });
  const [state, actions] = Context.value;

  createWatch(
    [
      () => state.originalPlacement,
      () => ({ ...state.plugin }),
      () => state.arrow,
    ],
    () => {
      actions.updatePos();
    }
  );

  return (
    <Context.Provider>
      {callMaybeCallableChild(props.children, ...Context.value)}
    </Context.Provider>
  );
}
