import { createUniqueId } from "solid-js";
import {
  callMaybeCallableChild,
  createPresence,
  createWatch,
  type MaybeCallableChild,
  mountStyle,
  type PresencePhase,
} from "solid-tiny-utils";
import { getAnimationDurationMs } from "../../utils/duration";
import { context } from "./context";

export function Root(props: {
  children: MaybeCallableChild<ReturnType<typeof context.useContext>>;
  open?: boolean;
  onPhaseChange?: (phase: PresencePhase) => void;
  closeOnClickMask?: boolean;
  closeOnEsc?: boolean;
}) {
  const Context = context.initial({
    closeOnClickMask: () => props.closeOnClickMask,
    closeOnEsc: () => props.closeOnEsc,
    open: () => props.open,
  });
  const [state, _, staticData] = Context.value;

  const presence = createPresence(() => state.open, {
    enterDuration: () => getAnimationDurationMs(state.refContent),
    exitDuration: () => getAnimationDurationMs(state.refContent),
  });

  staticData.isMounted = presence.isMounted;
  staticData.presencePhase = presence.phase;

  if (props.onPhaseChange) {
    createWatch(
      () => presence.phase(),
      (phase) => {
        props.onPhaseChange?.(phase);
      },
      {
        defer: true,
      }
    );
  }

  const id = `ps__${createUniqueId()}`;

  createWatch(
    () => [presence.isMounted()],
    ([mounted]) => {
      if (mounted) {
        mountStyle("html body{overflow:hidden}", id);
      } else {
        const el = document.querySelector(`#${id}`);
        el?.remove();
      }
    }
  );

  return (
    <Context.Provider>
      {callMaybeCallableChild(props.children, ...Context.value)}
    </Context.Provider>
  );
}
