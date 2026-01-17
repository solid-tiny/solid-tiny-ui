import { createMemo } from "solid-js";
import { draw, sleep } from "solid-tiny-utils";
import { Button, Flex, useToaster } from "~";
import { PlayIt } from "~play/components/play-it";
import type { Toast } from "../../../../../src/components/toaster/type";

const msgs = [
  "This is a toast message!",
  "Halo!",
  "你好呀",
  "Solid Tiny UI is awesome!",
  "Tiny-toaster is a simple component of solid-tiny-ui. " +
    "It is easy to use and customize. You can show different types of toasts " +
    "with different positions. Enjoy using solid-tiny-ui!",
  "Here's a random fact: Honey never spoils. Archaeologists have found pots of honey " +
    "in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.",
  "你知道吗？章鱼有三个心脏，其中两个负责将血液泵送到鳃，" +
    "而第三个则将血液泵送到身体的其他部分。当章鱼游泳时，" +
    "负责身体的心脏会停止跳动，这就是为什么章鱼更喜欢爬行而不是游泳的原因。",
];

const randomMsg = () => {
  return draw(msgs) as string;
};

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
        toast[props.type || "blank"](randomMsg(), {
          position: props.position,
        });
      }}
    >
      {label()}
    </Button>
  );
}

export default function ToasterPage() {
  const toast = useToaster();
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
        <Button
          onClick={() => {
            toast(randomMsg(), {
              icon: "🚀",
            });
          }}
          variant="outline"
        >
          Custom Icon
        </Button>
        <Button
          color="primary"
          onClick={() => {
            toast(
              (t) => (
                <Flex gap="xs" vertical>
                  <strong>🚀 Fully Custom Toast 🚀</strong>
                  <span>This is toast ID: {t.id}</span>
                  <Button
                    color="primary"
                    onClick={() => toast.dismiss(t.id)}
                    size="small"
                    variant="link"
                  >
                    Dismiss
                  </Button>
                </Flex>
              ),
              { duration: 0 }
            );
          }}
        >
          Fully Custom Toast
        </Button>
        <Button
          color="link"
          onClick={() => {
            const id = toast.loading(randomMsg());
            setTimeout(() => {
              toast.update(id, {
                type: "success",
                message: "Loaded successfully!",
                duration: 2000,
              });
            }, 2000);
          }}
          variant="outline"
        >
          loading
        </Button>
        <Button
          onClick={() => {
            toast.promise(
              (async () => {
                await sleep(2000);
                if (Math.random() > 0.5) {
                  return `time is ${new Date().toLocaleTimeString()}`;
                }
                throw new Error("Failed to load");
              })(),
              {
                loading: () => "Loading...",
                success: ({ data }) => `Loaded successfully: ${data}`,
                error: ({ error }) => `Error: ${(error as Error).message}`,
              }
            );
          }}
        >
          promise
        </Button>
      </Flex>
    </PlayIt>
  );
}
