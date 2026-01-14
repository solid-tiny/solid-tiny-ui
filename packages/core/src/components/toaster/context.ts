import { createComponentState } from "solid-tiny-context";
import type { Toast } from "./type";

export const context = createComponentState({
  state: () => ({
    toasts: [] as Toast[],
    pauseRemoval: false,
  }),
  methods: {
    removeToast(id: string) {
      this.actions.setState("toasts", (toasts) =>
        toasts.filter((toast) => toast.id !== id)
      );
    },
  },
});
