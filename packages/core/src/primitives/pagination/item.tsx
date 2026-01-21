import { type ComponentProps, splitProps } from "solid-js";
import {
  callMaybeCallableChild,
  dataIf,
  type MaybeCallableChild,
} from "solid-tiny-utils";
import type { OmitComponentProps } from "../../utils/types";
import { itemContext, rootContext } from "./context";

export function Item(
  props: OmitComponentProps<"button", "children"> & {
    page: number;
    children?: MaybeCallableChild<ReturnType<typeof itemContext.useContext>>;
  }
) {
  const [local, others] = splitProps(props, ["children", "page"]);

  const [rootState, rootActs] = rootContext.useContext();

  const Context = itemContext.initial({
    page: () => local.page,
    disabled: () => rootState.disabled,
    active: () => rootState.current === local.page,
  });

  const [state] = Context.value;

  const handleClick = () => {
    if (state.disabled || state.active) return;
    rootActs.setState("current", () => local.page);
  };

  return (
    <Context.Provider>
      <button
        type="button"
        data-active={dataIf(state.active)}
        data-disabled={dataIf(state.disabled)}
        disabled={state.disabled}
        onClick={handleClick}
        {...others}
      >
        {callMaybeCallableChild(local.children, ...Context.value)}
      </button>
    </Context.Provider>
  );
}

export function PrevButton(props: ComponentProps<"button">) {
  const [rootState, rootActs] = rootContext.useContext();
  const disabled = () => rootState.disabled || rootState.current <= 1;

  return (
    <button
      type="button"
      data-disabled={dataIf(disabled())}
      disabled={disabled()}
      onClick={() => !disabled() && rootActs.setState("current", (c) => c - 1)}
      {...props}
    />
  );
}

export function NextButton(props: ComponentProps<"button">) {
  const [rootState, rootActs] = rootContext.useContext();
  const totalPages = () => Math.ceil(rootState.total / rootState.pageSize);
  const disabled = () =>
    rootState.disabled || rootState.current >= totalPages();

  return (
    <button
      type="button"
      data-disabled={dataIf(disabled())}
      disabled={disabled()}
      onClick={() => !disabled() && rootActs.setState("current", (c) => c + 1)}
      {...props}
    />
  );
}
