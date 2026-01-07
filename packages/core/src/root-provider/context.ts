import { createComponentState } from "solid-tiny-context";

export const context = createComponentState({
  state: () => ({
    hue: 210,
  }),
});
