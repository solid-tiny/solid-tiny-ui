import css from "sass:./checkbox.scss";
import { mergeRefs } from "@solid-primitives/refs";
import {
  type ComponentProps,
  children,
  createSignal,
  type JSX,
} from "solid-js";
import { createWatch, dataIf, mountStyle } from "solid-tiny-utils";
import { CheckLine } from "../../icons";
import { VisuallyHidden } from "../visually-hidden";

export function Checkbox(props: {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  size?: "small" | "medium" | "large";
  nativeProps?: Omit<
    ComponentProps<"input">,
    "checked" | "disabled" | "onChange" | "size"
  >;
  children?: JSX.Element;
}) {
  mountStyle(css, "tiny-checkbox");

  const [checked, setChecked] = createSignal(props.checked ?? false);

  createWatch(
    () => props.checked,
    (v) => {
      if (v !== undefined) {
        setChecked(v);
      }
    },
    {
      defer: true,
    }
  );

  createWatch(checked, (v) => {
    if (props.checked === v) {
      return;
    }
    props.onChange?.(v);
  });

  let inputRef!: HTMLInputElement;

  const label = children(() => props.children);

  return (
    <label
      class="tiny-checkbox"
      data-checked={dataIf(checked())}
      data-disabled={dataIf(props.disabled ?? false)}
      data-size={props.size ?? "medium"}
    >
      <VisuallyHidden>
        <input
          {...props.nativeProps}
          checked={checked()}
          disabled={props.disabled}
          onChange={(e) => {
            setChecked(e.currentTarget.checked);
          }}
          ref={mergeRefs(props.nativeProps?.ref, (el) => {
            inputRef = el;
          })}
          type="checkbox"
          value="on"
        />
      </VisuallyHidden>
      <div
        class="tiny-checkbox-box"
        on:click={(e) => {
          e.preventDefault();
          inputRef?.focus();
          inputRef?.click();
        }}
      >
        <div class="tiny-checkbox-indicator">
          <CheckLine />
        </div>
      </div>
      <span class="tiny-checkbox-label">{label()}</span>
    </label>
  );
}
