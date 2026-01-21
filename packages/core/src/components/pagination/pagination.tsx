import css from "sass:./pagination.scss";
import { For, Show, createMemo, splitProps } from "solid-js";
import { combineClass, dataIf, mountStyle } from "solid-tiny-utils";
import { PaginationCore } from "../../primitives";
import type { OmitComponentProps } from "../../utils/types";

export type PaginationSize = "small" | "middle" | "large";

export function Pagination(
  props: {
    current?: number;
    total?: number;
    pageSize?: number;
    onChange?: (page: number) => void;
    disabled?: boolean;
    showSiblingCount?: number;
    size?: PaginationSize;
  } & OmitComponentProps<"div", "children">
) {
  mountStyle(css, "tiny-pagination");

  const [local, others] = splitProps(props, [
    "current",
    "total",
    "pageSize",
    "onChange",
    "disabled",
    "showSiblingCount",
    "size",
    "class",
  ]);

  const size = () => local.size ?? "middle";

  // Generate page numbers to display
  const pageNumbers = createMemo(() => {
    const current = local.current ?? 1;
    const totalPages = Math.ceil((local.total ?? 1) / (local.pageSize ?? 10));
    const siblingCount = local.showSiblingCount ?? 1;

    // If total pages is small enough, show all pages
    if (totalPages <= 5 + siblingCount * 2) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(current - siblingCount, 1);
    const rightSiblingIndex = Math.min(current + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    const pages: (number | "ellipsis-left" | "ellipsis-right")[] = [];

    // Always show first page
    pages.push(1);

    if (shouldShowLeftDots) {
      pages.push("ellipsis-left");
    } else if (leftSiblingIndex === 2) {
      pages.push(2);
    }

    // Show pages around current
    for (
      let i = Math.max(leftSiblingIndex, 2);
      i <= Math.min(rightSiblingIndex, totalPages - 1);
      i++
    ) {
      pages.push(i);
    }

    if (shouldShowRightDots) {
      pages.push("ellipsis-right");
    } else if (rightSiblingIndex === totalPages - 1) {
      pages.push(totalPages - 1);
    }

    // Always show last page if there are more than 1 page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  });

  return (
    <PaginationCore
      current={local.current}
      disabled={local.disabled}
      onChange={local.onChange}
      pageSize={local.pageSize}
      showSiblingCount={local.showSiblingCount}
      total={local.total}
    >
      {([state]) => (
        <div
          class={combineClass("tiny-pagination", local.class)}
          data-disabled={dataIf(state.disabled)}
          data-size={size()}
          {...others}
        >
          <PaginationCore.PrevButton class="tiny-pagination-prev">
            ‹
          </PaginationCore.PrevButton>

          <div class="tiny-pagination-items">
            <For each={pageNumbers()}>
              {(item) => (
                <Show
                  when={typeof item === "number"}
                  fallback={
                    <PaginationCore.Ellipsis class="tiny-pagination-ellipsis" />
                  }
                >
                  <PaginationCore.Item
                    class="tiny-pagination-item"
                    page={item as number}
                  >
                    {item}
                  </PaginationCore.Item>
                </Show>
              )}
            </For>
          </div>

          <PaginationCore.NextButton class="tiny-pagination-next">
            ›
          </PaginationCore.NextButton>
        </div>
      )}
    </PaginationCore>
  );
}
