// uno.config.ts
import { presetTinyUi } from "@solid-tiny-ui/unocss-preset";
import { list } from "solid-tiny-utils";
import { defineConfig, presetIcons, presetWind3 } from "unocss";

export default defineConfig({
  safelist: [
    ...list(9).map((i) => `bg-brand-${i}`),
    ...list(9).map((i) => `bg-neutral-${i}`),
  ],
  presets: [
    presetWind3({
      preflight: false,
    }),
    presetTinyUi(),
    presetIcons(),
  ],
});
