import type { JSX } from "solid-js";
import { createMemo } from "solid-js";

export function SvgWrapper(props: {
  children: JSX.Element;
  viewBoxSize?: number;
}) {
  const size = createMemo(() => props.viewBoxSize || 24);
  return (
    <svg
      aria-label="icon"
      height="1.2em"
      role="img"
      viewBox={`0 0 ${size()} ${size()}`}
      width="1.2em"
      xmlns="http://www.w3.org/2000/svg"
    >
      {props.children}
    </svg>
  );
}
