/** biome-ignore-all lint/performance/useTopLevelRegex: unocss */

import { list } from "solid-tiny-utils";
import type { Preset } from "unocss";

function vars(key: string): string {
  return `var(--tiny-${key})`;
}

function varRGB(key: string): string {
  return `rgb(var(--tiny-rgb-${key}) / %alpha)`;
}

function varColor(key: string): string {
  return `var(--tiny-c-${key})`;
}

const colors = [
  ...list(0, 9).map((i) => `neutral-${i}`),
  ...list(0, 9).map((i) => `brand-${i}`),
  ...["info", "success", "warning", "danger"].flatMap((status) =>
    ["base", "surface", "border"].map((level) => `${status}-${level}`)
  ),
];

const staticColors = [
  "text",
  "text-heading",
  "text-label",
  "text-description",
  "text-disabled",
  "white",
  "black",
];

export function presetTinyUi(): Preset {
  return {
    name: "unocss-preset-solid-tiny-ui",
    theme: {
      colors: Object.fromEntries(
        colors
          .map((color) => [color, varRGB(color)])
          .concat(staticColors.map((color) => [color, varColor(color)]))
      ),
      lineHeight: {
        tight: vars("lh-tight"),
        base: vars("lh-base"),
        relaxed: vars("lh-relaxed"),
      },
      spacing: {
        xs: vars("space-xs"),
        sm: vars("space-sm"),
        md: vars("space-md"),
        lg: vars("space-lg"),
        xl: vars("space-xl"),
        "2xl": vars("space-2xl"),
        "3xl": vars("space-3xl"),
      },
    },
    rules: [
      [
        /^fs-(xs|sm|md|lg|xl|2xl|3xl|4xl)$/,
        ([, size]) => ({
          "font-size": vars(`fs-${size}`),
        }),
      ],
      [
        /^line-clamp-(\d+)$/,
        ([, lines]) => ({
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": lines,
          "line-clamp": lines,
          overflow: "hidden",
        }),
      ],
      [
        /^shadow-(\d+)$/,
        ([, level]) => ({
          "box-shadow": vars(`shadow-${level}`),
        }),
      ],
    ],
  };
}
