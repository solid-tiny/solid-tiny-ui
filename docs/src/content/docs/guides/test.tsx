import { createSignal } from "solid-js";
import { Tooltip } from "solid-tiny-ui";

export function SolidJSExample() {
  const [count, setCount] = createSignal(0);
  return (
    <Tooltip content="test">
      <button
        onClick={() => {
          setCount((c) => c + 1);
        }}
        type="button"
      >
        {count()}
      </button>
    </Tooltip>
  );
}
