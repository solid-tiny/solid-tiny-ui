import { For, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { list } from "solid-tiny-utils";
import { Button, Drawer, DrawerHelper } from "~";
import { PlayIt } from "../../../components/play-it";

export default function DrawerPage() {
  const [params, setParams] = createStore({
    closeOnEsc: true,
    closeOnClickMask: true,
    closable: true,
    placement: "right" as "left" | "right" | "top" | "bottom",
    longContent: false,
  });

  return (
    <div>
      <PlayIt onChange={setParams} properties={params}>
        <Drawer
          closeOnClickMask={params.closeOnClickMask}
          closeOnEsc={params.closeOnEsc}
        >
          <Drawer.Trigger>
            <Button>Open Drawer</Button>
          </Drawer.Trigger>
          <Drawer.Content placement={params.placement}>
            <DrawerHelper>
              <DrawerHelper.Header
                closable={params.closable}
                title="Drawer title"
              />
              <DrawerHelper.Body>
                <Show
                  fallback={<p>This is drawer content</p>}
                  when={params.longContent}
                >
                  <div>
                    <For each={list(100)}>
                      {(item) => <p>{`This is line ${item}`}</p>}
                    </For>
                  </div>
                </Show>
              </DrawerHelper.Body>
              <DrawerHelper.Footer>
                <DrawerHelper.Close>
                  <Button>Cancel</Button>
                </DrawerHelper.Close>
                <Button variant="primary">Submit</Button>
              </DrawerHelper.Footer>
            </DrawerHelper>
          </Drawer.Content>
        </Drawer>
      </PlayIt>
    </div>
  );
}
