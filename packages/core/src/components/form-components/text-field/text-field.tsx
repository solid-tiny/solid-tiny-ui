import css from "sass:./text-field.scss";
import { children, type JSX, Show } from "solid-js";
import { dataIf, mountStyle } from "solid-tiny-utils";
import { extraAriasAndDatasets } from "../../../utils";

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
}

export function TextField(props: TextFieldProps) {
  mountStyle(css, "tiny-text-field");
  const prefix = children(() => props.prefix);
  const suffix = children(() => props.suffix);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      props.onPressEnter?.(e);
      (e.currentTarget as HTMLInputElement).blur();
    }
  };

  return (
    <div
      class="tiny-text-field"
      data-disabled={dataIf(props.disabled ?? false)}
      data-invalid={dataIf(props.invalid ?? false)}
      data-size={props.size || "medium"}
    >
      <Show when={prefix()}>
        <div class="tiny-text-field-prefix">{prefix()}</div>
      </Show>
      <input
        {...extraAriasAndDatasets(props)}
        class="tiny-text-field-input"
        disabled={props.disabled}
        id={props.id}
        name={props.name}
        onInput={(e) => {
          props.onChange?.(e.currentTarget.value);
        }}
        onKeyDown={handleKeyDown}
        placeholder={props.placeholder}
        type="text"
        value={props.value}
      />
      <Show when={suffix()}>
        <div class="tiny-text-field-suffix">{suffix()}</div>
      </Show>
    </div>
  );
}
