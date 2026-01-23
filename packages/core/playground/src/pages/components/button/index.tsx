import { Show } from "solid-js";
import { createStore } from "solid-js/store";
import { Button, StateButton } from "~";
import { PlayIt } from "../../../components/play-it";

function PlayBasicButton() {
  const [params, setParams] = createStore({
    disabled: false,
    size: "medium" as const,
    variant: "solid" as const,
    rounded: false,
    iconPlacement: "start" as const,
    iconOnly: false,
    color: "primary" as const,
  });

  return (
    <PlayIt
      onChange={setParams}
      properties={params}
      typeDeclaration={{
        size: ["small", "medium", "large"],
        variant: ["solid", "text", "link", "outline", "subtle"],
        iconPlacement: ["start", "end"],
        color: ["primary", "neutral", "info", "warning", "success", "danger"],
      }}
    >
      <Button
        color={params.color}
        disabled={params.disabled}
        icon={<div class="i-ri:accessibility-line text-1.2em" />}
        iconPlacement={params.iconPlacement}
        rounded={params.rounded}
        size={params.size}
        variant={params.variant}
      >
        <Show fallback={""} when={!params.iconOnly}>
          Play Button
        </Show>
      </Button>
    </PlayIt>
  );
}

function PlayStateButton() {
  const [params, setParams] = createStore({
    disabled: "",
    size: "medium" as const,
    variant: "solid" as const,
    rounded: false,
    iconPlacement: "start" as const,
    iconOnly: false,
    color: "primary" as const,
    loading: false as boolean,
  });

  return (
    <PlayIt
      onChange={setParams}
      properties={params}
      typeDeclaration={{
        size: ["small", "medium", "large"],
        variant: ["solid", "text", "link", "outline", "subtle"],
        iconPlacement: ["start", "end"],
        color: [
          "primary",
          "neutral",
          "info",
          "warning",
          "success",
          "danger",
          "link",
        ],
      }}
    >
      <StateButton
        color={params.color}
        disabled={params.disabled}
        icon={<div class="i-ri:accessibility-line text-1.2em" />}
        iconPlacement={params.iconPlacement}
        loading={params.loading}
        rounded={params.rounded}
        size={params.size}
        variant={params.variant}
      >
        <Show fallback={""} when={!params.iconOnly}>
          Play Button
        </Show>
      </StateButton>
    </PlayIt>
  );
}

export default function ButtonsPage() {
  return (
    <div>
      <PlayBasicButton />
      <PlayStateButton />
    </div>
  );
}
