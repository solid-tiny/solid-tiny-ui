import { createComponentState } from "solid-tiny-context";
import type { Dialog } from "./type";

export const context = createComponentState({
  state: () => ({
    dialogs: [] as Dialog[],
    dismissSignal: {} as Record<string, boolean>,
  }),
  methods: {
    removeDialog(id: string) {
      this.actions.setState("dialogs", (dialogs) =>
        dialogs.filter((dialog) => dialog.id !== id)
      );

      // biome-ignore lint/style/noNonNullAssertion: remove dismiss signal when dialog is removed
      this.actions.setState("dismissSignal", id, undefined!);
    },
    dismissDialog(id: string) {
      this.actions.setState("dismissSignal", id, true);
    },
    updateDialog(id: string, updatedProps: Partial<Dialog>) {
      const index = this.state.dialogs.findIndex((dialog) => dialog.id === id);
      if (index !== -1) {
        this.actions.setState("dialogs", index, updatedProps);
      }
    },
  },
});
