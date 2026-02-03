import { createSignal } from "solid-js";
import { Button, TinyUiProvider } from "solid-tiny-ui";

export function SolidJSExample() {
  const [count, setCount] = createSignal(0);
  return (
    <TinyUiProvider>
      <div>This is a SolidJS example wrapped in TinyUiProvider.</div>
      <Button onClick={() => setCount(count() + 1)}>Click {count()}</Button>
    </TinyUiProvider>
  );
}
