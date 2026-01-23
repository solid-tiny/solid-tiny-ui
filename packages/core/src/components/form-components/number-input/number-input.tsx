import css from "sass:./number-input.scss";
import { createMemo, createSignal, type JSX } from "solid-js";
import {
  combineClass,
  combineStyle,
  createWatch,
  dataIf,
  isDefined,
  isUndefined,
  mountStyle,
} from "solid-tiny-utils";
import { createClassStyles, extraAriasAndDatasets } from "../../../utils";
import type { ClassNames, Styles } from "../../../utils/types";

export interface NumberInputProps<Nullable extends boolean> {
  value?: number;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: Nullable extends true ? number | null : number) => void;
  onPressEnter?: (e: KeyboardEvent) => void;
  size?: "small" | "medium" | "large";
  id?: string;
  name?: string;
  min?: number;
  max?: number;
  step?: number;
  nullable?: Nullable;
  invalid?: boolean;
  width?: JSX.CSSProperties["width"];
  classNames?: ClassNames<
    "wrapper" | "input",
    {
      disabled: boolean;
      invalid: boolean;
      size: "small" | "medium" | "large";
    }
  >;
  styles?: Styles<
    "wrapper" | "input",
    {
      disabled: boolean;
      invalid: boolean;
      size: "small" | "medium" | "large";
    }
  >;
}

export function NumberInput<Nullable extends boolean = false>(
  props: NumberInputProps<Nullable>
) {
  mountStyle(css, "tiny-number-input");

  const [invalid, setInvalid] = createSignal(false);

  const [inputVal, setInputVal] = createSignal<number | null>(null);

  const [classes, styles] = createClassStyles(
    () => props.classNames,
    () => props.styles,
    () => ({
      disabled: props.disabled ?? false,
      invalid: invalid(),
      size: (props.size || "medium") as "small" | "medium" | "large",
    })
  );

  const handleInput = (e: Event) => {
    const target = e.currentTarget as HTMLInputElement;
    const value = target.value;

    if (value === "") {
      setInputVal(null);
      return;
    }

    const numValue = Number(value);
    if (!Number.isNaN(numValue)) {
      setInputVal(numValue);
    }
  };

  const handleBlur = (e: Event) => {
    const target = e.currentTarget as HTMLInputElement;
    const value = target.value;
    if (value === "") {
      if (props.nullable) {
        setInputVal(null);
      } else {
        // If not nullable, reset to min
        setInputVal(props.min ?? 0);
        target.value = String(inputVal());
      }
    }
  };

  const isValueInRange = createMemo(() => {
    const v = inputVal();
    if (isUndefined(v) || v === null) {
      return true;
    }

    if (isDefined(props.min) && v < props.min) {
      return false;
    }
    if (isDefined(props.max) && v > props.max) {
      return false;
    }

    return true;
  });

  createWatch(
    () => [props.invalid, isValueInRange()],
    ([invalid, isInRange]) => {
      setInvalid(!!invalid || !isInRange);
    }
  );

  createWatch(
    () => [inputVal(), invalid()] as const,
    ([val, invalid]) => {
      if (!invalid && val !== props.value) {
        if (props.nullable) {
          props.onChange?.(
            val as Nullable extends true ? number | null : number
          );
        } else {
          props.onChange?.(val === null ? (props.min ?? 0) : val);
        }
      }
    },
    { defer: true }
  );

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      props.onPressEnter?.(e);
      (e.currentTarget as HTMLInputElement).blur();
    }
  };

  return (
    <div
      class={combineClass("tiny-number-input-wrapper", classes().wrapper)}
      data-disabled={dataIf(props.disabled ?? false)}
      data-invalid={dataIf(invalid())}
      data-size={props.size || "medium"}
      style={combineStyle({ width: props.width }, styles().wrapper)}
    >
      <input
        {...extraAriasAndDatasets(props)}
        class={combineClass("tiny-number-input", classes().input)}
        disabled={props.disabled}
        id={props.id}
        max={props.max}
        min={props.min}
        name={props.name}
        onBlur={handleBlur}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        placeholder={props.placeholder}
        step={props.step}
        style={combineStyle({}, styles().input)}
        type="number"
        value={props.value}
      />
    </div>
  );
}
