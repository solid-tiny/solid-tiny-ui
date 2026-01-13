import css from "sass:./switcher.scss";
import { children, type JSX } from "solid-js";
import { dataIf, mountStyle } from "solid-tiny-utils";
import { CheckboxCore } from "../../primitives";

export function Switcher(props: {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  children?: JSX.Element;
}) {
  mountStyle(css, "tiny-switcher");

  const label = children(() => props.children);

  return (
    <CheckboxCore
      checked={props.checked}
      disabled={props.disabled}
      onChange={props.onChange}
    >
      {(state) => (
        <CheckboxCore.Label
          class="tiny-switcher"
          data-checked={dataIf(state.checked)}
          data-disabled={dataIf(state.disabled)}
        >
          <CheckboxCore.Input />
          <div class="tiny-switcher-track">
            <div class="tiny-switcher-thumb" />
          </div>
          <span class="tiny-switcher-label">{label()}</span>
        </CheckboxCore.Label>
      )}
    </CheckboxCore>
  );
}
