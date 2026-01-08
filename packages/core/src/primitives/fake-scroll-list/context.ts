/** biome-ignore-all lint/suspicious/noExplicitAny: any */
import { createComponentState } from "solid-tiny-context";

export const context = createComponentState({
  state: () => ({
    inViewIndex: 0,
    visibleItemsCount: 5,
    itemHeight: 30,
    items: [] as string[],
  }),
  getters: {
    shouldFake() {
      return this.state.items.length > this.state.visibleItemsCount;
    },
    overScan() {
      if (!this.state.shouldFake) {
        return 0;
      }
      return Math.ceil(this.state.visibleItemsCount / 2) + 3;
    },
    fixedInViewIndex() {
      let index = this.state.inViewIndex;
      if (index < 0) {
        index = this.state.items.length + (index % this.state.items.length);
      }
      if (index >= this.state.items.length) {
        index %= this.state.items.length;
      }
      return index;
    },
  },
});
