import { type ComponentProps, createMemo, onMount } from "solid-js";
import { createWatch } from "solid-tiny-utils";
import { VisuallyHidden } from "../../components/visually-hidden";
import { context } from "./context";

export function Input(props: { id?: string }) {
  const [state, actions] = context.useContext();

  const handleOnChange = (e: Event) => {
    const checked = (e.target as HTMLInputElement).checked;
    actions.setState({ checked });
  };

  let inputRef: HTMLInputElement | undefined;

  onMount(() => {
    createWatch(
      () => state.indeterminate,
      (v) => {
        if (inputRef) {
          inputRef.indeterminate = v;
        }
      }
    );
  });

  const ariaChecked = createMemo(() => {
    if (state.indeterminate) {
      return "mixed";
    }
    return state.checked ? "true" : "false";
  });

  return (
    <VisuallyHidden
      aria-checked={ariaChecked()}
      as="input"
      checked={state.checked}
      disabled={state.disabled}
      id={props.id}
      name={state.name}
      onChange={handleOnChange}
      ref={inputRef}
      type="checkbox"
      value={state.value}
    />
  );
}

export function Label(props: ComponentProps<"label">) {
  // biome-ignore lint/a11y/noLabelWithoutControl: ignore for primitive
  return <label {...props} />;
}
