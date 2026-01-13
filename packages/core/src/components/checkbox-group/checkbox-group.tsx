import { createMemo, createSignal, For, Show, splitProps } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { createWatch, dataIf, isUndefined } from "solid-tiny-utils";
import { Flex } from "../../layout";
import { Checkbox } from "../checkbox";

export interface CheckboxOption {
  label: JSX.Element;
  value: string;
  disabled?: boolean;
}

export function CheckboxGroup(
  props: {
    options?: CheckboxOption[];
    value?: string[];
    onChange?: (value: string[]) => void;
    disabled?: boolean;
    children?: (
      opts: CheckboxOption[],
      helpers: {
        toggle: (val: string, checked: boolean) => void;
        isChecked: (val: string) => boolean;
      }
    ) => JSX.Element;
  } & Omit<Parameters<typeof Flex>[0], "children">
) {
  const [local, others] = splitProps(props, [
    "options",
    "value",
    "onChange",
    "disabled",
    "children",
  ]);

  const [selected, setSelected] = createSignal<string[]>(local.value ?? []);

  createWatch(
    () => local.value,
    (v) => {
      if (v !== undefined) {
        setSelected(v);
      }
    },
    { defer: true }
  );

  createWatch(selected, (v) => {
    if (local.value && local.value === v) {
      return;
    }
    local.onChange?.(v);
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

  const opts = createMemo(() => local.options ?? []);

  const isChecked = (val: string) => selected().includes(val);

  return (
    <Flex
      class="tiny-checkbox-group"
      data-disabled={dataIf(local.disabled ?? false)}
      gap={"sm"}
      {...others}
    >
      <Show
        fallback={local.children?.(opts(), {
          toggle,
          isChecked,
        })}
        when={isUndefined(local.children)}
      >
        <For each={opts()}>
          {(o) => (
            <Checkbox
              checked={isChecked(o.value)}
              disabled={props.disabled || o.disabled}
              onChange={(c) => toggle(o.value, c)}
            >
              {o.label}
            </Checkbox>
          )}
        </For>
      </Show>
    </Flex>
  );
}
