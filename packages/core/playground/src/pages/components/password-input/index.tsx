import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { PasswordInput } from "~";
import { PlayIt } from "../../../components/play-it";

function PlayPasswordInput() {
  const [params, setParams] = createStore({
    disabled: false,
    placeholder: "Enter password...",
    size: "medium" as const,
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
        <div>Password: {val()}</div>
        <div>
          <PasswordInput
            disabled={params.disabled}
            onChange={setVal}
            placeholder={params.placeholder}
            size={params.size}
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
