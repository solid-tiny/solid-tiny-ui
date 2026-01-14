# Solid Tiny UI

[![npm version](https://img.shields.io/npm/v/solid-tiny-ui?style=flat-square)](https://www.npmjs.com/package/solid-tiny-ui)
[![License](https://img.shields.io/npm/l/solid-tiny-ui?style=flat-square)](https://www.npmjs.com/package/solid-tiny-ui)

> still work in progress...

## Try

```bash
pnpm add solid-tiny-ui @solid-tiny-ui/unocss-preset
```

**Add presets to your unocss configuration**
```ts
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
```

**Introduce solid-tiny-ui at the entry**
```tsx
export function App() {
  return (
    <Router
      root={(props) => (
        <TinyUiProvider hue={200}>
              <Suspense>
                  {props.children}
              </Suspense>
        </TinyUiProvider>
      )}
    >
      {routes}
    </Router>
  );
}
```