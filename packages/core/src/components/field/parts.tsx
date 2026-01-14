import css from "sass:./field.scss";
import { createUniqueId, type JSX, Show, splitProps } from "solid-js";
import {
  callMaybeCallableChild,
  combineClass,
  type MaybeCallableChild,
  mountStyle,
} from "solid-tiny-utils";
import { Flex } from "../../layout";
import type { OmitComponentProps } from "../../utils/types";

export function Root(
  props: {
    orientation?: "horizontal" | "vertical";
    children?: MaybeCallableChild<[{ uniqueId: string }]>;
  } & OmitComponentProps<typeof Flex, "vertical" | "children">
) {
  mountStyle(css, "tiny-field");
  const [local, others] = splitProps(props, ["orientation", "children", "gap"]);
  return (
    <Flex
      {...others}
      gap={local.gap ?? "sm"}
      vertical={local.orientation !== "horizontal"}
    >
      {callMaybeCallableChild(local.children, {
        uniqueId: `field_${createUniqueId()}`,
      })}
    </Flex>
  );
}

export function Title(
  props: {
    children?: JSX.Element;
    required?: boolean;
  } & OmitComponentProps<typeof Flex<"label">, "children">
) {
  const [local, others] = splitProps(props, [
    "required",
    "children",
    "class",
    "gap",
  ]);
  return (
    <Flex
      {...others}
      as={others.for ? "label" : "div"}
      class={combineClass("tiny-field__label", local.class)}
      gap={local.gap ?? "xs"}
    >
      {local.children}
      <Show when={local.required}>
        <span aria-hidden="true" class="tiny-field__required-indicator">
          *
        </span>
      </Show>
    </Flex>
  );
}

export function Description(props: { children?: JSX.Element }) {
  return <p class="tiny-field__description">{props.children}</p>;
}
