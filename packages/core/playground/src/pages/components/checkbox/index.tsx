import { createStore } from "solid-js/store";
import { Checkbox } from "~";
import { PlayIt } from "~play/components/play-it";

export default function CheckboxPage() {
  const [params, setParams] = createStore({
    disabled: false,
    indeterminate: false,
    checked: false,
  });

  return (
    <PlayIt onChange={setParams} properties={params} typeDeclaration={{}}>
      <Checkbox
        checked={false}
        disabled={params.disabled}
        indeterminate={params.indeterminate}
      >
        Checkbox
      </Checkbox>
    </PlayIt>
  );
}
