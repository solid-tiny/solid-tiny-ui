import { createMemo, Show } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { combineClass, combineStyle, dataIf } from "solid-tiny-utils";
import { VisuallyHidden } from "../../visually-hidden";

export function TimeTrigger(props: {
  type: "hour" | "minute" | "second";
  hour: number | null;
  minute: number | null;
  second: number | null;
  size: "small" | "medium" | "large";
  disabled: boolean;
  class?: string;
  style?: JSX.CSSProperties | string;
}) {
  const typeIndex = createMemo(() =>
    ["hour", "minute", "second"].indexOf(props.type)
  );

  const toStr = (num: number | null) => {
    if (num === null) {
      return "";
    }
    return num.toString().padStart(2, "0");
  };
  return (
    <button
      class={combineClass(
        "tiny-time-picker-trigger tiny-time-picker-trigger-vars",
        props.class
      )}
      data-disabled={dataIf(props.disabled)}
      data-size={props.size}
      style={combineStyle({}, props.style)}
      type="button"
    >
      <VisuallyHidden>
        <input disabled={props.disabled} readonly tabIndex={-1} type="text" />
      </VisuallyHidden>
      <div
        class="tiny-time-picker-trigger__item"
        data-empty={dataIf(props.hour === null)}
      >
        {toStr(props.hour) || "hh"}
      </div>
      <Show when={typeIndex() > 0}>
        <div
          class="tiny-time-picker-trigger__item"
          data-empty={dataIf(props.minute === null)}
        >
          {toStr(props.minute) || "mm"}
        </div>
      </Show>
      <Show when={typeIndex() > 1}>
        <div
          class="tiny-time-picker-trigger__item"
          data-empty={dataIf(props.second === null)}
        >
          {toStr(props.second) || "ss"}
        </div>
      </Show>
    </button>
  );
}
