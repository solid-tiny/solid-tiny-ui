import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { TextField } from "~";
import { PlayIt } from "../../../components/play-it";

function PlayTextField() {
  const [params, setParams] = createStore({
    disabled: false,
    placeholder: "Enter text here...",
    size: "medium" as const,
    prefix: false,
    suffix: false,
    invalid: false,
  });

  const [val, setVal] = createSignal("");

  return (
    <PlayIt
      onChange={setParams}
      properties={params}
      typeDeclaration={{
        size: ["small", "medium", "large"],
      }}
    >
      <div>
        <div>value: {val()}</div>
        <div>
          <TextField
            disabled={params.disabled}
            invalid={params.invalid}
            onChange={setVal}
            placeholder={params.placeholder}
            prefix={
              params.prefix ? (
                <div class="i-ri:account-box-2-line mr-1 text-1.3em" />
              ) : undefined
            }
            size={params.size}
            suffix={
              params.suffix ? <span class="ml-1">Suffix</span> : undefined
            }
            value={val()}
          />
        </div>
      </div>
    </PlayIt>
  );
}

export default function TextFieldPage() {
  return (
    <div>
      <PlayTextField />
    </div>
  );
}
