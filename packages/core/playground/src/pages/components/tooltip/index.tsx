import { Tooltip } from "~";
import { PlayIt } from "../../../components/play-it";

export default function TooltipPage() {
  return (
    <div>
      <div class="c-text-heading fs-sm mb-sm ml-lg">Palette</div>
      <PlayIt properties={{}}>
        <div>
          <div class="p-md">Brand and Neutral colors</div>
          <div>
            <Tooltip content="This is a tooltip">
              <div class="inline-block cursor-pointer rounded-sm bg-neutral-2 px-2 py-1">
                Hover me
              </div>
            </Tooltip>
          </div>
        </div>
      </PlayIt>
    </div>
  );
}
