import { createMemo, createSignal, For, Show, splitProps } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { createWatch, dataIf, isUndefined } from "solid-tiny-utils";
import { Flex } from "../../layout";
import { Checkbox } from "../checkbox";

export interface CheckboxOption<T> {
  label: JSX.Element;
  value: T;
  disabled?: boolean;
}

export function CheckboxGroup<T extends string | number>(
  props: {
    options?: CheckboxOption<T>[];
    value?: T[];
    onChange?: (value: T[]) => void;
    disabled?: boolean;
    name?: string;
    children?: (
      opts: CheckboxOption<NoInfer<T>>[],
      helpers: {
        toggle: (val: T, checked: boolean) => void;
        isChecked: (val: T) => boolean;
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
    "name",
  ]);

  const [selected, setSelected] = createSignal<T[]>(local.value ?? []);

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
    if (
      local.value &&
      JSON.stringify([...local.value].sort()) === JSON.stringify([...v].sort())
    ) {
      return;
    }
    local.onChange?.(v);
  });

  function toggle(val: T, checked: boolean) {
    const cur = new Set(selected());
    if (checked) {
      cur.add(val);
    } else {
      cur.delete(val);
    }
    setSelected(Array.from(cur));
  }

  const opts = createMemo(() => local.options ?? []);

  const isChecked = (val: T) => selected().includes(val);

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
              disabled={local.disabled || o.disabled}
              name={local.name}
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
