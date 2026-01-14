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

      const start = Math.max(
        0,
        itemRects.findIndex((rect) => rect.offsetEnd > scrollOffset) - overscan
      );

      const end = Math.min(
        itemRects.length,
        itemRects.findIndex(
          (rect) => rect.offsetStart > scrollOffset + viewportSize
        ) + overscan + 1
      );

      return {
        start: start < 0 ? 0 : start,
        end: end < 0 ? itemRects.length : end,
      };
    },
  },
});
