import { createComponentState } from "solid-tiny-context";
import type { Toast } from "./type";

export const context = createComponentState({
  state: () => ({
    toasts: [] as Toast[],
    dismissSignal: {} as Record<string, boolean>,
    pauseRemoval: false,
    defaultDuration: 3000,
    defaultPosition: "top-center" as Toast["position"],
  }),
  methods: {
    removeToast(id: string) {
      this.actions.setState("toasts", (toasts) =>
        toasts.filter((toast) => toast.id !== id)
      );

      // biome-ignore lint/style/noNonNullAssertion: remove dismiss signal when toast is removed
      this.actions.setState("dismissSignal", id, undefined!);
    },
    getToastsByPosition(position: Toast["position"]) {
      return this.state.toasts.filter((toast) => toast.position === position);
    },
    dismissToast(id: string) {
      this.actions.setState("dismissSignal", id, true);
    },
    updateToast(id: string, updatedProps: Partial<Toast>) {
      const index = this.state.toasts.findIndex((toast) => toast.id === id);
      if (index !== -1 && !this.state.dismissSignal[id]) {
        this.actions.setState("toasts", index, updatedProps);
      }
    },
  },
});
