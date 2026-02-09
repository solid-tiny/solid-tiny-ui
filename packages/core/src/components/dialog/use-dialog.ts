import { createUniqueId } from "solid-js";
import type { MaybeCallableChild } from "solid-tiny-utils";
import { context } from "./context";
import type { DialogOptions } from "./type";

type DialogFunction = (
  content: MaybeCallableChild<[{ id: string }]>,
  opt?: DialogOptions
) => string;

export function useDialog() {
  const [, actions] = context.useContext();

  const dialog: DialogFunction = (
    content: MaybeCallableChild<[{ id: string }]>,
    opt?: DialogOptions
  ) => {
    const id = `dialog-${createUniqueId()}`;
    actions.setState("dialogs", (dialogs) => [
      ...dialogs,
      {
        id,
        title: opt?.title ?? "",
        content,
        type: opt?.type ?? "blank",
        width: opt?.width ?? "500px",
        closable: opt?.closable ?? true,
        maskClosable: opt?.maskClosable ?? true,
        footer: opt?.footer ?? null,
      },
    ]);
    return id;
  };

  return Object.assign(dialog, {
    dismiss: actions.dismissDialog,
    update: actions.updateDialog,
  });
}
