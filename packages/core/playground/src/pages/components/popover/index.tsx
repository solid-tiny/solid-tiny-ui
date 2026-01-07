import { createStore } from "solid-js/store";
import { Button, Popover } from "~";
import { PlayIt } from "../../../components/play-it";

export default function TabsPage() {
  const [params, setParams] = createStore({
    trigger: "click" as const,
    placement: "bottom" as const,
    disabled: false,
    overflow: false,
  });

  return (
    <div>
      <PlayIt
        onChange={setParams}
        properties={params}
        typeDeclaration={{
          trigger: ["click", "hover"],
          placement: [
            "top",
            "right",
            "bottom",
            "left",
            "top-start",
            "top-end",
            "right-start",
            "right-end",
            "bottom-start",
            "bottom-end",
            "left-start",
            "left-end",
          ],
        }}
      >
        <div style={{ width: params.overflow ? "200vw" : "auto" }}>
          <Popover
            disabled={params.disabled}
            placement={params.placement}
            trigger={params.trigger}
          >
            <Popover.Trigger>
              <Button>Open Popover</Button>
            </Popover.Trigger>
            <Popover.Content>This is popover content</Popover.Content>
          </Popover>
        </div>
      </PlayIt>
    </div>
  );
}
