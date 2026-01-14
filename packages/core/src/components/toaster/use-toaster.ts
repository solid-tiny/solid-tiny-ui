import { createUniqueId } from "solid-js";
import { context } from "./context";

export function useToaster() {
  const [, actions] = context.useContext();

  const toast = (msg: string) => {
    const id = `toast-${createUniqueId()}`;
    actions.setState("toasts", (toasts) => [
      ...toasts,
      {
        id,
        type: "blank",
        duration: 3000,
        position: "top-center",
        message: msg,
      },
    ]);
  };

  return Object.assign(toast, {
    blank: toast,
  });
}
