import { createComponentState } from "solid-tiny-context";
import type { PresencePhase } from "solid-tiny-utils";

export const context = createComponentState({
  state: () => ({
    open: false,
    refContent: null as HTMLElement | null,
    closeOnClickMask: false,
    closeOnEsc: false,
  }),

  methods: {},
  nowrapData: () => ({
    isMounted: () => false as boolean,
    presencePhase: () => "idle" as PresencePhase,
  }),
});
