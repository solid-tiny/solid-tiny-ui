/** biome-ignore-all lint/suspicious/noExplicitAny: any */
import solid from "rolldown-plugin-solid";
import inlinePlugin from "rollup-plugin-inline-import";
import { defineConfig, type UserConfig } from "tsdown";

const getPlugins = (jsx: boolean): any[] => {
  if (!jsx) {
    return [solid({ solid: { generate: "dom" } }), inlinePlugin()] as any[];
  }

  return [inlinePlugin()] as any[];
};

const entries = [
  "./src/index.ts",
  "./src/icons/index.ts",
  "./src/primitives/index.ts",
] satisfies UserConfig["entry"];
// export both js and jsx
export default defineConfig([
  {
    entry: entries,
    platform: "neutral",
    // use the solid plugin to handle jsx
    plugins: getPlugins(false),
    unbundle: true,
    define: {
      IS_DEV: "false",
    },
  },
  {
    entry: entries,
    platform: "neutral",
    plugins: getPlugins(true),
    inputOptions(options) {
      options.transform = {
        ...options.transform,
        jsx: "preserve",
      };
    },
    outExtensions: () => ({ js: ".jsx" }),
    unbundle: true,
    define: {
      IS_DEV: "false",
    },
  },
]);
