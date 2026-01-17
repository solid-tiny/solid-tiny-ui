import type { MaybeCallableChild } from "solid-tiny-utils";

export interface Toast {
  id: string;
  type: ToastType;
  duration: number;
  position: ToastPosition;
  message: MaybeCallableChild<[Omit<Toast, "icon" | "message">]>;
  icon: MaybeCallableChild<[Omit<Toast, "icon" | "message">]>;
}

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type ToastType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "blank"
  | "loading";
