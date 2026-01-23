import type { MaybeCallableChild } from "solid-tiny-utils";

export interface Dialog {
  id: string;
  title: MaybeCallableChild<[Omit<Dialog, "title" | "content">]>;
  content: MaybeCallableChild<[Omit<Dialog, "title" | "content">]>;
  width?: string;
  closable?: boolean;
  maskClosable?: boolean;
  footer?: MaybeCallableChild<[Omit<Dialog, "title" | "content" | "footer">]>;
}

export type DialogOptions = Partial<Omit<Dialog, "id" | "content">>;
