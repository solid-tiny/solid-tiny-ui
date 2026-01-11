import { createStore } from "solid-js/store";
import { Checkbox } from "~";
import { PlayIt } from "~play/components/play-it";

export default function CheckboxPage() {
  const [params, setParams] = createStore({
    size: "medium" as const,
    disabled: false,
  });

  return (
    <PlayIt
      onChange={setParams}
      properties={params}
      typeDeclaration={{
        size: ["small", "medium", "large"],
      }}
    >
      <Checkbox checked={false} disabled={params.disabled} size={params.size}>
        <span style={{ "margin-left": "8px" }}>Checkbox</span>
      </Checkbox>
    </PlayIt>
  );
}
