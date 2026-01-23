import css from "sass:./switcher.scss";
import { children, type JSX } from "solid-js";
import {
  combineClass,
  combineStyle,
  dataIf,
  mountStyle,
} from "solid-tiny-utils";
import { CheckboxCore } from "../../../primitives";
import { createClassStyles } from "../../../utils";
import type { ClassNames, Styles } from "../../../utils/types";

export function Switcher(props: {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  children?: JSX.Element;
  id?: string;
  name?: string;
  value?: string;
  classNames?: ClassNames<
    "root" | "track" | "thumb" | "label",
    {
      checked: boolean;
      disabled: boolean;
    }
  >;
  styles?: Styles<
    "root" | "track" | "thumb" | "label",
    {
      checked: boolean;
      disabled: boolean;
    }
  >;
}) {
  mountStyle(css, "tiny-switcher");

  const label = children(() => props.children);

  return (
    <CheckboxCore
      checked={props.checked}
      disabled={props.disabled}
      name={props.name}
      onChange={props.onChange}
      value={props.value}
    >
      {(state) => {
        const [classes, styles] = createClassStyles(
          () => props.classNames,
          () => props.styles,
          () => ({
            checked: state.checked,
            disabled: state.disabled,
          })
        );

        return (
          <CheckboxCore.Label
            class={combineClass("tiny-switcher", classes().root)}
            data-checked={dataIf(state.checked)}
            data-disabled={dataIf(state.disabled)}
            style={combineStyle({}, styles().root)}
          >
            <CheckboxCore.Input id={props.id} />
            <div
              class={combineClass("tiny-switcher-track", classes().track)}
              style={combineStyle({}, styles().track)}
            >
              <div
                class={combineClass("tiny-switcher-thumb", classes().thumb)}
                style={combineStyle({}, styles().thumb)}
              />
            </div>
            <span
              class={combineClass("tiny-switcher-label", classes().label)}
              style={combineStyle({}, styles().label)}
            >
              {label()}
            </span>
          </CheckboxCore.Label>
        );
      }}
    </CheckboxCore>
  );
}
