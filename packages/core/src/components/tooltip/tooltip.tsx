import css from "sass:./tooltip.scss";
import type { JSX } from "solid-js";
import { mountStyle } from "solid-tiny-utils";
import { FloatingUiCore } from "../../primitives/floating";

export interface TooltipProps {
  placement?: "top" | "bottom" | "left" | "right";
  content: string;
  children: JSX.Element;
  disabled?: boolean;
}
export function Tooltip(props: TooltipProps) {
  mountStyle(css, "tiny-tooltip");
  return (
    <FloatingUiCore
      disabled={props.disabled}
      placement={props.placement ?? "top"}
      trigger="hover"
    >
      <FloatingUiCore.Trigger>{props.children}</FloatingUiCore.Trigger>
      <FloatingUiCore.Content class="tiny-tooltip__content">
        {props.content}
      </FloatingUiCore.Content>
    </FloatingUiCore>
  );
}
