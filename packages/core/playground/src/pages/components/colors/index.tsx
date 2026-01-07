import { For } from "solid-js";
import { list } from "solid-tiny-utils";
import { ShowcaseBox } from "../../../components/showcase-box";

export default function ColorsPage() {
  return (
    <div>
      <ShowcaseBox description="Brand and Neutral colors" title="Palette">
        <div>
          <div class="flex">
            <For each={list(9)}>
              {(i) => <div class={`bg-brand-${i} h-40px w-20px`} />}
            </For>
          </div>
          <div class="mt-md flex">
            <For each={list(9)}>
              {(i) => <div class={`bg-neutral-${i} h-40px w-20px`} />}
            </For>
          </div>
        </div>
      </ShowcaseBox>
    </div>
  );
}
