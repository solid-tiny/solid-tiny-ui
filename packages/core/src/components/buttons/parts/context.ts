import { createComponentState } from "solid-tiny-context";

export const context = createComponentState({
  state: () => ({
    loading: false,
    color: "neutral",
    disabled: false,
  }),
});
