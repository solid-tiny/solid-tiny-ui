import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { Input } from "~";
import { PlayIt } from "../../../components/play-it";

function PlayInput() {
  const [params, setParams] = createStore({
    disabled: false,
    placeholder: "Enter text here...",
  });

  const [val, setVal] = createSignal("");

  return (
    <PlayIt onChange={setParams} properties={params}>
      <div>
        <div>{val()}</div>
        <div>
          <Input
            disabled={params.disabled}
            onChange={setVal}
            placeholder={params.placeholder}
            value={val()}
          />
        </div>
      </div>
    </PlayIt>
  );
}

export default function InputPage() {
  return (
    <div>
      <PlayInput />
    </div>
  );
}
