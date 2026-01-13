import { createStore } from "solid-js/store";
import { Switcher } from "~";
import { PlayIt } from "~play/components/play-it";

export default function SwitcherPage() {
  const [params, setParams] = createStore({
    disabled: false,
    checked: false,
  });

  return (
    <PlayIt onChange={setParams} properties={params} typeDeclaration={{}}>
      <Switcher checked={params.checked} disabled={params.disabled}>
        Switcher
      </Switcher>
    </PlayIt>
  );
}
