import css from "sass:./switcher.scss";
import {
  type ComponentProps,
  children,
  createSignal,
  type JSX,
} from "solid-js";
import { createWatch, dataIf, mountStyle } from "solid-tiny-utils";
import { VisuallyHidden } from "../visually-hidden";

export function Switcher(props: {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  nativeProps?: Omit<
    ComponentProps<"input">,
    "checked" | "disabled" | "onChange"
  >;
  children?: JSX.Element;
}) {
  mountStyle(css, "tiny-switcher");

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

  return (
    <label
      class="tiny-switcher"
      data-checked={dataIf(checked())}
      data-disabled={dataIf(props.disabled ?? false)}
    >
      <VisuallyHidden>
        <input
          {...props.nativeProps}
          checked={checked()}
          disabled={props.disabled}
          onChange={(e) => {
            setChecked(e.currentTarget.checked);
          }}
          type="checkbox"
          value="on"
        />
      </VisuallyHidden>

      <div class="tiny-switcher-track">
        <div class="tiny-switcher-thumb" />
      </div>

      <span class="tiny-switcher-label">{label()}</span>
    </label>
  );
}
