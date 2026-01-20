import css from "sass:./progress.scss";
import { createMemo } from "solid-js";
import {
  combineClass,
  combineStyle,
  dataIf,
  mountStyle,
} from "solid-tiny-utils";
import { createClassStyles, getGlobalToken } from "../../utils";
import type { ClassNames, Styles } from "../../utils/types";

export interface LineProgressState {
  indeterminate: boolean;
  percent: number;
  fillColor: string;
  railColor: string;
  width: string;
}

export function LineProgress(props: {
  percent?: number;
  indeterminate?: boolean;
  fillColor?: string;
  railColor?: string;
  width?: string;
  classNames?: ClassNames<"root" | "rail" | "fill", LineProgressState>;
  styles?: Styles<"root" | "rail" | "fill", LineProgressState>;
}) {
  mountStyle(css, "tiny-progress");

  const normalizedPercent = createMemo(() => {
    if (props.percent === undefined) {
      return 45;
    }
    return Math.min(100, Math.max(0, props.percent));
  });

  const background = createMemo(() => {
    const color = props.fillColor || `rgb(${getGlobalToken("rgb-brand-5")})`;
    if (props.indeterminate) {
      return `linear-gradient(90deg, transparent, ${color} 30%, ${color} 65%, transparent)`;
    }

    return color;
  });

  const [classes, styles] = createClassStyles(
    () => props.classNames,
    () => props.styles,
    () => ({
      indeterminate: !!props.indeterminate,
      percent: normalizedPercent(),
      fillColor: props.fillColor || "",
      railColor: props.railColor || "",
      width: props.width || "",
    })
  );

  return (
    <div
      aria-valuenow={normalizedPercent()}
      class={classes().root}
      role="progressbar"
      style={combineStyle(
        {
          height: "3px",
          overflow: "hidden",
          display: "flex",
          "align-items": "center",
          "border-radius": "3px",
        },
        styles().root
      )}
    >
      <div
        class={combineClass("tiny-progress-line-rail", classes().rail)}
        style={combineStyle(
          {
            height: "1px",
            width: props.width || "100%",
            background:
              props.railColor || `rgb(${getGlobalToken("rgb-neutral-3")})`,
            overflow: "visible",
          },
          styles().rail
        )}
      >
        <div
          class={combineClass("tiny-progress-line-fill", classes().fill)}
          data-indeterminate={dataIf(props.indeterminate ?? false)}
          style={combineStyle(
            {
              width: `${normalizedPercent()}%`,
              height: "3px",
              background: background(),
            },
            styles().fill
          )}
        />
      </div>
    </div>
  );
}
