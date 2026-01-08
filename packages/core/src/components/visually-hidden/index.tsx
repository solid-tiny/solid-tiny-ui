import css from "sass:./visually-hidden.scss";
import type { JSX } from "solid-js/jsx-runtime";
import { mountStyle } from "solid-tiny-utils";

export function VisuallyHidden(props: { children: JSX.Element }) {
  mountStyle(css, "tiny-visually-hidden");
  return <span class="tiny-visually-hidden">{props.children}</span>;
}
