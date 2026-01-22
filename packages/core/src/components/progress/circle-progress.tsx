import { createMemo, mergeProps } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { combineClass, combineStyle, max } from "solid-tiny-utils";
import { createClassStyles, getGlobalToken } from "../../utils";
import type { ClassNames, Styles } from "../../utils/types";

function getPathString(r: number, viewBoxSize: number): string {
  const vw = viewBoxSize;
  return `m ${vw / 2} ${vw / 2 - r} a ${r} ${r} 0 1 1 0 ${2 * r} a ${r} ${r} 0 1 1 0 -${2 * r}`;
}

function getPathStyles(params: {
  radius: number;
  percent: number;
  viewBoxSize: number;
  gapDegree: number;
  offsetDegree: number;
  strokeColor: string;
}) {
  const { radius, percent, viewBoxSize, offsetDegree, gapDegree, strokeColor } =
    params;
  const len = Math.PI * 2 * radius;
  const pathStyle: JSX.CSSProperties = {
    stroke: percent ? strokeColor : "transparent",
    "stroke-dasharray": `${(percent / 100) * (len - gapDegree)}px ${viewBoxSize * 8}px`,
    "stroke-dashoffset": `-${gapDegree / 2}px`,
    "transform-origin": "center",
    transform: `rotate(${offsetDegree + 180}deg)`,
    transition: "all 0.15s ease",
  };

  return pathStyle;
}

function Wrapper(props: {
  children: JSX.Element;
  gapOffsetDegree: number;
  viewBoxSize: number;
}) {
  return (
    <div
      style={{
        transform: `rotate(${props.gapOffsetDegree}deg)`,
      }}
    >
      <svg
        aria-label="progress"
        role="img"
        viewBox={`0 0 ${props.viewBoxSize} ${props.viewBoxSize}`}
      >
        {props.children}
      </svg>
    </div>
  );
}

function Rail(props: {
  radius: number;
  railWidth: number;
  color: string;
  viewBoxSize: number;
  gapDegree: number;
}) {
  return (
    <g>
      <path
        d={getPathString(props.radius, props.viewBoxSize)}
        fill="none"
        stroke-linecap="round"
        stroke-width={props.railWidth}
        style={getPathStyles({
          radius: props.radius,
          percent: 100,
          viewBoxSize: props.viewBoxSize,
          offsetDegree: 0,
          gapDegree: props.gapDegree,
          strokeColor: props.color,
        })}
      />
    </g>
  );
}

function Fill(props: {
  radius: number;
  fillWidth: number;
  viewBoxSize: number;
  percent: number;
  color: string;
  offsetDegree: number;
  gapDegree: number;
}) {
  return (
    <g>
      <path
        d={getPathString(props.radius, props.viewBoxSize)}
        fill="none"
        stroke-linecap="round"
        stroke-width={props.fillWidth}
        style={getPathStyles({
          radius: props.radius,
          percent: props.percent,
          viewBoxSize: props.viewBoxSize,
          offsetDegree: props.offsetDegree,
          gapDegree: props.gapDegree,
          strokeColor: props.color,
        })}
      />
    </g>
  );
}

export function CircleProgress(props: {
  percent: number;
  fillWidth?: number;
  railWidth?: number;
  size?: string;
  gapOffsetDegree?: number;
  gapDegree?: number;
  offsetDegree?: number;
  children?: JSX.Element;
  railColor?: string;
  fillColor?: string;
  classNames?: ClassNames<
    "root" | "wrapper" | "content",
    {
      percent: number;
    }
  >;
  styles?: Styles<
    "root" | "wrapper" | "content",
    {
      percent: number;
    }
  >;
}) {
  const real = mergeProps(
    {
      fillWidth: 8,
      railWidth: 8,
      gapOffsetDegree: 0,
      gapDegree: 0,
      offsetDegree: 0,
      size: "100px",
      railColor: `rgb(${getGlobalToken("rgb-neutral-3")})`,
      fillColor: `rgb(${getGlobalToken("rgb-brand-5")})`,
    },
    props
  );

  const [classes, styles] = createClassStyles(
    () => props.classNames,
    () => props.styles,
    () => ({
      percent: real.percent,
    })
  );

  const viewBoxSize = 100;
  const viewBoxPadding = 5;
  const radius = createMemo(() => {
    const stroke = max(real.fillWidth, real.railWidth);
    return (viewBoxSize - stroke - viewBoxPadding * 2) / 2;
  });

  return (
    <div
      class={combineClass("", classes().root)}
      style={combineStyle(
        {
          width: real.size,
          height: real.size,
          position: "relative",
        },
        styles().root
      )}
    >
      <div
        class={combineClass("", classes().wrapper)}
        style={combineStyle({}, styles().wrapper)}
      >
        <Wrapper
          gapOffsetDegree={real.offsetDegree}
          viewBoxSize={viewBoxSize}
        >
          <Rail
            color={real.railColor}
            gapDegree={real.gapDegree}
            radius={radius()}
            railWidth={real.railWidth}
            viewBoxSize={viewBoxSize}
          />
          <Fill
            color={real.fillColor}
            fillWidth={real.fillWidth}
            gapDegree={real.gapDegree}
            offsetDegree={real.offsetDegree}
            percent={real.percent}
            radius={radius()}
            viewBoxSize={viewBoxSize}
          />
        </Wrapper>
      </div>
      <div
        class={combineClass("", classes().content)}
        style={combineStyle(
          {
            position: "absolute",
            inset: 0,
            display: "flex",
            "align-items": "center",
            "justify-content": "center",
          },
          styles().content
        )}
      >
        {props.children}
      </div>
    </div>
  );
}
