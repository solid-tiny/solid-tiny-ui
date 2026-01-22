import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { NumberInput } from "~";
import { PlayIt } from "../../../components/play-it";

function PlayNumberInput() {
  const [params, setParams] = createStore({
    disabled: false,
    placeholder: "Enter number...",
    min: 0,
    max: 100,
    step: 1,
    size: "medium" as const,
    invalid: false,
  });

  const [val, setVal] = createSignal<number | undefined>(0);

  return (
    <PlayIt
      onChange={setParams}
      properties={params}
      typeDeclaration={{
        size: ["small", "medium", "large"],
      }}
    >
      <div>
        <div>Value: {val()}</div>
        <div>
          <NumberInput
            disabled={params.disabled}
            invalid={params.invalid}
            max={params.max}
            min={params.min}
            onChange={setVal}
            placeholder={params.placeholder}
            size={params.size}
            step={params.step}
            value={val()}
          />
        </div>
      </div>
    </PlayIt>
  );
}

export default function NumberInputPage() {
  return (
    <div>
      <PlayNumberInput />
    </div>
  );
}
