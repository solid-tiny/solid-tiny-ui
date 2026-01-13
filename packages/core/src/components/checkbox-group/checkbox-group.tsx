import { For, splitProps } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { Flex } from "../../layout";
import { CheckboxGroupCore } from "../../primitives/checkbox-group";
import type { OmitComponentProps } from "../../utils/types";
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
  } & OmitComponentProps<typeof Flex, "children">
) {
  const [local, others] = splitProps(props, [
    "options",
    "value",
    "onChange",
    "disabled",
    "name",
  ]);
  return (
    <CheckboxGroupCore
      disabled={local.disabled}
      name={local.name}
      onChange={local.onChange}
      selectValues={local.value}
    >
      {(state, actions) => (
        <Flex data-disabled={state.disabled} gap="md" {...others}>
          <For each={local.options}>
            {(o) => (
              <Checkbox
                checked={state.selectValues.includes(o.value)}
                disabled={state.disabled || o.disabled}
                name={state.name}
                onChange={(c) => actions.toggleValue(o.value, c)}
                value={String(o.value) || "on"}
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
