import { For, type JSX } from "solid-js";
import { context, type PaginationPager } from "./context";

export function Items(props: {
  render: (page: PaginationPager) => JSX.Element;
}) {
  const [state] = context.useContext();

  return <For each={state.renderedPages}>{props.render}</For>;
}
