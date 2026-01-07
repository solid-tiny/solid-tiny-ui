import { Button } from "~";
import { useAppState } from "../state/app-state";

export function Header() {
  const [, appActs] = useAppState();
  return (
    <div class="flex h-full items-center justify-between">
      <div class="flex">
        <span class="fs-lg ml-2 font-bold">Playground</span>
      </div>
      <div class="mx-2 flex gap-1">
        <Button
          onClick={() => {
            appActs.setState("isDark", (v) => !v);
          }}
          size="small"
        >
          switch theme
        </Button>
        <Button
          onClick={() => {
            appActs.setState("hue", Math.floor(Math.random() * 360));
          }}
          size="small"
        >
          random hue
        </Button>
      </div>
    </div>
  );
}
