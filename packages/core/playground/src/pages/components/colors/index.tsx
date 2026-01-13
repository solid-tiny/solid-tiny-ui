import { For } from "solid-js";
import { list } from "solid-tiny-utils";
import { PlayIt } from "../../../components/play-it";

export default function ColorsPage() {
  return (
    <div>
      <div class="c-text-heading fs-sm mb-sm ml-lg">Palette</div>
      <PlayIt properties={{}}>
        <div>
          <div class="p-md">Brand and Neutral colors</div>
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
        </div>
      </PlayIt>
    </div>
  );
}
