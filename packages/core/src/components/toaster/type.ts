export interface Toast {
  id: string;
  type: ToastType;
  duration: number;
  position: ToastPosition;
  message: string;
}

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type ToastType = "success" | "error" | "warning" | "info" | "blank";
