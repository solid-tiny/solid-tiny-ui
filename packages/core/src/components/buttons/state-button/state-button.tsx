import css from "sass:./state-button.scss";
import { createMemo, createSignal, splitProps } from "solid-js";
import {
  dataIf,
  isString,
  type MaybePromise,
  mountStyle,
} from "solid-tiny-utils";
import { SpinRing } from "../../spin";
import { Tooltip } from "../../tooltip";
import { Button, type ButtonProps } from "../basic-button";

export type StateButtonProps = {
  loading?: boolean;
  disabled?: boolean | string;
  onClick?: (e: MouseEvent) => MaybePromise<void>;
} & Omit<ButtonProps, "disabled" | "onClick" | "slot">;

export function StateButton(props: StateButtonProps) {
  mountStyle(css, "tiny-state-btn");

  const [local, others] = splitProps(props, [
    "loading",
    "disabled",
    "children",
    "onClick",
  ]);

  const [isHandling, setIsHandling] = createSignal(false);

  const handleClick = (e: MouseEvent) => {
    if (local.loading || isHandling()) {
      return;
    }

    const runClick = async (e: MouseEvent) => {
      setIsHandling(true);
      try {
        await local.onClick?.(e);
      } finally {
        setIsHandling(false);
      }
    };

    runClick(e);
  };

  const loading = createMemo(() => {
    return local.loading || isHandling();
  });

  return (
    <Tooltip
      content={typeof local.disabled === "string" ? local.disabled : ""}
      disabled={!(local.disabled && isString(local.disabled))}
    >
      <div class="tiny-state-btn" data-loading={dataIf(loading())}>
        <Button
          {...others}
          disabled={!!local.disabled}
          onClick={handleClick}
          slot={{
            root: (
              <div class="tiny-state-btn__loader">
                <SpinRing color="currentColor" size={18} />
              </div>
            ),
          }}
        >
          {props.children}
        </Button>
      </div>
    </Tooltip>
  );
}
