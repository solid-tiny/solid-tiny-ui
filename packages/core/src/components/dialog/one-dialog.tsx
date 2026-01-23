import { createSignal, onMount, Show } from "solid-js";
import {
  callMaybeCallableChild,
  createPresence,
  createWatch,
} from "solid-tiny-utils";
import { Modal, ModalHelper } from "../modal";
import { context } from "./context";
import type { Dialog, DialogCallbackParams } from "./type";

export function OneDialog(props: Dialog) {
  const [state, actions] = context.useContext();
  const [open, setOpen] = createSignal(state.openStates[props.id] ?? false);

  const callbackParams = (): DialogCallbackParams => ({ id: props.id });

  createWatch(
    () => state.openStates[props.id],
    (isOpen) => {
      if (isOpen !== undefined) {
        setOpen(isOpen);
      }
    }
  );

  const handleClose = () => {
    actions.closeDialog(props.id);
  };

  const presence = createPresence(open, {
    enterDuration: 250,
    exitDuration: 200,
    initialEnter: false,
  });

  onMount(() => {
    createWatch(presence.isMounted, (shouldMount) => {
      if (!shouldMount && !open()) {
        actions.removeDialog(props.id);
      }
    });
  });

  return (
    <Modal
      open={open()}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleClose();
        }
      }}
      maskClosable={props.maskClosable}
    >
      <Modal.Content width={props.width}>
        <ModalHelper>
          <Show when={props.title}>
            <ModalHelper.Header
              title={
                callMaybeCallableChild(props.title, callbackParams()) as string
              }
              closable={props.closable}
            />
          </Show>
          <ModalHelper.Body>
            {callMaybeCallableChild(props.content, callbackParams())}
          </ModalHelper.Body>
          <Show when={props.footer}>
            <ModalHelper.Footer>
              {callMaybeCallableChild(props.footer, callbackParams())}
            </ModalHelper.Footer>
          </Show>
        </ModalHelper>
      </Modal.Content>
    </Modal>
  );
}
