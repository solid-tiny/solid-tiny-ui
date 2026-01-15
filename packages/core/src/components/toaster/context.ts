import { createComponentState } from "solid-tiny-context";
import type { Toast } from "./type";

export const context = createComponentState({
  state: () => ({
    toasts: [] as Toast[],
    pauseRemoval: false,
    defaultDuration: 3000,
    defaultPosition: "top-center" as Toast["position"],
  }),
  methods: {
    removeToast(id: string) {
      this.actions.setState("toasts", (toasts) =>
        toasts.filter((toast) => toast.id !== id)
      );
    },
    getToastsByPosition(position: Toast["position"]) {
      return this.state.toasts.filter((toast) => toast.position === position);
    },
  },
});
