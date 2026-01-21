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
    maxVisiblePages: 7,
  }),
  getters: {
    totalPages() {
      return Math.ceil(this.state.total / this.state.pageSize);
    },
    renderedPages(): PaginationPager[] {
      const total = this.state.totalPages;
      const current = this.state.current;
      const maxVisiblePages = this.state.maxVisiblePages;
      const pages = [] as PaginationPager[];

      // trivial cases
      if (total <= 1) {
        return [{ type: "page", page: 1 }];
      }

      // if total small, return all pages
      if (total <= maxVisiblePages) {
        for (let i = 1; i <= total; i++) {
          pages.push({ type: "page", page: i });
        }
        return pages;
      }

      // first page
      pages.push({ type: "page", page: 1 });

      const centerCount = maxVisiblePages - 2; // subtract first and last page
      let start = max(2, current - Math.floor(centerCount / 2));
      let end = start + centerCount - 1;

      if (end >= total) {
        end = total - 1;
        start = end - centerCount + 1;
      }

      if (start > 2) {
        // left ellipsis
        pages.push({ type: "ellipsis-left", page: start - 1 });
      } else {
        pages.push({ type: "page", page: 2 });
      }

      for (let i = start + 1; i <= end - 1; i++) {
        pages.push({ type: "page", page: i });
      }

      if (end < total - 1) {
        // right ellipsis
        pages.push({ type: "ellipsis-right", page: end + 1 });
      } else {
        pages.push({ type: "page", page: total - 1 });
      }

      // last page
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
