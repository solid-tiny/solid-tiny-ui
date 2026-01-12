import { createStore } from "solid-js/store";
import { Checkbox, CheckboxGroup } from "~";
import { PlayIt } from "~play/components/play-it";

export default function CheckboxGroupPage() {
  const [params, setParams] = createStore({
    disabled: false,
    value: [] as string[],
  });

  const options = [
    { label: <span>Option A</span>, value: "a" },
    { label: <span>Option B</span>, value: "b" },
    { label: <span>Option C</span>, value: "c", disabled: false },
  ];

  return (
    <PlayIt onChange={setParams} properties={params} typeDeclaration={{}}>
      <Checkbox
        checked={params.value.length === options.length}
        indeterminate={
          params.value.length > 0 && params.value.length < options.length
        }
        onChange={(v) => {
          if (v) {
            setParams("value", ["a", "b", "c"]);
          } else {
            setParams("value", []);
          }
        }}
      >
        All
      </Checkbox>
      <CheckboxGroup
        disabled={params.disabled}
        onChange={(v) => setParams("value", v)}
        options={options}
        value={params.value}
      />
    </PlayIt>
  );
}
