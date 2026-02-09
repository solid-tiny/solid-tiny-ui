import { createSignal, Match, Show, Switch } from "solid-js";
import { callMaybeCallableChild, createWatch } from "solid-tiny-utils";
import {
  CloseLine,
  IconCheckboxCircleLine,
  IconErrorWarningLine,
  IconLoading,
  InformationLine,
} from "../../icons";
import { Flex } from "../../layout";
import { Button } from "../button";
import { Modal, ModalHelper } from "../modal";
import { context } from "./context";
import type { Dialog, DialogCallbackParams, DialogType } from "./type";

function Header(props: { title: string; type: DialogType; closable: boolean }) {
  return (
    <Flex align="center">
      <Switch>
        <Match when={props.type === "info"}>
          <InformationLine size="20px" />
        </Match>
        <Match when={props.type === "success"}>
          <IconCheckboxCircleLine size="20px" />
        </Match>
        <Match when={props.type === "error" || props.type === "warning"}>
          <IconErrorWarningLine size="20px" />
        </Match>
        <Match when={props.type === "loading"}>
          <IconLoading size="20px" />
        </Match>
      </Switch>
      <Show when={props.closable}>
        <ModalHelper.Close>
          <Button icon={<CloseLine />} variant="text" />
        </ModalHelper.Close>
      </Show>
    </Flex>
  );
}

export function OneDialog(props: Dialog) {
  const [state, actions] = context.useContext();
  const [open, setOpen] = createSignal(false);

  const callbackParams = (): DialogCallbackParams => ({ id: props.id });

  createWatch(
    () => state.dismissSignal[props.id],
    (isDismissed) => {
      setOpen(!isDismissed);
    }
  );

  return (
    <Modal
      onPhaseChange={(phase) => {
        if (phase === "exited") {
          actions.removeDialog(props.id);
        }
      }}
      open={open()}
    >
      <Modal.Content width={props.width}>
        <Flex vertical>
          <Header
            closable={props.closable ?? true}
            title={props.type}
            type={props.type}
          />
          <Flex>{callMaybeCallableChild(props.content, callbackParams())}</Flex>
          <Flex gap="sm" justify="end">
            <Button>取消</Button>
          </Flex>
        </Flex>
      </Modal.Content>
    </Modal>
  );
}
