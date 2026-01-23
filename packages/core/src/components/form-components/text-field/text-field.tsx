import css from "sass:./text-field.scss";
import { children, type JSX, Show } from "solid-js";
import {
  combineClass,
  combineStyle,
  dataIf,
  mountStyle,
} from "solid-tiny-utils";
import { createClassStyles, extraAriasAndDatasets } from "../../../utils";
import type { ClassNames, Styles } from "../../../utils/types";

export interface TextFieldProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onPressEnter?: (e: KeyboardEvent) => void;
  size?: "small" | "medium" | "large";
  id?: string;
  name?: string;
  prefix?: JSX.Element;
  suffix?: JSX.Element;
  invalid?: boolean;
  classNames?: ClassNames<
    "root" | "input" | "prefix" | "suffix",
    {
      disabled: boolean;
      invalid: boolean;
      size: "small" | "medium" | "large";
    }
  >;
  styles?: Styles<
    "root" | "input" | "prefix" | "suffix",
    {
      disabled: boolean;
      invalid: boolean;
      size: "small" | "medium" | "large";
    }
  >;
}

export function TextField(props: TextFieldProps) {
  mountStyle(css, "tiny-text-field");
  const prefix = children(() => props.prefix);
  const suffix = children(() => props.suffix);

  const [classes, styles] = createClassStyles(
    () => props.classNames,
    () => props.styles,
    () => ({
      disabled: props.disabled ?? false,
      invalid: props.invalid ?? false,
      size: (props.size || "medium") as "small" | "medium" | "large",
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
      class={combineClass("tiny-text-field", classes().root)}
      data-disabled={dataIf(props.disabled ?? false)}
      data-invalid={dataIf(props.invalid ?? false)}
      data-size={props.size || "medium"}
      style={combineStyle({}, styles().root)}
    >
      <Show when={prefix()}>
        <div
          class={combineClass("tiny-text-field-prefix", classes().prefix)}
          style={combineStyle({}, styles().prefix)}
        >
          {prefix()}
        </div>
      </Show>
      <input
        {...extraAriasAndDatasets(props)}
        class={combineClass("tiny-text-field-input", classes().input)}
        disabled={props.disabled}
        id={props.id}
        name={props.name}
        onInput={(e) => {
          props.onChange?.(e.currentTarget.value);
        }}
        onKeyDown={handleKeyDown}
        placeholder={props.placeholder}
        style={combineStyle({}, styles().input)}
        type="text"
        value={props.value}
      />
      <Show when={suffix()}>
        <div
          class={combineClass("tiny-text-field-suffix", classes().suffix)}
          style={combineStyle({}, styles().suffix)}
        >
          {suffix()}
        </div>
      </Show>
    </div>
  );
}
