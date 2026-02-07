import css from "sass:./textarea.scss";
import { type JSX, mergeProps } from "solid-js";
import {
  combineClass,
  combineStyle,
  dataIf,
  mountStyle,
} from "solid-tiny-utils";
import { createClassStyles } from "../../../utils";
import type { ClassNames, Styles } from "../../../utils/types";
import { ReTextArea } from "../../reset";

export function Textarea(props: {
  autosize?: boolean;
  rows?: number;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  resize?: JSX.CSSProperties["resize"];
  classNames?: ClassNames<
    "root",
    {
      disabled: boolean;
    }
  >;
  styles?: Styles<"root", { disabled: boolean }>;
  onChange?: (value: string) => void;
  invalid?: boolean;
  value?: string;
  id?: string;
  name?: string;
}) {
  mountStyle(css, "tiny-textarea");

  const real = mergeProps(
    {
      autosize: false,
      rows: 3,
      disabled: false,
    },
    props
  );

  const [classes, styles] = createClassStyles(
    () => props.classNames,
    () => props.styles,
    () => ({ disabled: real.disabled })
  );

  return (
    <ReTextArea
      class={combineClass("tiny-textarea", classes().root)}
      data-invalid={dataIf(real.invalid ?? false)}
      disabled={real.disabled}
      id={props.id}
      maxLength={real.maxLength}
      name={props.name}
      onInput={(e) => {
        props.onChange?.((e.target as HTMLTextAreaElement).value);
      }}
      placeholder={real.placeholder}
      rows={real.rows}
      style={combineStyle(
        {
          resize: real.resize,
          "min-height": "88px",
        },
        styles().root
      )}
      value={real.value}
    />
  );
}
