import { createStore } from "solid-js/store";
import { TimePicker } from "~";
import { PlayIt } from "~play/components/play-it";

export default function ComboBoxPage() {
  const [params, setParams] = createStore({
    size: "medium" as const,
    disabled: false,
  });

  const [time, setTime] = createStore({
    hour: null as number | null,
    minute: null as number | null,
    second: null as number | null,
  });

  return (
    <PlayIt
      onChange={setParams}
      properties={params}
      typeDeclaration={{
        size: ["small", "medium", "large"],
      }}
    >
      <TimePicker
        disabled={params.disabled}
        hour={time.hour}
        minute={time.minute}
        onChange={(newTime) => {
          setTime(newTime);
        }}
        second={time.second}
        size={params.size}
        type="second"
      />
    </PlayIt>
  );
}
