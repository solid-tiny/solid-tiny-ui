import {
  callMaybeCallableChild,
  createWatch,
  type MaybeCallableChild,
} from "solid-tiny-utils";
import { context } from "./context";

export function Root(props: {
  children: MaybeCallableChild<ReturnType<typeof context.useContext>>;
  activeKey?: string;
  onChange?: (key: string) => void;
}) {
  const Context = context.initial({
    active: () => props.activeKey,
  });

  const [state] = Context.value;

  createWatch(
    () => state.active,
    (active) => {
      if (active !== props.activeKey) {
        props.onChange?.(active);
      }
    }
  );

  return (
    <Context.Provider>
      {callMaybeCallableChild(props.children, ...Context.value)}
    </Context.Provider>
  );
}
