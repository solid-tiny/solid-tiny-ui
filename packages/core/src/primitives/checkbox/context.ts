import { createComponentState } from "solid-tiny-context";

export const context = createComponentState({
  state: () => ({
    checked: false,
    indeterminate: false,
    disabled: false,
    name: "",
    value: "on",
  }),
});
