import css from "sass:./spin-ring.scss";
import { createMemo, mergeProps } from "solid-js";
import { combineClass, combineStyle, mountStyle } from "solid-tiny-utils";
import { getGlobalToken, makeClassNames, makeStyles } from "../../utils";
import type { ClassNames, Styles } from "../../utils/types";

export function SpinRing(props: {
  size?: number;
  color?: string;
  strokeWidth?: number;
  classNames?: ClassNames<
    "root" | "circle",
    {
      size: number;
      color: string;
      strokeWidth: number;
    }
  >;
  styles?: Styles<
    "root" | "circle",
    {
      size: number;
      color: string;
      strokeWidth: number;
    }
  >;
}) {
  mountStyle(css, "tiny-spin-ring");

  const real = mergeProps(
    {
      size: 32,
      color: getGlobalToken("c-brand-5"),
      strokeWidth: 12,
    },
    props
  );

  const viewBoxSize = 100;
  const viewBoxPadding = 5;
  const center = viewBoxSize / 2;
  const radius = createMemo(() => {
    const stroke = real.strokeWidth;
    return (viewBoxSize - stroke - viewBoxPadding * 2) / 2;
  });

  const classes = createMemo(() =>
    makeClassNames(real.classNames, {
      size: real.size,
      color: real.color,
      strokeWidth: real.strokeWidth,
    })
  );

  const styles = createMemo(() =>
    makeStyles(real.styles, {
      size: real.size,
      color: real.color,
      strokeWidth: real.strokeWidth,
    })
  );

  return (
    <div
      class={classes().root}
      style={combineStyle(
        {
          width: `${real.size}px`,
          height: `${real.size}px`,
          color: real.color,
          display: "inline-flex",
        },
        styles().root
      )}
    >
      <svg
        aria-label="progress"
        height={"100%"}
        role="img"
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        width={"100%"}
      >
        <circle
          class={combineClass("tiny-spinner-indicator", classes().circle)}
          cx={center}
          cy={center}
          r={radius()}
          stroke-width={real.strokeWidth}
          style={combineStyle(
            {
              "--circumference-value": `${2 * Math.PI * radius()}px`,
            },
            styles().circle
          )}
        />
      </svg>
    </div>
  );
}
