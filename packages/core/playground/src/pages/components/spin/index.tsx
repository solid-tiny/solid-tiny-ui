import { createSignal } from "solid-js";
import { Spin } from "~";
import { PlayIt } from "../../../components/play-it";

export default function SpinPage() {
  const [spinning, setSpinning] = createSignal(false);
  return (
    <div>
      <PlayIt properties={{}}>
        <div>
          <div class="p-md">
            <label>
              <input
                checked={spinning()}
                onChange={(e) => {
                  setSpinning(e.target.checked);
                }}
                type="checkbox"
                value="on"
              />
              Spinning
            </label>
          </div>
          <div>
            <Spin spinning={spinning()}>
              <div
                style={{ width: "200px", height: "100px", border: "1px solid" }}
              >
                Click the spinning checkbox to toggle spinner
              </div>
            </Spin>
          </div>
        </div>
      </PlayIt>

      <div class="c-text-heading fs-sm mb-sm ml-lg">Custom indicator</div>
      <PlayIt properties={{}}>
        <div>
          <div>
            <Spin indicator={<div>Loading...</div>} spinning={true}>
              <div
                style={{ width: "200px", height: "100px", border: "1px solid" }}
              >
                Click the spinning checkbox to toggle spinner
              </div>
            </Spin>
          </div>
        </div>
      </PlayIt>
    </div>
  );
}
