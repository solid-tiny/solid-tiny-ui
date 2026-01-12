import css from "sass:./checkbox-group.scss";
import { createSignal, For } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { createWatch, dataIf, mountStyle } from "solid-tiny-utils";
import { Checkbox } from "../checkbox";

export interface CheckboxOption {
  label: JSX.Element;
  value: string;
  disabled?: boolean;
}

export function CheckboxGroup(props: {
  options?: CheckboxOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  disabled?: boolean;
  children?: JSX.Element;
}) {
  mountStyle(css, "tiny-checkbox-group");

  const [selected, setSelected] = createSignal<string[]>(
    props.value ?? props.defaultValue ?? []
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
    if (props.value && props.value === v) {
      return;
    }
    props.onChange?.(v);
  });

  function toggle(val: string, checked: boolean) {
    const cur = new Set(selected());
    if (checked) {
      cur.add(val);
    } else {
      cur.delete(val);
    }
    setSelected(Array.from(cur));
  }

  const opts = props.options ?? [];

  return (
    <div
      class="tiny-checkbox-group"
      data-disabled={dataIf(props.disabled ?? false)}
    >
      <For each={opts}>
        {(o) => (
          <Checkbox
            checked={selected().includes(o.value)}
            disabled={props.disabled || o.disabled}
            onChange={(c) => toggle(o.value, c)}
          >
            {o.label}
          </Checkbox>
        )}
      </For>
      {props.children}
    </div>
  );
}
