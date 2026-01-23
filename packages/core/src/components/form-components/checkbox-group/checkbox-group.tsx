import { For, splitProps } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { combineStyle } from "solid-tiny-utils";
import { Flex } from "../../../layout";
import { CheckboxGroupCore } from "../../../primitives/checkbox-group";
import { createClassStyles } from "../../../utils";
import type {
  ClassNames,
  OmitComponentProps,
  Styles,
} from "../../../utils/types";
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
    classNames?: ClassNames<
      "root",
      {
        disabled: boolean;
      }
    >;
    styles?: Styles<
      "root",
      {
        disabled: boolean;
      }
    >;
  } & OmitComponentProps<typeof Flex, "children">
) {
  const [local, others] = splitProps(props, [
    "options",
    "value",
    "onChange",
    "disabled",
    "name",
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
    <CheckboxGroupCore
      disabled={local.disabled}
      name={local.name}
      onChange={local.onChange}
      selectValues={local.value}
    >
      {(state, actions) => (
        <Flex
          class={classes().root}
          data-disabled={state.disabled}
          gap="md"
          style={combineStyle({}, styles().root)}
          {...others}
        >
          <For each={local.options}>
            {(o) => (
              <Checkbox
                checked={state.selectValues.includes(o.value)}
                disabled={state.disabled || o.disabled}
                name={state.name}
                onChange={(c) => actions.toggleValue(o.value, c)}
                value={String(o.value)}
              >
                {o.label}
              </Checkbox>
            )}
          </For>
        </Flex>
      )}
    </CheckboxGroupCore>
  );
}
