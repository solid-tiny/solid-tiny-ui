import css from "sass:./popover.scss";
import { createMemo, type JSX } from "solid-js";
import { combineClass, combineStyle, mountStyle } from "solid-tiny-utils";
import { FloatingUiCore } from "../../primitives/floating";

function Root(props: Parameters<typeof FloatingUiCore>[0]) {
  mountStyle(css, "tiny-popover");
  return <FloatingUiCore {...props} />;
}

function Content(props: {
  children: JSX.Element;
  class?: string;
  style?: JSX.CSSProperties | string;
}) {
  const [floatingState] = FloatingUiCore.useContext();
  const transformOrigin = createMemo(() => {
    const placement = floatingState.placement;
    const map: Record<string, string> = {
      top: "bottom center",
      "top-start": "bottom left",
      "top-end": "bottom right",
      bottom: "top center",
      "bottom-start": "top left",
      "bottom-end": "top right",
      left: "center right",
      "left-start": "top right",
      "left-end": "bottom right",
      right: "center left",
      "right-start": "top left",
      "right-end": "bottom left",
    };
    return map[placement] || "center center";
  });

  const transformFrom = createMemo(() => {
    const placement = floatingState.placement;
    if (placement.startsWith("top")) {
      return "0, 8px";
    }
    if (placement.startsWith("bottom")) {
      return "0, -8px";
    }
    if (placement.startsWith("left")) {
      return "8px, 0";
    }
    if (placement.startsWith("right")) {
      return "-8px, 0";
    }
    return "0, 0";
  });

  return (
    <FloatingUiCore.Content
      class={combineClass(
        "tiny-popover__content tiny-popover-vars",
        props.class
      )}
      style={combineStyle(
        {
          "--tiny-popover-transform-origin": transformOrigin(),
          "--tiny-popover-transform-from": transformFrom(),
        },
        props.style
      )}
    >
      {props.children}
    </FloatingUiCore.Content>
  );
}

export const Popover = Object.assign(Root, {
  Content,
  Trigger: FloatingUiCore.Trigger,
});
