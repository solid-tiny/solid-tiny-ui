import css from "sass:./radio-group.scss";
import { createMemo, createSignal, For, Show, splitProps } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import {
  createWatch,
  dataIf,
  isDefined,
  isUndefined,
  mountStyle,
} from "solid-tiny-utils";
import { Flex } from "../../layout";
import { VisuallyHidden } from "../visually-hidden";

export interface RadioOption<T> {
  label: JSX.Element;
  value: T;
  disabled?: boolean;
}

export function RadioGroup<T extends string | number>(
  props: {
    options?: RadioOption<T>[];
    value?: T;
    onChange?: (value: T) => void;
    name?: string;
    disabled?: boolean;
    children?: (
      opts: RadioOption<T>[],
      helpers: {
        set: (val: T) => void;
        isChecked: (val: T) => boolean;
      }
    ) => JSX.Element;
  } & Omit<Parameters<typeof Flex>[0], "children">
) {
  const [local, others] = splitProps(props, [
    "options",
    "value",
    "onChange",
    "name",
    "disabled",
    "children",
  ]);

  mountStyle(css, "tiny-radio-group");

  const [selected, setSelected] = createSignal<T | undefined>(local.value);

  createWatch(
    () => local.value,
    (v) => {
      if (isDefined(v)) {
        setSelected(() => v);
      }
    },
    { defer: true }
  );

  createWatch(selected, (v) => {
    if (local.value === v) {
      return;
    }
    if (isDefined(v)) {
      local.onChange?.(v);
    }
  });

  const opts = createMemo(() => local.options ?? []);

  const isChecked = (val: T) => selected() === val;

  return (
    <Flex
      class="tiny-radio-group"
      data-disabled={dataIf(local.disabled ?? false)}
      gap={"sm"}
      {...others}
    >
      <Show
        fallback={local.children?.(opts(), {
          set: (v: T) => setSelected(() => v),
          isChecked,
        })}
        when={isUndefined(local.children)}
      >
        <For each={opts()}>
          {(o) => (
            <label
              class="tiny-radio-item"
              data-checked={dataIf(selected() === o.value)}
              data-disabled={dataIf(!!(local.disabled || o.disabled))}
            >
              <VisuallyHidden>
                <input
                  checked={selected() === o.value}
                  disabled={local.disabled || o.disabled}
                  name={local.name}
                  onChange={(e) => {
                    if (e.currentTarget.checked) {
                      setSelected(() => o.value);
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
      </Show>

      {local.children && typeof local.children !== "function"
        ? local.children
        : null}
    </Flex>
  );
}
