import css from "sass:./password-input.scss";
import { createSignal, type JSX } from "solid-js";
import {
  combineClass,
  combineStyle,
  dataIf,
  mountStyle,
} from "solid-tiny-utils";
import { EyeLine, EyeOffLine } from "../../../icons";
import { createClassStyles, extraAriasAndDatasets } from "../../../utils";
import type { ClassNames, Styles } from "../../../utils/types";

export interface PasswordInputProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onPressEnter?: (e: KeyboardEvent) => void;
  size?: "small" | "medium" | "large";
  id?: string;
  name?: string;
  width?: JSX.CSSProperties["width"];
  invalid?: boolean;
  classNames?: ClassNames<
    "wrapper" | "input" | "toggle",
    {
      disabled: boolean;
      invalid: boolean;
      size: "small" | "medium" | "large";
      visible: boolean;
    }
  >;
  styles?: Styles<
    "wrapper" | "input" | "toggle",
    {
      disabled: boolean;
      invalid: boolean;
      size: "small" | "medium" | "large";
      visible: boolean;
    }
  >;
}

export function PasswordInput(props: PasswordInputProps) {
  mountStyle(css, "tiny-password-input");
  const [visible, setVisible] = createSignal(false);

  const [classes, styles] = createClassStyles(
    () => props.classNames,
    () => props.styles,
    () => ({
      disabled: props.disabled ?? false,
      invalid: props.invalid ?? false,
      size: (props.size || "medium") as "small" | "medium" | "large",
      visible: visible(),
    })
  );

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      props.onPressEnter?.(e);
      (e.currentTarget as HTMLInputElement).blur();
    }
  };

  return (
    <div
      class={combineClass("tiny-password-input-wrapper", classes().wrapper)}
      data-disabled={dataIf(props.disabled ?? false)}
      data-invalid={dataIf(props.invalid ?? false)}
      data-size={props.size || "medium"}
      style={combineStyle({ width: props.width }, styles().wrapper)}
    >
      <input
        {...extraAriasAndDatasets(props)}
        class={combineClass("tiny-password-input", classes().input)}
        disabled={props.disabled}
        id={props.id}
        name={props.name}
        onInput={(e) => {
          props.onChange?.(e.currentTarget.value);
        }}
        onKeyDown={handleKeyDown}
        placeholder={props.placeholder}
        style={combineStyle({}, styles().input)}
        type={visible() ? "text" : "password"}
        value={props.value}
      />
      <button
        aria-label={visible() ? "Hide password" : "Show password"}
        class={combineClass("tiny-password-input-toggle", classes().toggle)}
        data-disabled={dataIf(props.disabled ?? false)}
        disabled={props.disabled}
        onClick={() => setVisible(!visible())}
        style={combineStyle({}, styles().toggle)}
        type="button"
      >
        {visible() ? <EyeOffLine /> : <EyeLine />}
      </button>
    </div>
  );
}
