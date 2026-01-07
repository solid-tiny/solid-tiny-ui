import { splitProps } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { combineStyle } from "solid-tiny-utils";

export function Mask(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, others] = splitProps(props, ["style"]);

  return (
    <div
      aria-hidden="true"
      {...others}
      style={combineStyle(
        {
          position: "fixed",
          inset: 0,
        },
        local.style
      )}
      tabIndex={-1}
    />
  );
}
