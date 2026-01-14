import css from "sass:./field.scss";
import { type JSX, Show, splitProps } from "solid-js";
import { mountStyle } from "solid-tiny-utils";
import { Flex } from "../../layout";
import type { OmitComponentProps } from "../../utils/types";

export function Root(
  props: {
    orientation?: "horizontal" | "vertical";
  } & OmitComponentProps<typeof Flex, "vertical">
) {
  mountStyle(css, "tiny-field");
  const [local, others] = splitProps(props, ["orientation", "children", "gap"]);
  return (
    <Flex
      {...others}
      gap={local.gap ?? "sm"}
      vertical={local.orientation !== "horizontal"}
    >
      {local.children}
    </Flex>
  );
}

export function Label(props: { children?: JSX.Element; required?: boolean }) {
  return (
    <div class="tiny-field__label">
      {props.children}
      <Show when={props.required}>
        <span aria-hidden="true" class="tiny-field__required-indicator">
          *
        </span>
      </Show>
    </div>
  );
}

export function Description(props: { children?: JSX.Element }) {
  return <div class="tiny-field__description">{props.children}</div>;
}
