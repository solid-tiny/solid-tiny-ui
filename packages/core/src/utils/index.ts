/** biome-ignore-all lint/complexity/noBannedTypes: safe */
/** biome-ignore-all lint/suspicious/noExplicitAny: safe */
import { createMemo, type JSX } from "solid-js";
import { isDefined, isFn } from "solid-tiny-utils";
import type { ClassNames, GlobalToken, Styles } from "./types";

export function makeClassNames<Fields extends string, State extends object>(
  classNames: ClassNames<Fields, State> | undefined,
  state: NoInfer<State>
): { [Key in Fields]?: string } {
  if (!classNames) {
    return {};
  }
  const cn = isFn(classNames) ? classNames({ state }) : classNames;
  return {
    ...cn,
  };
}

export function getGlobalToken(key: GlobalToken) {
  return `var(--tiny-${key})`;
}

export function makeStyles<
  Fields extends string,
  State extends object,
  ExtraTokens extends {
    [key: string]: string;
  } = {},
>(
  styles: Styles<Fields, State, ExtraTokens> | undefined,
  state: NoInfer<State>,
  extraTokens?: ExtraTokens
): { [Key in Fields]?: JSX.CSSProperties | string } {
  if (!styles) {
    return {};
  }
  const st = isFn(styles)
    ? styles({
        state,
        getToken: (key) => {
          if (extraTokens && key in extraTokens) {
            return extraTokens[key as keyof ExtraTokens];
          }
          return getGlobalToken(key as GlobalToken);
        },
      })
    : styles;
  return {
    ...st,
  };
}

export function mergeClassNames(classNames: (string | undefined)[]) {
  return classNames.filter((cn) => !!cn).join(" ");
}

export function createClassStyles<
  Fields extends string,
  State extends object,
  ExtraTokens extends {
    [key: string]: string;
  } = {},
>(
  classNames: () => ClassNames<Fields, State> | undefined,
  styles: () => Styles<Fields, State, ExtraTokens> | undefined,
  state?: () => NoInfer<State>
) {
  const realState = createMemo(() => {
    if (isDefined(state)) {
      return state();
    }
    return {} as State;
  });
  const classes = createMemo(() => makeClassNames(classNames(), realState()));
  const styleObjs = createMemo(() => makeStyles(styles(), realState()));
  return [classes, styleObjs] as const;
}

export function extraPrefixValuesInObj(
  obj: {
    [key: string]: any;
  },
  ...prefix: string[]
) {
  const result: { [key: string]: any } = {};
  for (const key in obj) {
    if (prefix.some((p) => key.startsWith(p))) {
      result[key] = obj[key];
    }
  }
  return result;
}

export function extraDatasets(obj: {
  [key: `data-${string}`]: string | boolean | undefined | number;
}) {
  return extraPrefixValuesInObj(obj, "data-");
}

export function extraArias(obj: {
  [key: `aria-${string}`]: string | boolean | undefined | number;
}) {
  return extraPrefixValuesInObj(obj, "aria-");
}

export function extraAriasAndDatasets(obj: { [key: string]: any }) {
  return extraPrefixValuesInObj(obj, "aria-", "data-");
}
