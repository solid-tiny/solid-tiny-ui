import { mergeRefs } from "@solid-primitives/refs";
import {
  type ComponentProps,
  createUniqueId,
  onMount,
  splitProps,
} from "solid-js";
import { createWatch, dataIf, runSolidEventHandler } from "solid-tiny-utils";
import { context } from "./context";

function Root(
  props: Omit<ComponentProps<"div">, "role" | "tabIndex" | "tabindex"> & {
    autofocus?: boolean;
  }
) {
  let ref: HTMLDivElement | undefined;
  const Context = context.initial();
  const [state, actions] = Context.value;
  const getOptions = () =>
    Array.from(
      ref?.querySelectorAll<HTMLElement>("[role=option]") ?? []
    ).filter((option) => !option.hasAttribute("data-disabled"));

  const moveFocusBy = (delta: number) => {
    const options = getOptions();
    if (options.length === 0) {
      return;
    }

    const currentIndex = state.currFocusId
      ? options.findIndex((option) => option.dataset.id === state.currFocusId)
      : -1;
    const nextIndex = currentIndex + delta;
    setFocusToIndex(nextIndex);
  };
  const setFocusToIndex = (index: number) => {
    const options = getOptions();
    if (options.length === 0) {
      return;
    }
    const clamped = Math.max(0, Math.min(index, options.length - 1));
    const option = options.at(clamped);
    if (!option) {
      return;
    }
    option.focus();
    actions.setState("currFocusId", option.dataset.id ?? "");
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        moveFocusBy(1);
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        if (!state.currFocusId) {
          break;
        }
        moveFocusBy(-1);
        break;
      }
      case "Home": {
        e.preventDefault();
        setFocusToIndex(0);
        break;
      }
      case "End": {
        e.preventDefault();
        setFocusToIndex(Number.MAX_SAFE_INTEGER);
        break;
      }
      default:
        break;
    }
  };

  const [local, others] = splitProps(props, ["onKeyDown"]);

  onMount(() => {
    if (props.autofocus) {
      ref?.focus();
    }
  });
  return (
    <Context.Provider>
      <div
        {...others}
        onKeyDown={(e) => {
          handleKeyDown(e);
          runSolidEventHandler(e, local.onKeyDown);
        }}
        ref={mergeRefs(props.ref, (el) => {
          ref = el;
        })}
        role="listbox"
        tabIndex={0}
      />
    </Context.Provider>
  );
}

function Item(
  props: Omit<ComponentProps<"div">, "role" | "tabIndex" | "tabindex"> & {
    focus?: boolean;
    disabled?: boolean;
  }
) {
  const id = `option:${createUniqueId()}`;
  const [local, others] = splitProps(props, [
    "onClick",
    "onKeyDown",
    "ref",
    "focus",
    "disabled",
  ]);
  const [state, actions] = context.useContext();

  let ref!: HTMLDivElement;

  onMount(() => {
    createWatch(
      () => local.focus,
      (focus) => {
        if (focus && !local.disabled) {
          ref?.focus();
        }
      }
    );
  });

  return (
    <div
      {...others}
      data-disabled={dataIf(local.disabled ?? false)}
      data-focused={dataIf(state.currFocusId === id)}
      data-id={id}
      onClick={(e) => {
        e.currentTarget.focus();
        runSolidEventHandler(e, local.onClick);
      }}
      onFocus={[
        (fId: string) => {
          actions.setState("currFocusId", fId);
        },
        id,
      ]}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          e.currentTarget.click();
        }
        runSolidEventHandler(e, local.onKeyDown);
      }}
      ref={mergeRefs(local.ref, (el) => {
        ref = el;
      })}
      role="option"
      tabIndex={-1}
    />
  );
}

export const Listbox = Object.assign(Root, { Item });
