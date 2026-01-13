import { createStore } from "solid-js/store";
import { RadioGroup } from "~";
import { PlayIt } from "~play/components/play-it";

export default function RadioGroupPage() {
  const [params, setParams] = createStore({
    disabled: false,
    value: "a",
  });

  const options = [
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
    { label: "Option C", value: "c" },
    { label: "Option D", value: "d", disabled: true },
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
