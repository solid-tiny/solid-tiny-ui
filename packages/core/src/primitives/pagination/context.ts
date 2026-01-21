import { createComponentState } from "solid-tiny-context";

export const rootContext = createComponentState({
  state: () => ({
    current: 1,
    total: 1,
    pageSize: 10,
    disabled: false,
    showSiblingCount: 1,
    totalPages: 1,
  }),
});

export const itemContext = createComponentState({
  state: () => ({
    page: 1,
    active: false,
    disabled: false,
  }),
});
