import { oklchToRgb } from "solid-tiny-utils";

type Light = number;
type Color = number;

const lightRamp: [Light, Color][] = [
  [96, 0.021], // 0 tint
  [88, 0.06], // 1 subtle
  [81, 0.09], // 2 bg accent
  [74, 0.13], // 3 soft
  [67, 0.17], // 4 pre-primary
  [59, 0.22], // 5 ← PRIMARY
  [50, 0.21], // 6 active
  [41, 0.19], // 7 strong
  [34, 0.16], // 8 emphasis
  [27, 0.13], // 9 deep
];

const darkRamp: [Light, Color][] = [
  [21, 0.03], // 0 deep tint
  [26, 0.06], // 1 subtle
  [31, 0.08], // 2 bg accent
  [38, 0.11], // 3 soft
  [46, 0.15], // 4 pre-primary
  [54, 0.19], // 5 ← PRIMARY
  [62, 0.16], // 6 active
  [72, 0.12], // 7 strong
  [80, 0.09], // 8 emphasis
  [87, 0.05], // 9 glow
];

export function genVars(hue: number) {
  let css = ":root,.light{";
  let cssDark = ".dark{";
  for (let i = 0; i < 10; i++) {
    const level = i;
    const [l, c] = lightRamp[i];
    const [lD, cD] = darkRamp[i];
    const lightC = oklch2web(l, c || 0.16, hue);
    const darkC = oklch2web(lD, cD, hue);
    css += `--tiny-c-brand-${level}:${lightC};`;
    cssDark += `--tiny-c-brand-${level}:${darkC};`;
  }
  css += "}";
  cssDark += "}";
  return css + cssDark;
}

export function oklch2web(l: number, c: number, h: number, a?: number) {
  const { r, g, b } = oklchToRgb({ l: l / 100, c, h });
  if (a) {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  return `rgb(${r}, ${g}, ${b})`;
}
