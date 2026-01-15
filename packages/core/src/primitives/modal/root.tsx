import { createUniqueId } from "solid-js";
import {
  callMaybeCallableChild,
  createPresence,
  createWatch,
  type MaybeCallableChild,
  mountStyle,
} from "solid-tiny-utils";
import { getAnimationDurationMs } from "../../utils/duration";
import { context } from "./context";

export function Root(props: {
  children: MaybeCallableChild<ReturnType<typeof context.useContext>>;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  preventScroll?: boolean;
  closeOnClickMask?: boolean;
  closeOnEsc?: boolean;
}) {
  const Context = context.initial({
    id: () => `tiny-modal_${createUniqueId()}`,
    preventScroll: () => props.preventScroll,
    closeOnClickMask: () => props.closeOnClickMask,
    closeOnEsc: () => props.closeOnEsc,
    open: () => props.open,
  });
  const [state, _, staticData] = Context.value;

  const presence = createPresence(() => state.open, {
    enterDuration: () => getAnimationDurationMs(state.refContent),
    exitDuration: () => getAnimationDurationMs(state.refContent),
  });

  staticData.isMount = presence.isMounted;
  staticData.presencePhase = presence.phase;

  createWatch(
    () => [presence.isMounted()],
    (mounted) => {
      if (mounted) {
        mountStyle("html body{overflow:hidden}", state.id);
      } else {
        const el = document.querySelector(`#${state.id}`);
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
