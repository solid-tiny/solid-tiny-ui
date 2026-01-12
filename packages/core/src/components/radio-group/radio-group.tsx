import css from "sass:./radio-group.scss";
import { createSignal, For } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { createWatch, dataIf, mountStyle } from "solid-tiny-utils";
import { VisuallyHidden } from "../visually-hidden";

export interface RadioOption {
  label: JSX.Element;
  value: string;
  disabled?: boolean;
}

export function RadioGroup(props: {
  options?: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  children?: JSX.Element;
}) {
  mountStyle(css, "tiny-radio-group");

  const [selected, setSelected] = createSignal<string | undefined>(
    props.value ?? props.defaultValue
  );

  createWatch(
    () => props.value,
    (v) => {
      if (v !== undefined) {
        setSelected(v);
      }
    },
    { defer: true }
  );

  createWatch(selected, (v) => {
    if (props.value === v) {
      return;
    }
    if (v !== undefined) {
      props.onChange?.(v);
    } else {
      props.onChange?.("");
    }
  });

  const opts = props.options ?? [];

  return (
    <div
      class="tiny-radio-group"
      data-disabled={dataIf(props.disabled ?? false)}
      role="radiogroup"
    >
      <For each={opts}>
        {(o) => (
          <label
            class="tiny-radio-item"
            data-checked={dataIf(selected() === o.value)}
            data-disabled={dataIf(!!(props.disabled || o.disabled))}
          >
            <VisuallyHidden>
              <input
                checked={selected() === o.value}
                disabled={props.disabled || o.disabled}
                name={props.name}
                onChange={(e) => {
                  if (e.currentTarget.checked) {
                    setSelected(o.value);
                  }
                }}
                type="radio"
                value={o.value}
              />
            </VisuallyHidden>

            <span class="tiny-radio-circle" />
            <span class="tiny-radio-label">{o.label}</span>
          </label>
        )}
      </For>

      {props.children}
    </div>
  );
}
