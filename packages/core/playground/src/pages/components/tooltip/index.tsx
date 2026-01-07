import { Tooltip } from "~";
import { ShowcaseBox } from "../../../components/showcase-box";

export default function TooltipPage() {
  return (
    <div>
      <ShowcaseBox description="Brand and Neutral colors" title="Palette">
        <div>
          <Tooltip content="This is a tooltip">
            <div class="inline-block cursor-pointer rounded-sm bg-neutral-2 px-2 py-1">
              Hover me
            </div>
          </Tooltip>
        </div>
      </ShowcaseBox>
    </div>
  );
}
