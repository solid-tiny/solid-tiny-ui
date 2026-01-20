/** biome-ignore-all lint/complexity/noBannedTypes: is safe here */
import type { ComponentProps, JSX, ValidComponent } from "solid-js";

export type ClassNames<Fields extends string, State extends object = {}> =
  | { [Key in Fields]?: string }
  | ((params: { state: Readonly<State> }) => { [Key in Fields]?: string });

export type Styles<
  Fields extends string,
  State extends object = {},
  ExtraTokens extends {
    [key: string]: string;
  } = {},
> =
  | {
      [Key in Fields]?: JSX.CSSProperties | string;
    }
  | ((params: {
      state: Readonly<State>;
      getToken: (key: keyof ExtraTokens | GlobalToken) => string;
    }) => {
      [Key in Fields]?: JSX.CSSProperties | string;
    });



type TokenNames = [
  "c-text",
  "c-text-heading",
  "c-text-label",
  "c-text-description",
  "c-text-disabled",
  "c-white",
  "c-black",
  "rgb-neutral-0",
  "rgb-neutral-1",
  "rgb-neutral-2",
  "rgb-neutral-3",
  "rgb-neutral-4",
  "rgb-neutral-5",
  "rgb-neutral-6",
  "rgb-neutral-7",
  "rgb-neutral-8",
  "rgb-neutral-9",
  "rgb-brand-0",
  "rgb-brand-1",
  "rgb-brand-2",
  "rgb-brand-3",
  "rgb-brand-4",
  "rgb-brand-5",
  "rgb-brand-6",
  "rgb-brand-7",
  "rgb-brand-8",
  "rgb-brand-9",
  "shadow-1",
  "shadow-2",
  "shadow-3",
  "fs-xs",
  "fs-sm",
  "fs-md",
  "fs-lg",
  "fs-xl",
  "fs-2xl",
  "fs-3xl",
  "fs-4xl",
  "lh-tight",
  "lh-base",
  "lh-relaxed",
  "space-xs",
  "space-sm",
  "space-md",
  "space-lg",
  "space-xl",
  "space-2xl",
  "space-3xl",
  "radius-sm",
  "radius-md",
  "radius-lg",
  "radius-xl",
  "radius-round",
];

export type GlobalToken = TokenNames[number];

export type OmitComponentProps<
  T extends ValidComponent,
  K extends keyof ComponentProps<T>,
> = Omit<ComponentProps<T>, K>;
