import { createComponentState } from "solid-tiny-context";

export const context = createComponentState({
  state: () => ({
    hue: 210,
    neutralHue: 210,
  }),
});
