import { For, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { list } from "solid-tiny-utils";
import { Button, Flex, InputCompact, TextField } from "~";
import { PlayIt } from "../../../components/play-it";

function PlayCompact() {
  const [params, setParams] = createStore({
    disabled: false,
    placeholder: "Enter text here...",
  });

  return (
    <PlayIt onChange={setParams} properties={params}>
      <div>
        <InputCompact>
          <Button>1</Button>
          <Button>2</Button>
          <TextField />
          <Button
            disabled={params.disabled}
            styles={{
              root: {
                "border-left-width": "0",
              },
              bg: {
                left: 0,
              },
            }}
          >
            3
          </Button>
          <Show when={params.disabled}>
            <Button>4</Button>
          </Show>
        </InputCompact>
      </div>
    </PlayIt>
  );
}

function PlayFlex() {
  const [params, setParams] = createStore({
    vertical: false,
    wrap: false,
    justify: "flex-start" as const,
    align: "center" as const,
    gap: "md" as const,
    inline: false,
  });
  return (
    <PlayIt onChange={setParams} properties={params}>
      <Flex {...params}>
        <For each={list(20)}>
          {(item) => <Button>{`button ${item}`}</Button>}
        </For>
      </Flex>
    </PlayIt>
  );
}

export default function InputPage() {
  return (
    <div>
      <PlayCompact />
      <PlayFlex />
    </div>
  );
}
