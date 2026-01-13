import css from "sass:./radio-group.scss";
import { For, splitProps } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { combineClass, dataIf, mountStyle } from "solid-tiny-utils";
import { Flex } from "../../layout";
import { RadioGroupCore } from "../../primitives";
import type { OmitComponentProps } from "../../utils/types";

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
  } & OmitComponentProps<typeof Flex, "children">
) {
  mountStyle(css, "tiny-radio-group");

  const [local, others] = splitProps(props, [
    "options",
    "value",
    "onChange",
    "name",
    "disabled",
    "class",
  ]);

  return (
    <RadioGroupCore
      disabled={local.disabled}
      name={local.name}
      onChange={local.onChange}
      value={local.value}
    >
      {(rootState) => (
        <Flex
          class={combineClass("tiny-radio-group", local.class)}
          data-disabled={dataIf(rootState.disabled)}
          gap="md"
          {...others}
        >
          <For each={local.options}>
            {(o) => (
              <RadioGroupCore.Item disabled={o.disabled} value={o.value}>
                {(itemState) => (
                  <RadioGroupCore.ItemLabel
                    class="tiny-radio-item"
                    data-checked={dataIf(itemState.checked)}
                    data-disabled={dataIf(itemState.disabled)}
                  >
                    <RadioGroupCore.ItemInput />
                    <span class="tiny-radio-circle" />
                    <span class="tiny-radio-label">{o.label}</span>
                  </RadioGroupCore.ItemLabel>
                )}
              </RadioGroupCore.Item>
            )}
          </For>
        </Flex>
      )}
    </RadioGroupCore>
  );
}
