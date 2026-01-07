import { createWatch } from "solid-tiny-utils";
import {
  callMaybeContextChild,
  type MaybeContextChild,
} from "../../utils/types";
import { context } from "./context";

export function Root(props: {
  children: MaybeContextChild<typeof context>;
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
      {callMaybeContextChild(Context.value, props.children)}
    </Context.Provider>
  );
}
