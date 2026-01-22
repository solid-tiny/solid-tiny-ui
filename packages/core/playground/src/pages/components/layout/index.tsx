import { For } from "solid-js";
import { createStore } from "solid-js/store";
import { list } from "solid-tiny-utils";
import { Button, Flex } from "~";
import { PlayIt } from "../../../components/play-it";

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
      <PlayFlex />
    </div>
  );
}
