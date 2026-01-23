import css from "sass:./radio-group.scss";
import { For, splitProps } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import {
  combineClass,
  combineStyle,
  dataIf,
  mountStyle,
} from "solid-tiny-utils";
import { Flex } from "../../../layout";
import { RadioGroupCore } from "../../../primitives";
import { createClassStyles } from "../../../utils";
import type {
  ClassNames,
  OmitComponentProps,
  Styles,
} from "../../../utils/types";

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
    classNames?: ClassNames<
      "root" | "item" | "circle" | "label",
      {
        disabled: boolean;
      }
    >;
    styles?: Styles<
      "root" | "item" | "circle" | "label",
      {
        disabled: boolean;
      }
    >;
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
    "classNames",
    "styles",
  ]);

  const [classes, styles] = createClassStyles(
    () => local.classNames,
    () => local.styles,
    () => ({
      disabled: local.disabled ?? false,
    })
  );

  return (
    <RadioGroupCore
      disabled={local.disabled}
      name={local.name}
      onChange={local.onChange}
      value={local.value}
    >
      {(rootState) => (
        <Flex
          class={combineClass("tiny-radio-group", classes().root, local.class)}
          data-disabled={dataIf(rootState.disabled)}
          gap="md"
          style={combineStyle({}, styles().root)}
          {...others}
        >
          <For each={local.options}>
            {(o) => (
              <RadioGroupCore.Item disabled={o.disabled} value={o.value}>
                {(itemState) => {
                  const [itemClasses, itemStyles] = createClassStyles(
                    () => local.classNames,
                    () => local.styles,
                    () => ({
                      disabled: itemState.disabled,
                    })
                  );

                  return (
                    <RadioGroupCore.ItemLabel
                      class={combineClass(
                        "tiny-radio-item",
                        itemClasses().item
                      )}
                      data-checked={dataIf(itemState.checked)}
                      data-disabled={dataIf(itemState.disabled)}
                      style={combineStyle({}, itemStyles().item)}
                    >
                      <RadioGroupCore.ItemInput />
                      <span
                        class={combineClass(
                          "tiny-radio-circle",
                          itemClasses().circle
                        )}
                        style={combineStyle({}, itemStyles().circle)}
                      />
                      <span
                        class={combineClass(
                          "tiny-radio-label",
                          itemClasses().label
                        )}
                        style={combineStyle({}, itemStyles().label)}
                      >
                        {o.label}
                      </span>
                    </RadioGroupCore.ItemLabel>
                  );
                }}
              </RadioGroupCore.Item>
            )}
          </For>
        </Flex>
      )}
    </RadioGroupCore>
  );
}
