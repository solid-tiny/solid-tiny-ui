import { type ComponentProps, type JSX, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { combineClass } from "solid-tiny-utils";

export type ValidResetComponent = keyof JSX.IntrinsicElements;

export function Reset<T extends ValidResetComponent = "div">(
  props: { [K in keyof ComponentProps<T>]: ComponentProps<T>[K] } & { as?: T }
) {
  const [local, others] = splitProps(props, ["as", "class"]);

  return (
    // @ts-expect-error is okay
    <Dynamic
      class={combineClass(`tiny-reset-${local.as ?? "div"}`, local.class)}
      component={local.as ?? "div"}
      {...others}
    />
  );
}

export function ReButton(props: ComponentProps<"button">) {
  return <Reset as="button" type="button" {...props} />;
}

export function ReInput(props: ComponentProps<"input">) {
  return <Reset as="input" {...props} />;
}

export function ReTextArea(props: ComponentProps<"textarea">) {
  return <Reset as="textarea" {...props} />;
}

export function ReTable(props: ComponentProps<"table">) {
  return <Reset as="table" {...props} />;
}
