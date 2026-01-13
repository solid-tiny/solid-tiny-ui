import css from "sass:./checkbox.scss";
import { children, createMemo, createSignal, type JSX, Show } from "solid-js";
import { createWatch, dataIf, mountStyle } from "solid-tiny-utils";
import { Square } from "../../icons";
import { CheckBold } from "../../icons/check-bold";
import { VisuallyHidden } from "../visually-hidden";

export function Checkbox(props: {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;

  name?: string;
  id?: string;
  children?: JSX.Element;
  indeterminate?: boolean;
}) {
  mountStyle(css, "tiny-checkbox");

  const [checked, setChecked] = createSignal(props.checked ?? false);

  createWatch(
    () => props.checked,
    (v) => {
      if (v !== undefined) {
        setChecked(v);
      }
    },
    {
      defer: true,
    }
  );

  createWatch(checked, (v) => {
    if (props.checked === v) {
      return;
    }
    props.onChange?.(v);
  });

  const label = children(() => props.children);

  const ariaChecked = createMemo(() => {
    if (props.indeterminate) {
      return "mixed";
    }
    return checked() ? "true" : "false";
  });

  return (
    <label
      class="tiny-checkbox"
      data-checked={dataIf(!props.indeterminate && checked())}
      data-disabled={dataIf(props.disabled ?? false)}
      data-indeterminate={dataIf(props.indeterminate ?? false)}
    >
      <VisuallyHidden>
        <input
          aria-checked={ariaChecked()}
          checked={checked()}
          disabled={props.disabled}
          id={props.id}
          name={props.name}
          onChange={(e) => {
            setChecked(e.currentTarget.checked);
          }}
          type="checkbox"
          value="on"
        />
      </VisuallyHidden>
      <div class="tiny-checkbox-box">
        <div class="tiny-checkbox-indicator">
          <Show fallback={<Square size="0.85em" />} when={!props.indeterminate}>
            <CheckBold />
          </Show>
        </div>
      </div>
      <Show when={label()}>
        <span class="tiny-checkbox-label">{label()}</span>
      </Show>
    </label>
  );
}
