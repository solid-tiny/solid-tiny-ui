import { createComponentState } from "solid-tiny-context";
import { max } from "solid-tiny-utils";

export type PaginationPageType = "page" | "ellipsis-left" | "ellipsis-right";
export interface PaginationPager {
  type: PaginationPageType;
  page: number;
}

export const context = createComponentState({
  state: () => ({
    current: 1,
    total: 1,
    pageSize: 10,
    disabled: false,
    siblingCount: 1,
  }),
  getters: {
    totalPages() {
      return Math.ceil(this.state.total / this.state.pageSize);
    },
    renderedPages(): PaginationPager[] {
      const total = this.state.totalPages;
      const current = this.state.current;
      const siblingCount = max(0, this.state.siblingCount);

      const pages = [] as PaginationPager[];

      // trivial cases
      if (total <= 1) {
        return [{ type: "page", page: 1 }];
      }

      // number of middle pages we aim to show (excluding first/last and ellipses)
      const middleCount = 2 * siblingCount + 1;

      // if total small, return all pages
      if (total <= middleCount + 2) {
        for (let i = 1; i <= total; i++) {
          pages.push({ type: "page", page: i });
        }
        return pages;
      }

      // initial centered window
      let left = current - siblingCount;
      let right = current + siblingCount;

      // clamp to valid inner range [2, total-1] and shift window when at edges
      if (left < 2) {
        right += 2 - left;
        left = 2;
      }
      if (right > total - 1) {
        left -= right - (total - 1);
        right = total - 1;
      }
      left = Math.max(2, left);
      right = Math.min(total - 1, right);

      // build pages
      pages.push({ type: "page", page: 1 });

      if (left > 2) {
        // left ellipsis summarizes gap; use page number just before left for potential navigation
        pages.push({ type: "ellipsis-left", page: left - 1 });
      }

      for (let p = left; p <= right; p++) {
        pages.push({ type: "page", page: p });
      }

      if (right < total - 1) {
        pages.push({ type: "ellipsis-right", page: right + 1 });
      }

      pages.push({ type: "page", page: total });

      return pages;
    },
  },
  methods: {
    gotoPage(page: number) {
      if (this.state.disabled) {
        return;
      }
      const total = this.state.totalPages;
      if (page < 1 || page > total) {
        return;
      }
      this.actions.setState("current", () => page);
    },
    next() {
      this.actions.gotoPage(this.state.current + 1);
    },
    prev() {
      this.actions.gotoPage(this.state.current - 1);
    },
  },
});
