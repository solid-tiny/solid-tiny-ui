import css from "sass:./checkbox.scss";
import { children, type JSX, Show } from "solid-js";
import { dataIf, mountStyle } from "solid-tiny-utils";
import { Square } from "../../icons";
import { CheckBold } from "../../icons/check-bold";
import { CheckboxCore } from "../../primitives";

export function Checkbox(props: {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  value?: string;
  name?: string;
  id?: string;
  children?: JSX.Element;
  indeterminate?: boolean;
}) {
  mountStyle(css, "tiny-checkbox");

  const label = children(() => props.children);

  return (
    <CheckboxCore
      checked={props.checked}
      disabled={props.disabled}
      indeterminate={props.indeterminate}
      name={props.name}
      onChange={props.onChange}
      value={props.value}
    >
      {(state) => (
        <CheckboxCore.Label
          class="tiny-checkbox"
          data-checked={dataIf(state.checked)}
          data-disabled={dataIf(state.disabled)}
          data-indeterminate={dataIf(state.indeterminate)}
        >
          <CheckboxCore.Input id={props.id} />
          <div class="tiny-checkbox-box">
            <div class="tiny-checkbox-indicator">
              <Show
                fallback={<Square size="0.85em" />}
                when={!props.indeterminate}
              >
                <CheckBold />
              </Show>
            </div>
          </div>
          <Show when={label()}>
            <span class="tiny-checkbox-label">{label()}</span>
          </Show>
        </CheckboxCore.Label>
      )}
    </CheckboxCore>
  );
}
