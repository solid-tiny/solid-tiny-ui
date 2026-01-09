import { list, random } from "solid-tiny-utils";
import { createVirtuaList } from "~";

export default function BasicUsagePage() {
  const [state, Elements] = createVirtuaList({
    items: () =>
      list(1000).map((i) => ({
        label: `Item ${i}`,
        height: `${random(20, 100)}px`,
        bg: `hsl(${random(0, 360)}, 70%, 80%)`,
      })),
  });
  return (
    <Elements.Provider>
      <div class="mb-2 bg-neutral-4 p-2">
        <div>State: </div>
        <div>
          {JSON.stringify({
            estimatedTotalHeight: state.estimatedTotalHeight,
            estimatedItemHeight: state.averageItemHeight,
            scrollTop: state.scrollTop,
            viewportHeight: state.viewportHeight,
          })}
        </div>
      </div>
      <Elements.ScrollElement>
        <div class="h-550px overflow-auto">
          <div
            style={{
              height: `${state.estimatedTotalHeight}px`,
              position: "relative",
            }}
          >
            <Elements.ItemElements>
              {() => <div>{1122}</div>}
            </Elements.ItemElements>
          </div>
        </div>
      </Elements.ScrollElement>
    </Elements.Provider>
  );
}
