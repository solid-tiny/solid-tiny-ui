import { createUniqueId } from "solid-js";
import {
  callMaybeCallableChild,
  createPresence,
  createWatch,
  type MaybeCallableChild,
  mountStyle,
} from "solid-tiny-utils";
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

  const [shouldMount, presenceState] = createPresence({
    show: () => state.open,
    element: () => state.refContent || undefined,
  });

  staticData.shouldMount = shouldMount;
  staticData.presenceState = presenceState;

  createWatch(
    () => [shouldMount()],
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
