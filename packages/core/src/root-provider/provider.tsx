import globalStyles from "sass:./global.scss";
import { type ComponentProps, type JSX, splitProps } from "solid-js";
import { createWatch, mountStyle } from "solid-tiny-utils";
import { context } from "./context";
import {
  genColorStyles,
  genStatusColors,
  getBrandColors,
  getNeutralColors,
} from "./gen-colors";

export function RootProvider(props: { children?: JSX.Element; hue?: number }) {
  const Context = context.initial({
    hue: () => props.hue,
  });

  mountStyle(globalStyles, "solid-tiny-globals");
  mountStyle(genColorStyles(genStatusColors()), "tiny-c-status");

  const [state] = Context.value;

  createWatch(
    () => [state.hue] as const,
    ([hue]) => {
      mountStyle(
        genColorStyles(getBrandColors(hue)) +
          genColorStyles(getNeutralColors(hue)),
        "tiny-c-theme",
        true
      );
    }
  );

  return <Context.Provider>{props.children}</Context.Provider>;
}

export function Color(props: { hue: number } & ComponentProps<"div">) {
  const [local, others] = splitProps(props, ["hue", "children"]);
  return (
    <div {...others} data-hue={local.hue}>
      <style>
        {genColorStyles(getBrandColors(local.hue), `[data-hue="${local.hue}"]`)}
      </style>
      {local.children}
    </div>
  );
}
