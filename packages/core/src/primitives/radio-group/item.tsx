import { type ComponentProps, splitProps } from "solid-js";
import {
  callMaybeCallableChild,
  dataIf,
  isUndefined,
  type MaybeCallableChild,
} from "solid-tiny-utils";
import { VisuallyHidden } from "../../components/visually-hidden";
import type { OmitComponentProps } from "../../utils/types";
import { itemContext, rootContext } from "./context";

export function Item<T>(
  props: OmitComponentProps<"div", "children"> & {
    value: T;
    disabled?: boolean;
    children?: MaybeCallableChild<ReturnType<typeof itemContext.useContext>>;
  }
) {
  const [local, others] = splitProps(props, ["children", "value", "disabled"]);

  const [rootState] = rootContext.useContext();

  const Context = itemContext.initial({
    value: () => local.value,
    disabled: () => rootState.disabled || local.disabled,
    checked: () => {
      if (isUndefined(rootState.value)) {
        return false;
      }
      return rootState.value === local.value;
    },
  });

  const [state] = Context.value;

  return (
    <Context.Provider>
      <div
        data-checked={dataIf(state.checked)}
        data-disabled={dataIf(state.disabled)}
        {...others}
      >
        {callMaybeCallableChild(local.children, ...Context.value)}
      </div>
    </Context.Provider>
  );
}

export function ItemLabel(props: ComponentProps<"label">) {
  // biome-ignore lint/a11y/noLabelWithoutControl: ignore for primitive
  return <label {...props} />;
}

/**
 * visually hidden radio input for the radio item
 */
export function ItemInput(
  props: Omit<ComponentProps<"input">, "name" | "type">
) {
  const [rootState, rootActs] = rootContext.useContext();
  const [itemState] = itemContext.useContext();
  return (
    <VisuallyHidden
      as="input"
      checked={itemState.checked}
      disabled={itemState.disabled}
      name={rootState.name}
      onChange={(e) => {
        const checked = e.currentTarget.checked;
        if (checked) {
          rootActs.setState("value", () => itemState.value);
        }
      }}
      type="radio"
      value={String(itemState.value)}
      {...props}
    />
  );
}
