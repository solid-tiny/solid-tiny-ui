import type { JSX } from "solid-js/jsx-runtime";
import { For } from "solid-js/web";
import { context } from "./context";
import { OneDialog } from "./one-dialog";

export function TinyDialogProvider(props: { children: JSX.Element }) {
  const Context = context.initial({});

  const [state] = Context.value;

  return (
    <Context.Provider>
      {props.children}
      <For each={state.dialogs}>{(dialog) => <OneDialog {...dialog} />}</For>
    </Context.Provider>
  );
}
