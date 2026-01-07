/** biome-ignore-all lint/complexity/noBannedTypes: is safe here */
import type { JSX } from "solid-js";

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
  "c-link",
  "c-info",
  "c-danger",
  "c-success",
  "c-warning",
  "c-border",
  "c-neutral-0",
  "c-neutral-1",
  "c-neutral-2",
  "c-neutral-3",
  "c-neutral-4",
  "c-neutral-5",
  "c-neutral-6",
  "c-neutral-7",
  "c-neutral-8",
  "c-neutral-9",
  "c-brand-0",
  "c-brand-1",
  "c-brand-2",
  "c-brand-3",
  "c-brand-4",
  "c-brand-5",
  "c-brand-6",
  "c-brand-7",
  "c-brand-8",
  "c-brand-9",
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

type ContextChild<
  T extends [
    Record<string, unknown>,
    Record<string, unknown>,
    Record<string, unknown>,
  ],
> = (state: T[0], actions: T[1], staticData: T[2]) => JSX.Element;

interface Context {
  useContext: () => [
    Record<string, unknown>,
    Record<string, unknown>,
    Record<string, unknown>,
  ];
}
export type MaybeContextChild<T extends Context> =
  | ContextChild<ReturnType<T["useContext"]>>
  | JSX.Element;

export function callMaybeContextChild<T extends Context>(
  context: ReturnType<T["useContext"]>,
  children: MaybeContextChild<T>
) {
  return typeof children === "function"
    ? children(
        ...(context as [
          Record<string, unknown>,
          Record<string, unknown>,
          Record<string, unknown>,
        ])
      )
    : children;
}
