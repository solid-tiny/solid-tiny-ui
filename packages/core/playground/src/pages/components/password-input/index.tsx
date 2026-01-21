import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { PasswordInput } from "~";
import { PlayIt } from "../../../components/play-it";

function PlayPasswordInput() {
  const [params, setParams] = createStore({
    disabled: false,
    placeholder: "Enter password...",
  });

  const [val, setVal] = createSignal("");

  return (
    <PlayIt onChange={setParams} properties={params}>
      <div>
        <div>Password: {val()}</div>
        <div>
          <PasswordInput
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

export default function PasswordInputPage() {
  return (
    <div>
      <PlayPasswordInput />
    </div>
  );
}
