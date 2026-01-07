import { presetTinyUi } from "@solid-tiny-ui/unocss-preset";
import { defineConfig, presetWind3 } from "unocss";

export default defineConfig({
  presets: [
    presetWind3({
      preflight: false,
    }),
    presetTinyUi(),
  ],
});
