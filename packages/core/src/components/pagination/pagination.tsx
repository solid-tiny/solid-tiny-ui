import css from "sass:./pagination.scss";
import { Ref } from "@solid-primitives/refs";
import { createSignal, type JSX, onMount, Show } from "solid-js";
import {
  combineClass,
  combineStyle,
  createWatch,
  dataIf,
  makeEventListener,
  mountStyle,
} from "solid-tiny-utils";
import { IconArrowLeft, IconArrowRight, IconEllipsis } from "../../icons";
import { PaginationCore } from "../../primitives";
import { createClassStyles } from "../../utils";
import type { ClassNames, Styles } from "../../utils/types";

export type PaginationSize = "small" | "middle" | "large";

function GoToPageInput(props: {
  onBlur: (e: FocusEvent) => void;
  value: number;
  width: number;
  class?: string;
  style?: JSX.CSSProperties | string;
}) {
  let ref!: HTMLInputElement;

  onMount(() => {
    ref.focus();
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      ref.blur();
    }
  };

  return (
    <input
      class={combineClass("tiny-pagination-input", props.class)}
      min="1"
      onBlur={props.onBlur}
      onKeyDown={handleKeyDown}
      ref={ref}
      style={combineStyle(
        {
          "--width": `${props.width}px`,
        },
        props.style
      )}
      type="number"
      value={props.value}
    />
  );
}

function GoToPageEditable(props: {
  current: number;
  children: JSX.Element;
  gotoPage: (page: number) => void;
  disabled: boolean;
  inputClass?: string;
  inputStyle?: JSX.CSSProperties | string;
}) {
  const [editable, setEditable] = createSignal(false);
  const [ref, setRef] = createSignal<Element | null>(null);
  const [w, setW] = createSignal(0);

  createWatch(ref, (el) => {
    if (!el) {
      return;
    }

    makeEventListener(el, "click", () => {
      setW((el as HTMLElement).offsetWidth);
      setEditable(true);
    });
  });
  return (
    <Show fallback={<Ref ref={setRef}>{props.children}</Ref>} when={editable()}>
      <GoToPageInput
        class={props.inputClass}
        onBlur={(e) => {
          const tryTo = (e.currentTarget as HTMLInputElement).valueAsNumber;
          if (tryTo > 0 && tryTo !== props.current) {
            props.gotoPage(tryTo);
          }
          setEditable(false);
        }}
        style={props.inputStyle}
        value={props.current}
        width={w()}
      />
    </Show>
  );
}

function DensePages(props: {
  current: number;
  totalPages: number;
  onPageClick: (page: number) => void;
  disabled: boolean;
  itemClass?: string;
  itemStyle?: JSX.CSSProperties | string;
  separatorClass?: string;
  separatorStyle?: JSX.CSSProperties | string;
  inputClass?: string;
  inputStyle?: JSX.CSSProperties | string;
}) {
  return (
    <>
      <GoToPageEditable
        current={props.current}
        disabled={props.disabled}
        gotoPage={props.onPageClick}
        inputClass={props.inputClass}
        inputStyle={props.inputStyle}
      >
        <button
          class={combineClass("tiny-pagination-item", props.itemClass)}
          disabled={props.disabled}
          style={combineStyle({}, props.itemStyle)}
          type="button"
        >
          {props.current}
        </button>
      </GoToPageEditable>

      <span
        class={combineClass("tiny-pagination-separator", props.separatorClass)}
        data-disabled={dataIf(props.disabled)}
        style={combineStyle({}, props.separatorStyle)}
      >
        /
      </span>

      <button
        class={combineClass("tiny-pagination-item", props.itemClass)}
        disabled={props.disabled}
        onClick={() => props.onPageClick(props.totalPages)}
        style={combineStyle({}, props.itemStyle)}
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
  dense?: boolean;
  classNames?: ClassNames<
    "root" | "prev" | "items" | "item" | "separator" | "next" | "input",
    {
      disabled: boolean;
      size: PaginationSize;
      dense: boolean;
    }
  >;
  styles?: Styles<
    "root" | "prev" | "items" | "item" | "separator" | "next" | "input",
    {
      disabled: boolean;
      size: PaginationSize;
      dense: boolean;
    }
  >;
}) {
  mountStyle(css, "tiny-pagination");

  const size = () => props.size ?? "middle";

  const [classes, styles] = createClassStyles(
    () => props.classNames,
    () => props.styles,
    () => ({
      disabled: props.disabled ?? false,
      size: size(),
      dense: props.dense ?? false,
    })
  );

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
            class={combineClass("tiny-pagination", classes().root)}
            data-disabled={dataIf(state.disabled)}
            data-size={size()}
            style={combineStyle({}, styles().root)}
          >
            <button
              class={combineClass("tiny-pagination-prev", classes().prev)}
              disabled={state.disabled || state.current <= 1}
              onClick={actions.prev}
              style={combineStyle({}, styles().prev)}
              type="button"
            >
              <IconArrowLeft />
            </button>
            <div
              class={combineClass("tiny-pagination-items", classes().items)}
              style={combineStyle({}, styles().items)}
            >
              <Show
                fallback={
                  <DensePages
                    current={state.current}
                    disabled={state.disabled}
                    inputClass={classes().input}
                    inputStyle={styles().input}
                    itemClass={classes().item}
                    itemStyle={styles().item}
                    onPageClick={actions.gotoPage}
                    separatorClass={classes().separator}
                    separatorStyle={styles().separator}
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
                          <GoToPageEditable
                            current={state.current}
                            disabled={state.disabled}
                            gotoPage={actions.gotoPage}
                            inputClass={classes().input}
                            inputStyle={styles().input}
                          >
                            <button
                              class={combineClass(
                                "tiny-pagination-item",
                                classes().item
                              )}
                              disabled={state.disabled}
                              style={combineStyle({}, styles().item)}
                              type="button"
                            >
                              <IconEllipsis />
                            </button>
                          </GoToPageEditable>
                        }
                        when={page.type === "page"}
                      >
                        <button
                          class={combineClass(
                            "tiny-pagination-item",
                            classes().item
                          )}
                          data-active={dataIf(page.page === state.current)}
                          disabled={state.disabled}
                          onClick={() => actions.gotoPage(page.page)}
                          style={combineStyle({}, styles().item)}
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
              class={combineClass("tiny-pagination-next", classes().next)}
              disabled={state.disabled || state.current >= state.totalPages}
              onClick={actions.next}
              style={combineStyle({}, styles().next)}
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
