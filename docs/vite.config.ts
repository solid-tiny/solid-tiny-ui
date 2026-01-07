import { solidStart } from "@solidjs/start/config";
import { nitroV2Plugin } from "@solidjs/vite-plugin-nitro-2";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    UnoCSS(),
    solidStart(),
    nitroV2Plugin({
      preset: "netlify",
    }),
  ],
});
