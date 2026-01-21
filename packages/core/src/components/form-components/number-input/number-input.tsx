import css from "sass:./number-input.scss";
import { dataIf, mountStyle } from "solid-tiny-utils";
import { extraAriasAndDatasets } from "../../../utils";

export interface NumberInputProps {
  value?: number;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: number | undefined) => void;
  onPressEnter?: () => void;
  size?: "small" | "medium" | "large";
  id?: string;
  name?: string;
  min?: number;
  max?: number;
  step?: number;
}

export function NumberInput(props: NumberInputProps) {
  mountStyle(css, "tiny-number-input");

  const handleInput = (e: Event) => {
    const target = e.currentTarget as HTMLInputElement;
    const value = target.value;
    
    if (value === "") {
      props.onChange?.(undefined);
    } else {
      const numValue = Number(value);
      if (!Number.isNaN(numValue)) {
        props.onChange?.(numValue);
      }
    }
  };

  return (
    <input
      class="tiny-number-input"
      data-disabled={dataIf(props.disabled ?? false)}
      data-size={props.size || "medium"}
      disabled={props.disabled}
      id={props.id}
      max={props.max}
      min={props.min}
      name={props.name}
      onInput={handleInput}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          props.onPressEnter?.();
        }
      }}
      placeholder={props.placeholder}
      step={props.step}
      type="number"
      value={props.value}
      {...extraAriasAndDatasets(props)}
    />
  );
}
