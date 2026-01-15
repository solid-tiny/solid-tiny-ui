import css from "sass:./spin.scss";
import {
  children,
  createMemo,
  createSignal,
  type JSX,
  onCleanup,
  Show,
} from "solid-js";
import {
  combineClass,
  createPresence,
  createWatch,
  dataIf,
  mountStyle,
} from "solid-tiny-utils";
import { makeClassNames, makeStyles } from "../../utils";
import { getAnimationDurationMs } from "../../utils/duration";
import type { ClassNames, Styles } from "../../utils/types";
import { SpinRing } from "./spin-ring";

export function Spin(props: {
  spinning?: boolean;
  children: JSX.Element;
  classNames?: ClassNames<"root" | "content" | "loader", { spinning: boolean }>;
  styles?: Styles<"root" | "content" | "loader", { spinning: boolean }>;
  indicator?: JSX.Element;
  delay?: number;
}) {
  mountStyle(css, "tiny-spin");
  const [spinning, setSpinning] = createSignal(false);
  let timeout: ReturnType<typeof setTimeout> | undefined;

  onCleanup(() => {
    clearTimeout(timeout);
  });

  createWatch(
    () => props.spinning,
    (v) => {
      clearTimeout(timeout);
      const delay = props.delay ?? 150;
      if (delay > 0) {
        if (v) {
          timeout = setTimeout(() => {
            setSpinning(true);
          }, delay);
        } else {
          setSpinning(false);
        }
      } else {
        setSpinning(!!v);
      }
    }
  );

  const classes = createMemo(() => {
    return makeClassNames(props.classNames, {
      spinning: spinning(),
    });
  });

  const styles = createMemo(() => {
    return makeStyles(props.styles, {
      spinning: spinning(),
    });
  });

  const resolvedIndicator = children(() => props.indicator);

  const [refLoader, setRefLoader] = createSignal<HTMLElement>();
  const presence = createPresence(spinning, {
    enterDuration: () => getAnimationDurationMs(refLoader()),
    exitDuration: () => getAnimationDurationMs(refLoader()),
  });
  return (
    <div
      aria-busy={spinning()}
      class={combineClass("tiny-spin", classes().root)}
      data-spinning={dataIf(spinning())}
      style={styles().root}
    >
      <div
        class={combineClass("tiny-spin__content", classes().content)}
        style={styles().content}
      >
        {props.children}
      </div>
      <Show when={presence.isMounted()}>
        <div
          class={combineClass("tiny-spin__loader", classes().loader)}
          data-entering={dataIf(
            ["entering", "pre-enter"].includes(presence.phase())
          )}
          data-exiting={dataIf(["exiting"].includes(presence.phase()))}
          ref={setRefLoader}
          style={styles().loader}
        >
          <Show fallback={<SpinRing />} when={resolvedIndicator()}>
            {resolvedIndicator()}
          </Show>
        </div>
      </Show>
    </div>
  );
}
