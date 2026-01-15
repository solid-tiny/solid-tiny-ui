import { createUniqueId } from "solid-js";
import { context } from "./context";
import type { Toast } from "./type";

export function useToaster() {
  const [state, actions] = context.useContext();

  const toast = (
    msg: string,
    opt?: {
      duration?: number;
      position?: Toast["position"];
      type?: Toast["type"];
    }
  ) => {
    const id = `toast-${createUniqueId()}`;
    actions.setState("toasts", (toasts) => [
      {
        id,
        type: opt?.type || "blank",
        duration: opt?.duration || state.defaultDuration,
        position: opt?.position || state.defaultPosition,
        message: msg,
      },
      ...toasts,
    ]);
    return id;
  };

  return Object.assign(toast, {
    blank: (
      msg: string,
      opt?: { duration?: number; position?: Toast["position"] }
    ) => {
      return toast(msg, {
        ...opt,
        type: "blank",
      });
    },
    success: (
      msg: string,
      opt?: { duration?: number; position?: Toast["position"] }
    ) => {
      return toast(msg, {
        ...opt,
        type: "success",
      });
    },
    error: (
      msg: string,
      opt?: { duration?: number; position?: Toast["position"] }
    ) => {
      return toast(msg, {
        ...opt,
        type: "error",
      });
    },
    warning: (
      msg: string,
      opt?: { duration?: number; position?: Toast["position"] }
    ) => {
      return toast(msg, {
        ...opt,
        type: "warning",
      });
    },
    info: (
      msg: string,
      opt?: { duration?: number; position?: Toast["position"] }
    ) => {
      return toast(msg, {
        ...opt,
        type: "info",
      });
    },
  });
}
