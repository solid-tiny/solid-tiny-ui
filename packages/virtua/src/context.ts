import { createComponentState } from "solid-tiny-context";
import { list } from "solid-tiny-utils";

export const context = createComponentState({
  state: () => ({
    totalItemsCount: 0,
    refScroller: null as HTMLElement | null,
    heightMap: {} as Record<number, number>,
    scrollTop: 0,
    viewportHeight: 0,
  }),
  getters: {
    averageItemHeight() {
      const heights = Object.values(this.state.heightMap);
      if (heights.length === 0) {
        return 50; // default average height
      }
      const totalHeight = heights.reduce((sum, h) => sum + h, 0);
      return totalHeight / heights.length;
    },
    estimatedTotalHeight() {
      return this.state.totalItemsCount * this.state.averageItemHeight;
    },

    startIndex() {
      return Math.floor(this.state.scrollTop / this.state.averageItemHeight);
    },
    endIndex() {
      return Math.min(
        this.state.totalItemsCount - 1,
        Math.ceil(
          (this.state.scrollTop + this.state.viewportHeight) /
            this.state.averageItemHeight
        )
      );
    },
    visibleIndexes() {
      return list(this.state.startIndex, this.state.endIndex);
    },
  },
  methods: {
    setRefScroller(el: HTMLElement) {
      this.actions.setState("refScroller", el);
    },
    getItemOffset(index: number) {
      let offset = this.state.startIndex * this.state.averageItemHeight;
      for (let i = this.state.startIndex; i < index; i++) {
        offset += this.state.heightMap[i] || this.state.averageItemHeight;
      }
      return offset;
    },
  },
});
