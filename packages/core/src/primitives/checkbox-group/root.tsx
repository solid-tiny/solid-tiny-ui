import { createUniqueId } from "solid-js";
import {
  callMaybeCallableChild,
  createWatch,
  isUndefined,
  type MaybeCallableChild,
} from "solid-tiny-utils";
import { context } from "./context";

export function Root<T>(props: {
  children?: MaybeCallableChild<ReturnType<typeof context.useContext>>;
  selectValues?: T[];
  name?: string;
  disabled?: boolean;
  onChange?: (values: T[]) => void;
}) {
  const Context = context.initial({
    selectValues: () => props.selectValues,
    name: () => props.name ?? `checkbox_group_${createUniqueId()}`,
    disabled: () => props.disabled,
  });

  const [state] = Context.value;

  createWatch(
    () => state.selectValues,
    (v) => {
      const propValues = props.selectValues;
      if (
        isUndefined(propValues) ||
        JSON.stringify([...v].sort()) !== JSON.stringify([...propValues].sort())
      ) {
        props.onChange?.(v as T[]);
      }
    }
  );

  return (
    <Context.Provider>
      {callMaybeCallableChild(props.children, ...Context.value)}
    </Context.Provider>
  );
}
