import basicBtnCss from "sass:./basic-button.scss";
import { children, createMemo, type JSX, mergeProps, Show } from "solid-js";
import { dataIf, mountStyle } from "solid-tiny-utils";
import {
  extraAriasAndDatasets,
  makeClassNames,
  makeStyles,
  mergeClassNames,
} from "../../../utils";
import type { ClassNames, Styles } from "../../../utils/types";

export type ButtonVariants = "solid" | "link" | "text" | "outline" | "subtle";
export type ButtonColors =
  | "primary"
  | "secondary"
  | "link"
  | "success"
  | "danger"
  | "warning"
  | "info";

export interface ButtonState {
  variant: ButtonVariants;
  color: ButtonColors;
  size: "small" | "medium" | "large";
  disabled: boolean;
  iconPlacement: "start" | "end";
}

export type ButtonFields = "root" | "icon" | "bg" | "content";

export interface ButtonProps {
  variant?: ButtonVariants;
  color?: ButtonColors;
  size?: "small" | "medium" | "large";
  icon?: JSX.Element;
  children?: JSX.Element;
  iconPlacement?: "start" | "end";
  rounded?: boolean;
  classNames?: ClassNames<ButtonFields, ButtonState>;
  styles?: Styles<ButtonFields, ButtonState>;
  disabled?: boolean;
  type?: JSX.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
  slot?: {
    root?: JSX.Element;
  };
}

export const Button = (props: ButtonProps) => {
  mountStyle(basicBtnCss, "tiny-btn");

  const real = mergeProps(
    {
      variant: "solid" as const,
      color: "secondary" as const,
      size: "medium" as const,
      iconPlacement: "start" as const,
      type: "button" as const,
    },
    props
  );

  const classNames = createMemo(() => {
    return makeClassNames(real.classNames, {
      variant: real.variant,
      color: real.color,
      size: real.size,
      disabled: !!real.disabled,
      iconPlacement: real.iconPlacement,
    });
  });

  const styles = createMemo(() => {
    return makeStyles(real.styles, {
      variant: real.variant,
      color: real.color,
      size: real.size,
      disabled: !!real.disabled,
      iconPlacement: real.iconPlacement,
    });
  });

  const resolvedChild = children(() => real.children);
  const resolvedIcon = children(() => real.icon);

  const iconOnly = createMemo(() => !resolvedChild());

  return (
    <button
      {...extraAriasAndDatasets(real)}
      class={mergeClassNames(["tiny-btn", classNames().root])}
      data-color={real.color}
      data-disabled={dataIf(real.disabled ?? false)}
      data-icon-only={dataIf(iconOnly())}
      data-icon-placement={real.iconPlacement}
      data-rounded={dataIf(real.rounded ?? false)}
      data-size={real.size}
      data-variant={real.variant}
      disabled={real.disabled}
      onClick={real.onClick}
      style={styles().root}
      type={real.type}
    >
      <div
        class={mergeClassNames(["tiny-btn__bg", classNames().bg])}
        style={styles().bg}
      />
      <Show when={resolvedIcon()}>
        <div
          class={mergeClassNames(["tiny-btn__icon", classNames().icon])}
          style={styles().icon}
        >
          {resolvedIcon()}
        </div>
      </Show>
      <Show when={resolvedChild()}>
        <div
          class={mergeClassNames(["tiny-btn__content", classNames().content])}
          style={styles().content}
        >
          {resolvedChild()}
        </div>
      </Show>
      {real.slot?.root}
    </button>
  );
};
