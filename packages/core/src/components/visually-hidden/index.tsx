import css from "sass:./visually-hidden.scss";
import type { ComponentProps, ValidComponent } from "solid-js";
import { Dynamic } from "solid-js/web";
import { combineClass, mountStyle } from "solid-tiny-utils";

export function VisuallyHidden<T extends ValidComponent>(
  props: {
    as?: T;
  } & Omit<ComponentProps<T>, "as" | "component">
) {
  mountStyle(css, "tiny-visually-hidden");

  return (
    <Dynamic
      {...props}
      class={combineClass("tiny-visually-hidden", props.class)}
      component={props.as ?? "span"}
    />
  );
}
