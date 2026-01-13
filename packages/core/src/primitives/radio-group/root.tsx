import { createUniqueId } from "solid-js";
import {
  callMaybeCallableChild,
  createWatch,
  isDefined,
  type MaybeCallableChild,
} from "solid-tiny-utils";
import { rootContext } from "./context";

export function Root<T>(props: {
  value?: T;
  onChange?: (value: T) => void;
  name?: string;
  children?: MaybeCallableChild<ReturnType<typeof rootContext.useContext>>;
  disabled?: boolean;
}) {
  const Context = rootContext.initial({
    value: () => props.value,
    name: () => props.name || `radio-group_${createUniqueId()}`,
    disabled: () => props.disabled,
  });

  const [state] = Context.value;

  createWatch(
    () => state.value,
    (v) => {
      if (isDefined(v) && v !== props.value) {
        props.onChange?.(v as T);
      }
    }
  );

  return (
    <Context.Provider>
      {callMaybeCallableChild(props.children, ...Context.value)}
    </Context.Provider>
  );
}
