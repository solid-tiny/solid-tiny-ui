import { createComponentState } from "solid-tiny-context";

export const rootContext = createComponentState({
  state: () => ({
    value: undefined as unknown,
    name: "",
    disabled: false,
  }),
});

export const itemContext = createComponentState({
  state: () => ({
    value: undefined as unknown,
    disabled: false,
    checked: false,
  }),
});
