import css from "sass:./checkbox.scss";
import { children, type JSX, Show } from "solid-js";
import {
  combineClass,
  combineStyle,
  dataIf,
  mountStyle,
} from "solid-tiny-utils";
import { IconSubtract } from "../../../icons";
import { CheckBold } from "../../../icons/check-bold";
import { CheckboxCore } from "../../../primitives";
import { createClassStyles } from "../../../utils";
import type { ClassNames, Styles } from "../../../utils/types";

export function Checkbox(props: {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  value?: string;
  name?: string;
  id?: string;
  children?: JSX.Element;
  indeterminate?: boolean;
  classNames?: ClassNames<
    "root" | "box" | "indicator" | "label",
    {
      checked: boolean;
      disabled: boolean;
      indeterminate: boolean;
    }
  >;
  styles?: Styles<
    "root" | "box" | "indicator" | "label",
    {
      checked: boolean;
      disabled: boolean;
      indeterminate: boolean;
    }
  >;
}) {
  mountStyle(css, "tiny-checkbox");

  const label = children(() => props.children);

  const [classes, styles] = createClassStyles(
    () => props.classNames,
    () => props.styles,
    () => ({
      checked: false,
      disabled: false,
      indeterminate: false,
    })
  );

  return (
    <CheckboxCore
      checked={props.checked}
      disabled={props.disabled}
      indeterminate={props.indeterminate}
      name={props.name}
      onChange={props.onChange}
      value={props.value}
    >
      {(state) => {
        const [stateClasses, stateStyles] = createClassStyles(
          () => props.classNames,
          () => props.styles,
          () => ({
            checked: state.checked,
            disabled: state.disabled,
            indeterminate: state.indeterminate,
          })
        );

        return (
          <CheckboxCore.Label
            class={combineClass("tiny-checkbox", stateClasses().root)}
            data-checked={dataIf(state.checked)}
            data-disabled={dataIf(state.disabled)}
            data-indeterminate={dataIf(state.indeterminate)}
            style={combineStyle({}, stateStyles().root)}
          >
            <CheckboxCore.Input id={props.id} />
            <div
              class={combineClass("tiny-checkbox-box", stateClasses().box)}
              style={combineStyle({}, stateStyles().box)}
            >
              <div
                class={combineClass(
                  "tiny-checkbox-indicator",
                  stateClasses().indicator
                )}
                style={combineStyle({}, stateStyles().indicator)}
              >
                <Show
                  fallback={<IconSubtract size="100%" />}
                  when={!props.indeterminate}
                >
                  <CheckBold size="100%" />
                </Show>
              </div>
            </div>
            <Show when={label()}>
              <span
                class={combineClass(
                  "tiny-checkbox-label",
                  stateClasses().label
                )}
                style={combineStyle({}, stateStyles().label)}
              >
                {label()}
              </span>
            </Show>
          </CheckboxCore.Label>
        );
      }}
    </CheckboxCore>
  );
}
