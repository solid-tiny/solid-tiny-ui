import globalStyles from "sass:./global.scss";
import type { JSX } from "solid-js";
import { createWatch, mountStyle } from "solid-tiny-utils";
import { context } from "./context";
import { genVars } from "./gen-brand";

export function RootProvider(props: { children?: JSX.Element; hue?: number }) {
  const Context = context.initial({
    hue: () => props.hue,
  });

  mountStyle(globalStyles, "solid-tiny-globals");

  const [state] = Context.value;

  createWatch(
    () => [state.hue] as const,
    ([hue]) => {
      mountStyle(genVars(hue), "solid-tiny-brand", true);
    }
  );

  return <Context.Provider>{props.children}</Context.Provider>;
}
