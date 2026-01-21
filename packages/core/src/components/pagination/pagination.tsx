import css from "sass:./pagination.scss";
import { Show, splitProps } from "solid-js";
import { combineClass, dataIf, mountStyle } from "solid-tiny-utils";
import { IconArrowLeft, IconArrowRight, IconEllipsis } from "../../icons";
import { PaginationCore } from "../../primitives";

export type PaginationSize = "small" | "middle" | "large";

export function Pagination(props: {
  current?: number;
  total?: number;
  pageSize?: number;
  onChange?: (page: number) => void;
  disabled?: boolean;
  showSiblingCount?: number;
  size?: PaginationSize;
  class?: string;
}) {
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

  return (
    <PaginationCore
      current={local.current}
      disabled={local.disabled}
      onChange={local.onChange}
      pageSize={local.pageSize}
      siblingCount={local.showSiblingCount}
      total={local.total}
    >
      {(state, actions) => {
        return (
          <div
            class={combineClass("tiny-pagination", local.class)}
            data-disabled={dataIf(state.disabled)}
            data-size={size()}
            {...others}
          >
            <button
              class="tiny-pagination-prev"
              disabled={state.disabled || state.current <= 1}
              onClick={actions.prev}
              type="button"
            >
              <IconArrowLeft />
            </button>

            <div class="tiny-pagination-items">
              <PaginationCore.Items
                render={(page) => {
                  return (
                    <Show
                      fallback={
                        <span class="tiny-pagination-ellipsis">
                          <IconEllipsis />
                        </span>
                      }
                      when={page.type === "page"}
                    >
                      <button
                        class="tiny-pagination-item"
                        data-active={dataIf(page.page === state.current)}
                        disabled={local.disabled}
                        onClick={() => actions.gotoPage(page.page)}
                        type="button"
                      >
                        {page.page}
                      </button>
                    </Show>
                  );
                }}
              />
            </div>

            <button
              class="tiny-pagination-next"
              disabled={state.disabled || state.current >= state.totalPages}
              onClick={actions.next}
              type="button"
            >
              <IconArrowRight />
            </button>
          </div>
        );
      }}
    </PaginationCore>
  );
}
