import css from "sass:./pagination.scss";
import { Ref } from "@solid-primitives/refs";
import { createSignal, type JSX, onMount, Show } from "solid-js";
import {
  combineClass,
  createWatch,
  dataIf,
  makeEventListener,
  mountStyle,
} from "solid-tiny-utils";
import { IconArrowLeft, IconArrowRight, IconEllipsis } from "../../icons";
import { PaginationCore } from "../../primitives";

export type PaginationSize = "small" | "middle" | "large";

function GoTorInput(props: { onBlur: (e: FocusEvent) => void; value: number }) {
  let ref!: HTMLInputElement;

  onMount(() => {
    ref.focus();
  });

  return (
    <input
      class="tiny-pagination-input"
      min="1"
      onBlur={props.onBlur}
      ref={ref}
      type="number"
      value={props.value}
    />
  );
}

function GoTor(props: {
  current: number;
  children: JSX.Element;
  gotoPage: (page: number) => void;
  disabled: boolean;
}) {
  const [editable, setEditable] = createSignal(false);
  const [ref, setRef] = createSignal<Element | null>(null);

  createWatch(ref, (el) => {
    if (!el) {
      return;
    }

    makeEventListener(el, "click", () => {
      setEditable(true);
    });
  });
  return (
    <Show fallback={<Ref ref={setRef}>{props.children}</Ref>} when={editable()}>
      <GoTorInput
        onBlur={(e) => {
          const tryTo = (e.currentTarget as HTMLInputElement).valueAsNumber;
          if (tryTo > 0 && tryTo !== props.current) {
            props.gotoPage(tryTo);
          }
          setEditable(false);
        }}
        value={props.current}
      />
    </Show>
  );
}

function DensePages(props: {
  current: number;
  totalPages: number;
  onPageClick: (page: number) => void;
  disabled: boolean;
}) {
  return (
    <>
      <GoTor
        current={props.current}
        disabled={props.disabled}
        gotoPage={props.onPageClick}
      >
        <button
          class="tiny-pagination-item"
          disabled={props.disabled}
          type="button"
        >
          {props.current}
        </button>
      </GoTor>

      <span
        class="tiny-pagination-separator"
        data-disabled={dataIf(props.disabled)}
      >
        /
      </span>
      <button
        class="tiny-pagination-item"
        disabled={props.disabled}
        onClick={() => props.onPageClick(props.totalPages)}
        type="button"
      >
        {props.totalPages}
      </button>
    </>
  );
}

/**
 * A pagination component for navigating through pages of content.
 *
 * maxVisiblePages: Maximum number of page buttons to display (default: 7, minimum: 5).
 */
export function Pagination(props: {
  current?: number;
  total?: number;
  pageSize?: number;
  onChange?: (page: number) => void;
  disabled?: boolean;
  maxVisiblePages?: number;
  size?: PaginationSize;
  class?: string;
  dense?: boolean;
}) {
  mountStyle(css, "tiny-pagination");

  const size = () => props.size ?? "middle";

  return (
    <PaginationCore
      current={props.current}
      disabled={props.disabled}
      maxVisiblePages={props.maxVisiblePages}
      onChange={props.onChange}
      pageSize={props.pageSize}
      total={props.total}
    >
      {(state, actions) => {
        return (
          <div
            class={combineClass("tiny-pagination", props.class)}
            data-disabled={dataIf(state.disabled)}
            data-size={size()}
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
              <Show
                fallback={
                  <DensePages
                    current={state.current}
                    disabled={state.disabled}
                    onPageClick={actions.gotoPage}
                    totalPages={state.totalPages}
                  />
                }
                when={!props.dense}
              >
                <PaginationCore.Items
                  render={(page) => {
                    return (
                      <Show
                        fallback={
                          <span
                            aria-disabled={state.disabled}
                            class="tiny-pagination-ellipsis"
                            data-disabled={dataIf(state.disabled)}
                          >
                            <IconEllipsis />
                          </span>
                        }
                        when={page.type === "page"}
                      >
                        <button
                          class="tiny-pagination-item"
                          data-active={dataIf(page.page === state.current)}
                          disabled={state.disabled}
                          onClick={() => actions.gotoPage(page.page)}
                          type="button"
                        >
                          {page.page}
                        </button>
                      </Show>
                    );
                  }}
                />
              </Show>
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
