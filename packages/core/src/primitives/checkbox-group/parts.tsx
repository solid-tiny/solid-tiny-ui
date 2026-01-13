import { type ComponentProps, createMemo } from "solid-js";
import { CheckboxCore } from "../checkbox";
import { context } from "./context";

export function Item<T>(props: { value: T }) {
  const [state, actions] = context.useContext();
  const checked = createMemo(() => state.selectValues.includes(props.value));
  return (
    <CheckboxCore
      checked={checked()}
      name={state.name}
      onChange={(c) => {
        actions.toggleValue(props.value, c);
      }}
      value={String(props.value)}
    />
  );
}

export function ItemInput(props: ComponentProps<typeof CheckboxCore.Input>) {
  return <CheckboxCore.Input {...props} />;
}

export function ItemLabel(props: ComponentProps<typeof CheckboxCore.Label>) {
  return <CheckboxCore.Label {...props} />;
}
