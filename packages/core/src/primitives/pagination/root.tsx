import {
  callMaybeCallableChild,
  createWatch,
  isDefined,
  type MaybeCallableChild,
  max,
} from "solid-tiny-utils";
import { context } from "./context";

export function Root(props: {
  current?: number;
  total?: number;
  pageSize?: number;
  onChange?: (page: number) => void;
  disabled?: boolean;
  siblingCount?: number;
  children?: MaybeCallableChild<ReturnType<typeof context.useContext>>;
}) {
  const Context = context.initial({
    current: () => props.current,
    total: () => props.total,
    pageSize: () => max(props.pageSize ?? 10, 1), // Ensure pageSize is at least 1
    disabled: () => props.disabled,
    siblingCount: () => props.siblingCount,
  });

  const [state] = Context.value;

  createWatch(
    () => state.current,
    (v) => {
      if (isDefined(v) && v !== props.current) {
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
