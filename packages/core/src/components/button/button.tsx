import css from "sass:./button.scss";
import { children, createMemo, createSignal, Show } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import {
  combineClass,
  dataIf,
  isString,
  type MaybePromise,
  mountStyle,
} from "solid-tiny-utils";
import { createClassStyles, extraAriasAndDatasets } from "../../utils";
import type { ClassNames, Styles } from "../../utils/types";
import { SpinRing } from "../spin";
import { Tooltip } from "../tooltip";
import { context } from "./context";

export type ButtonVariants = "solid" | "link" | "text" | "outline" | "subtle";
export type ButtonColors =
  | "primary"
  | "neutral"
  | "success"
  | "danger"
  | "warning"
  | "info";

export type ButtonState = ReturnType<typeof context.useContext>[0];

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
  disabled?: boolean | string;
  type?: JSX.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: (e: MouseEvent) => MaybePromise<void>;
  loading?: boolean;
}

export function Button(props: ButtonProps) {
  mountStyle(css, "tiny-btn");

  const [isHandling, setIsHandling] = createSignal(false);

  const Ctx = context.initial({
    variant: () => props.variant,
    color: () => props.color,
    size: () => props.size,
    disabled: () => props.disabled,
    iconPlacement: () => props.iconPlacement,
    rounded: () => props.rounded,
    loading: () => props.loading || isHandling(),
  });

  const [state] = Ctx.value;

  const resolvedChild = children(() => props.children);
  const resolvedIcon = children(() => props.icon);

  const iconOnly = createMemo(() => !resolvedChild());

  const [classes, styles] = createClassStyles(
    () => props.classNames,
    () => props.styles,
    () => ({
      ...state,
    })
  );

  const handleClick = (e: MouseEvent) => {
    if (state.loading) {
      return;
    }
    setIsHandling(true);
    const runClick = async (e: MouseEvent) => {
      try {
        await props.onClick?.(e);
      } finally {
        setIsHandling(false);
      }
    };
    runClick(e);
  };

  return (
    <Ctx.Provider>
      <Tooltip
        content={typeof state.disabled === "string" ? state.disabled : ""}
        disabled={!(state.disabled && isString(state.disabled))}
      >
        <button
          {...extraAriasAndDatasets(props)}
          class={combineClass("tiny-btn", classes().root)}
          data-color={state.disabled ? undefined : state.color}
          data-disabled={dataIf(!!state.disabled)}
          data-icon-only={dataIf(iconOnly())}
          data-icon-placement={state.iconPlacement}
          data-loading={dataIf(state.loading)}
          data-rounded={dataIf(state.rounded ?? false)}
          data-size={state.size}
          data-variant={state.variant}
          disabled={!!state.disabled}
          onClick={handleClick}
          style={styles().root}
          type={props.type ?? "button"}
        >
          <Show when={resolvedIcon()}>
            <div
              class={combineClass("tiny-btn__icon", classes().icon)}
              style={styles().icon}
            >
              {resolvedIcon()}
            </div>
          </Show>
          <Show when={resolvedChild()}>
            <div
              class={combineClass("tiny-btn__content", classes().content)}
              style={styles().content}
            >
              {resolvedChild()}
            </div>
          </Show>
          <div class="tiny-btn__loader">
            <SpinRing color="currentColor" size={18} />
          </div>
        </button>
      </Tooltip>
    </Ctx.Provider>
  );
}
