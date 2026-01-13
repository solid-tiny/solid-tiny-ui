import { createStore } from "solid-js/store";
import { createWatch } from "solid-tiny-utils";
import { Checkbox } from "~";
import { PlayIt } from "~play/components/play-it";

export default function CheckboxPage() {
  const [params, setParams] = createStore({
    disabled: false,
    indeterminate: false,
    checked: false,
  });

  createWatch(
    () => params.indeterminate,
    (indeterminate) => {
      if (indeterminate) {
        setParams("checked", false);
      }
    }
  );

  createWatch(
    () => params.checked,
    (checked) => {
      if (checked) {
        setParams("indeterminate", false);
      }
    }
  );

  return (
    <PlayIt onChange={setParams} properties={params} typeDeclaration={{}}>
      <Checkbox
        checked={params.checked}
        disabled={params.disabled}
        indeterminate={params.indeterminate}
        onChange={(checked) => setParams("checked", checked)}
      >
        Checkbox
      </Checkbox>
    </PlayIt>
  );
}
