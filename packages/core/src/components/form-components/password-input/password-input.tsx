import css from "sass:./password-input.scss";
import { createSignal, type JSX } from "solid-js";
import { dataIf, mountStyle } from "solid-tiny-utils";
import { EyeLine, EyeOffLine } from "../../../icons";
import { extraAriasAndDatasets } from "../../../utils";

export interface PasswordInputProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onPressEnter?: () => void;
  size?: "small" | "medium" | "large";
  id?: string;
  name?: string;
  width?: JSX.CSSProperties["width"];
}

export function PasswordInput(props: PasswordInputProps) {
  mountStyle(css, "tiny-password-input");
  const [visible, setVisible] = createSignal(false);

  return (
    <div
      class="tiny-password-input-wrapper"
      data-disabled={dataIf(props.disabled ?? false)}
      data-size={props.size || "medium"}
      style={{ width: props.width }}
    >
      <input
        {...extraAriasAndDatasets(props)}
        class="tiny-password-input"
        data-disabled={dataIf(props.disabled ?? false)}
        disabled={props.disabled}
        id={props.id}
        name={props.name}
        onInput={(e) => {
          props.onChange?.(e.currentTarget.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            props.onPressEnter?.();
          }
        }}
        placeholder={props.placeholder}
        type={visible() ? "text" : "password"}
        value={props.value}
      />
      <button
        aria-label={visible() ? "Hide password" : "Show password"}
        class="tiny-password-input-toggle"
        data-disabled={dataIf(props.disabled ?? false)}
        disabled={props.disabled}
        onClick={() => setVisible(!visible())}
        type="button"
      >
        {visible() ? <EyeOffLine /> : <EyeLine />}
      </button>
    </div>
  );
}
