import { createSignal } from "solid-js";
import { Spin } from "~";
import { ShowcaseBox } from "../../../components/showcase-box";

export default function SpinPage() {
  const [spinning, setSpinning] = createSignal(false);
  return (
    <div>
      <ShowcaseBox
        description={
          <div>
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
        }
      >
        <div>
          <Spin spinning={spinning()}>
            <div
              style={{ width: "200px", height: "100px", border: "1px solid" }}
            >
              Click the spinning checkbox to toggle spinner
            </div>
          </Spin>
        </div>
      </ShowcaseBox>

      <ShowcaseBox title="Custom indicator">
        <div>
          <Spin indicator={<div>Loading...</div>} spinning={true}>
            <div
              style={{ width: "200px", height: "100px", border: "1px solid" }}
            >
              Click the spinning checkbox to toggle spinner
            </div>
          </Spin>
        </div>
      </ShowcaseBox>
    </div>
  );
}
