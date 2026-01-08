import type { JSX } from "solid-js";
import { combineStyle, dataIf } from "solid-tiny-utils";
import { context } from "./context";

export function Item(props: {
  class?: string;
  style?: JSX.CSSProperties | string;
  children: JSX.Element;
  key: string;
}) {
  const [state] = context.useContext();

  return (
    <div
      class={props.class}
      data-in-view={dataIf(props.key === `${state.fixedInViewIndex}`)}
      data-key={props.key}
      style={combineStyle(
        {
          height: `${state.itemHeight}px`,
        },
        props.style
      )}
    >
      {props.children}
    </div>
  );
}
