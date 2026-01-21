import { createMemo } from "solid-js";
import {
  callMaybeCallableChild,
  createWatch,
  isDefined,
  type MaybeCallableChild,
} from "solid-tiny-utils";
import { rootContext } from "./context";

export function Root(props: {
  current?: number;
  total?: number;
  pageSize?: number;
  onChange?: (page: number) => void;
  disabled?: boolean;
  showSiblingCount?: number;
  children?: MaybeCallableChild<ReturnType<typeof rootContext.useContext>>;
}) {
  const Context = rootContext.initial({
    current: () => props.current ?? 1,
    total: () => props.total ?? 1,
    pageSize: () => Math.max(props.pageSize ?? 10, 1), // Ensure pageSize is at least 1
    disabled: () => props.disabled ?? false,
    showSiblingCount: () => props.showSiblingCount ?? 1,
  });

  const [state, acts] = Context.value;

  // Calculate total pages
  const totalPages = createMemo(() => Math.ceil(state.total / state.pageSize));

  createWatch(
    () => state.current,
    (v) => {
      if (isDefined(v) && v !== props.current) {
        props.onChange?.(v);
      }
    }
  );

  const goToPage = (page: number) => {
    if (state.disabled) return;
    const total = totalPages();
    if (page < 1 || page > total) return;
    acts.setState("current", () => page);
  };

  const next = () => {
    goToPage(state.current + 1);
  };

  const prev = () => {
    goToPage(state.current - 1);
  };

  return (
    <Context.Provider>
      {callMaybeCallableChild(props.children, [
        { ...state, totalPages },
        { ...acts, goToPage, next, prev },
      ])}
    </Context.Provider>
  );
}
