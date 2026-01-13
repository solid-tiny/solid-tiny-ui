import { createMemo, type JSX, type ValidComponent } from "solid-js";
import { Dynamic } from "solid-js/web";
import { combineStyle, isString } from "solid-tiny-utils";
import { extraAriasAndDatasets, getGlobalToken } from "../../utils";

export function Flex(props: {
  children: JSX.Element;
  vertical?: boolean;
  wrap?: boolean;
  justify?: JSX.CSSProperties["justify-content"];
  align?: JSX.CSSProperties["align-items"];
  gap?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | number;
  flex?: JSX.CSSProperties["flex"];
  as?: ValidComponent;
  class?: string;
  style?: JSX.CSSProperties | string;
  inline?: boolean;
}) {
  const gap = createMemo(() => {
    const gapProp = props.gap || 0;
    if (isString(gapProp)) {
      return getGlobalToken(`space-${gapProp}`);
    }
    return `${gapProp}px`;
  });
  return (
    <Dynamic
      {...extraAriasAndDatasets(props)}
      class={props.class}
      component={props.as ?? "div"}
      style={combineStyle(
        {
          display: props.inline ? "inline-flex" : "flex",
          "flex-direction": props.vertical ? "column" : "row",
          "flex-wrap": props.wrap ? "wrap" : "nowrap",
          "justify-content": props.justify,
          "align-items": props.align,
          gap: gap(),
          flex: props.flex,
        },
        props.style
      )}
    >
      {props.children}
    </Dynamic>
  );
}
