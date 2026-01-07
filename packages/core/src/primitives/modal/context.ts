import { createComponentState } from "solid-tiny-context";

export const context = createComponentState({
  state: () => ({
    id: "",
    open: false,
    refContent: null as HTMLElement | null,
    preventScroll: true,
    closeOnClickMask: false,
    closeOnEsc: false,
  }),

  methods: {},
  nowrapData: () => ({
    shouldMount: () => false as boolean,
    presenceState: () => "closed" as string,
  }),
});
