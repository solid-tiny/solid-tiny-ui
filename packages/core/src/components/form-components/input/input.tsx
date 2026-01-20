import css from "sass:./input.scss";
import { dataIf, mountStyle } from "solid-tiny-utils";
import { extraAriasAndDatasets } from "../../../utils";

export interface InputProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onPressEnter?: () => void;
  size?: "small" | "medium" | "large";
  id?: string;
  name?: string;
}

export function Input(props: InputProps) {
  mountStyle(css, "tiny-input");
  return (
    <input
      class="tiny-input"
      data-disabled={dataIf(props.disabled ?? false)}
      data-size={props.size || "medium"}
      disabled={props.disabled}
      id={props.id}
      name={props.name}
      onInput={(e) => {
        props.onChange?.(e.currentTarget.value);
      }}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          props.onPressEnter?.();
        }
      }}
      placeholder={props.placeholder}
      type="text"
      value={props.value}
      {...extraAriasAndDatasets(props)}
    />
  );
}
