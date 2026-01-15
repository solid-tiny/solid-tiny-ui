import { createMemo } from "solid-js";
import { Button, Flex, useToaster } from "~";
import { PlayIt } from "~play/components/play-it";
import type { Toast } from "../../../../../src/components/toaster/type";

function ToastButton(props: {
  position?: Toast["position"];
  type?: Toast["type"];
}) {
  const toast = useToaster();

  const label = createMemo(() => {
    if (props.type && props.position) {
      return `${props.type} - ${props.position}`;
    }
    return props.type || props.position || "Show Toast";
  });

  return (
    <Button
      onClick={() => {
        toast[props.type || "blank"]("This is a toast message!", {
          position: props.position,
        });
      }}
    >
      {label()}
    </Button>
  );
}

export default function ToasterPage() {
  return (
    <PlayIt properties={{}}>
      <Flex gap={"sm"} wrap>
        <ToastButton />
        <ToastButton type="success" />
        <ToastButton type="error" />
        <ToastButton type="warning" />
        <ToastButton type="info" />
        <ToastButton position="top-left" />
        <ToastButton position="top-center" />
        <ToastButton position="top-right" />
        <ToastButton position="bottom-left" />
        <ToastButton position="bottom-center" />
        <ToastButton position="bottom-right" />
        <ToastButton position="bottom-right" type="success" />
        <ToastButton position="bottom-left" type="error" />
        <ToastButton position="top-left" type="warning" />
      </Flex>
    </PlayIt>
  );
}
