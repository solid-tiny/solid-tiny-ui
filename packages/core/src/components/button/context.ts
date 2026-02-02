import { createComponentState } from "solid-tiny-context";
import type { ButtonColors, ButtonVariants } from "./button";

export const context = createComponentState({
  state: () => ({
    loading: false,
    disabled: false as boolean | string,
    size: "medium" as "small" | "medium" | "large",
    variant: "solid" as ButtonVariants,
    color: "neutral" as ButtonColors,
    iconPlacement: "start" as "start" | "end",
    rounded: false,
  }),
});
