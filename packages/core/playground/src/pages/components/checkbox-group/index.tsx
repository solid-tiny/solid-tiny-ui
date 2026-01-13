import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { Checkbox, CheckboxGroup } from "~";
import { PlayIt } from "~play/components/play-it";

export default function CheckboxGroupPage() {
  const [params, setParams] = createStore({
    disabled: false,
    vertical: false,
  });

  const [value, setVal] = createSignal<string[]>([]);

  const options = [
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
    { label: "Option C", value: "c", disabled: true },
  ];

  return (
    <PlayIt onChange={setParams} properties={params} typeDeclaration={{}}>
      <div class="mb-md">
        <Checkbox
          checked={value().length === options.length}
          indeterminate={value().length > 0 && value().length < options.length}
          onChange={(v) => {
            if (v) {
              setVal(["a", "b", "c"]);
            } else {
              setVal([]);
            }
          }}
        >
          All
        </Checkbox>
      </div>

      <CheckboxGroup
        disabled={params.disabled}
        onChange={setVal}
        options={options}
        value={value()}
        vertical={params.vertical}
      />
    </PlayIt>
  );
}
