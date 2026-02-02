import css from "sass:./tooltip.scss";
import type { JSX } from "solid-js";
import { combineClass, combineStyle, mountStyle } from "solid-tiny-utils";
import { FloatingUiCore } from "../../primitives/floating";
import { createClassStyles } from "../../utils";
import type { ClassNames, Styles } from "../../utils/types";

export interface TooltipProps {
  placement?: "top" | "bottom" | "left" | "right";
  zIndex?: number | "auto";
  content: string;
  children: JSX.Element;
  disabled?: boolean;
  classNames?: ClassNames<
    "content",
    {
      disabled: boolean;
    }
  >;
  styles?: Styles<
    "content",
    {
      disabled: boolean;
    }
  >;
}
export function Tooltip(props: TooltipProps) {
  mountStyle(css, "tiny-tooltip");

  const [classes, styles] = createClassStyles(
    () => props.classNames,
    () => props.styles,
    () => ({
      disabled: props.disabled ?? false,
    })
  );

  return (
    <FloatingUiCore
      disabled={props.disabled}
      placement={props.placement ?? "top"}
      trigger="hover"
    >
      <FloatingUiCore.Trigger>{props.children}</FloatingUiCore.Trigger>
      <FloatingUiCore.Content
        class={combineClass("tiny-tooltip__content", classes().content)}
        style={combineStyle({}, styles().content)}
        zIndex={props.zIndex}
      >
        {props.content}
      </FloatingUiCore.Content>
    </FloatingUiCore>
  );
}
