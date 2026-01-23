import type { MaybeCallableChild } from "solid-tiny-utils";

export interface DialogCallbackParams {
  id: string;
}

export interface Dialog {
  id: string;
  title: MaybeCallableChild<[DialogCallbackParams]>;
  content: MaybeCallableChild<[DialogCallbackParams]>;
  width?: string;
  closable?: boolean;
  maskClosable?: boolean;
  footer?: MaybeCallableChild<[DialogCallbackParams]>;
}

export type DialogOptions = Partial<Omit<Dialog, "id" | "content">>;
