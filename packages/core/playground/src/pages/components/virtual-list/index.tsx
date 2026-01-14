import { createMemo, createSignal } from "solid-js";
import { VirtualList } from "~";
import { PlayIt } from "~play/components/play-it";

export default function VirtualListPage() {
  const [count, setCount] = createSignal(10000);
  const [estimateSize, setEstimateSize] = createSignal(50);
  const [horizontal, setHorizontal] = createSignal(false);
  const [overscan, setOverscan] = createSignal(3);

  // Pre-generate random heights to avoid re-calculating on every render
  const itemHeights = createMemo(() =>
    Array.from({ length: count() }, () => Math.random() * 50 + 30)
  );
  const itemWidths = createMemo(() =>
    Array.from({ length: 1000 }, () => Math.random() * 100 + 100)
  );

  return (
    <div class="space-y-4">
      <PlayIt
        onChange={(params) => {
          setCount(params.count ?? 10000);
          setEstimateSize(params.estimateSize ?? 50);
          setHorizontal(params.horizontal ?? false);
          setOverscan(params.overscan ?? 3);
        }}
        properties={{
          count: count(),
          estimateSize: estimateSize(),
          horizontal: horizontal(),
          overscan: overscan(),
        }}
        typeDeclaration={{}}
      >
        <div class="space-y-4">
          <h2 class="text-xl fw-bold">Basic Virtual List</h2>
          <div
            class="b b-border b-rd"
            style={{
              height: horizontal() ? "200px" : "500px",
              width: "100%",
            }}
          >
            <VirtualList
              count={count()}
              estimateSize={estimateSize()}
              horizontal={horizontal()}
              overscan={overscan()}
              style={{
                height: "100%",
                width: "100%",
              }}
            >
              {(index) => {
                const height = itemHeights()[index % itemHeights().length];
                const width = itemWidths()[index % itemWidths().length];
                return (
                  <VirtualList.Item
                    index={index}
                    style={{
                      padding: "12px 16px",
                      "border-bottom": horizontal()
                        ? "none"
                        : "1px solid #e5e7eb",
                      "border-right": horizontal()
                        ? "1px solid #e5e7eb"
                        : "none",
                      background: index % 2 === 0 ? "#f9fafb" : "#ffffff",
                      display: "flex",
                      "align-items": "center",
                      height: horizontal() ? "100%" : `${height}px`,
                      width: horizontal() ? `${width}px` : "100%",
                    }}
                  >
                    <div class="fw-medium">Item {index}</div>
                  </VirtualList.Item>
                );
              }}
            </VirtualList>
          </div>
        </div>
      </PlayIt>

      <div class="space-y-4">
        <h2 class="text-xl fw-bold">Dynamic Size Virtual List</h2>
        <div
          class="b b-border b-rd"
          style={{
            height: "400px",
            width: "100%",
          }}
        >
          <VirtualList
            count={1000}
            estimateSize={60}
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            {(index) => {
              const heights = [40, 60, 80, 100, 120];
              const height = heights[index % heights.length];
              return (
                <VirtualList.Item
                  index={index}
                  style={{
                    padding: "12px 16px",
                    "border-bottom": "1px solid #e5e7eb",
                    background: "#ffffff",
                    height: `${height}px`,
                    display: "flex",
                    "align-items": "center",
                    "justify-content": "space-between",
                  }}
                >
                  <div>
                    <div class="fw-bold">Item {index}</div>
                    <div class="text-sm text-gray-600">Height: {height}px</div>
                  </div>
                </VirtualList.Item>
              );
            }}
          </VirtualList>
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl fw-bold">Horizontal Virtual List</h2>
        <div
          class="b b-border b-rd"
          style={{
            height: "200px",
            width: "100%",
          }}
        >
          <VirtualList
            count={1000}
            estimateSize={150}
            horizontal
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            {(index) => {
              const widths = [100, 150, 200, 120];
              const width = widths[index % widths.length];
              return (
                <VirtualList.Item
                  index={index}
                  style={{
                    padding: "16px",
                    "border-right": "1px solid #e5e7eb",
                    background: index % 2 === 0 ? "#f0f9ff" : "#ffffff",
                    width: `${width}px`,
                    height: "100%",
                    display: "flex",
                    "align-items": "center",
                    "justify-content": "center",
                    "flex-direction": "column",
                  }}
                >
                  <div class="fw-bold">Card {index}</div>
                  <div class="text-sm text-gray-600">W: {width}px</div>
                </VirtualList.Item>
              );
            }}
          </VirtualList>
        </div>
      </div>
    </div>
  );
}
