import { createUniqueId } from "solid-js";
import {
  callMaybeCallableChild,
  createWatch,
  type MaybeCallableChild,
} from "solid-tiny-utils";
import { context } from "./context";

export function Root(props: {
  children?: MaybeCallableChild<ReturnType<typeof context.useContext>>;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  name?: string;
  value?: string;
  indeterminate?: boolean;
}) {
  const Context = context.initial({
    checked: () => props.checked,
    disabled: () => props.disabled,
    indeterminate: () => props.indeterminate,
    value: () => props.value,
    name: () => props.name || `checkbox_${createUniqueId()}`,
  });

  const [state] = Context.value;

  createWatch(
    () => state.checked,
    (v) => {
      if (v !== props.checked) {
        props.onChange?.(v);
      }
    }
  );

  return (
    <Context.Provider>
      {callMaybeCallableChild(props.children, ...Context.value)}
    </Context.Provider>
  );
}
