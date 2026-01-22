import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { Textarea } from "~";
import { PlayIt } from "../../../components/play-it";

function PlayTextarea() {
  const [params, setParams] = createStore({
    disabled: false,
    placeholder: "Enter text here...",
    invalid: false,
  });

  const [val, setVal] = createSignal("");

  return (
    <PlayIt onChange={setParams} properties={params}>
      <div>
        <div>value: {val()}</div>
        <div>
          <Textarea
            disabled={params.disabled}
            invalid={params.invalid}
            onChange={setVal}
            placeholder={params.placeholder}
            value={val()}
          />
        </div>
      </div>
    </PlayIt>
  );
}

export default function TextareaPage() {
  return (
    <div>
      <PlayTextarea />
    </div>
  );
}
