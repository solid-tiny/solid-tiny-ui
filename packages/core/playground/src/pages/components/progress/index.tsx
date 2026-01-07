import { createSignal } from "solid-js";
import { CircleProgress, LineProgress, LoadingBar } from "~";
import { ShowcaseBox } from "../../../components/showcase-box";

function ShowcaseForLoadingBar() {
  const [open, setOpen] = createSignal(true);

  return (
    <ShowcaseBox
      description={
        <label>
          <input
            checked={open()}
            onChange={(e) => {
              setOpen(e.target.checked);
            }}
            type="checkbox"
            value="on"
          />
          Open
        </label>
      }
    >
      <div style={{ height: "4px", width: "200px" }}>
        <LoadingBar open={open()} />
      </div>
    </ShowcaseBox>
  );
}

export default function ProgressPage() {
  const [percent, setPercent] = createSignal(75);
  const [indeterminate, setIndeterminate] = createSignal(false);
  return (
    <div>
      <ShowcaseBox
        description={
          <div>
            <input
              max={100}
              min={0}
              onChange={(e) => {
                setPercent(Number(e.target.valueAsNumber));
              }}
              type="number"
              value={percent()}
            />
            <label>
              <input
                checked={indeterminate()}
                onChange={(e) => {
                  setIndeterminate(e.target.checked);
                }}
                type="checkbox"
                value="on"
              />
              Indeterminate
            </label>
          </div>
        }
      >
        <div>
          <CircleProgress percent={percent()}>
            <div>circle</div>
          </CircleProgress>
        </div>
        <div class="mt-md">
          <LineProgress
            indeterminate={indeterminate()}
            percent={percent()}
            width="100px"
          />
        </div>
      </ShowcaseBox>
      <ShowcaseForLoadingBar />
    </div>
  );
}
