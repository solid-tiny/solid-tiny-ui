import { createComponentState } from "solid-tiny-context";

export interface ItemRect {
  index: number;
  offsetStart: number;
  offsetEnd: number;
  size: number;
}

export const context = createComponentState({
  state: () => ({
    scrollOffset: 0,
    viewportSize: 0,
    horizontal: false,
    overscan: 3,
    itemRects: [] as ItemRect[],
    totalSize: 0,
    scrolling: false,
  }),
  getters: {
    visibleRange() {
      const { scrollOffset, viewportSize, itemRects, overscan } = this.state;
      
      if (itemRects.length === 0) {
        return { start: 0, end: 0 };
      }

      const startIndex = itemRects.findIndex(
        (rect) => rect.offsetEnd > scrollOffset
      );
      const start = Math.max(0, (startIndex >= 0 ? startIndex : 0) - overscan);

      const endIndex = itemRects.findIndex(
        (rect) => rect.offsetStart > scrollOffset + viewportSize
      );
      const end = Math.min(
        itemRects.length,
        (endIndex >= 0 ? endIndex : itemRects.length) + overscan + 1
      );

      return { start, end };
    },
  },
});
