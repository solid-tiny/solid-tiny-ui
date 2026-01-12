import { createStore } from "solid-js/store";
import { RadioGroup } from "~";
import { PlayIt } from "~play/components/play-it";

export default function RadioGroupPage() {
  const [params, setParams] = createStore({
    disabled: false,
    value: "a",
  });

  const options = [
    { label: <span>Option A</span>, value: "a" },
    { label: <span>Option B</span>, value: "b" },
    { label: <span>Option C</span>, value: "c" },
  ];

  return (
    <PlayIt onChange={setParams} properties={params} typeDeclaration={{}}>
      <RadioGroup
        disabled={params.disabled}
        name="demo-radio"
        onChange={(v) => setParams("value", v)}
        options={options}
        value={params.value}
      />
    </PlayIt>
  );
}
