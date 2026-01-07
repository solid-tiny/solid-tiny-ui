import css from "sass:./tabs.scss";
import { createSignal, For, type JSX } from "solid-js";
import { dataIf, mountStyle } from "solid-tiny-utils";
import { AnimatedGroup } from "../../primitives/animated-group";

export interface TabItem {
  /**
   * Unique key for the tab item
   */
  key: string;
  /**
   * Label for the tab item
   * Optional, If not provided, the tab will use key as label
   */
  label?: JSX.Element;
  content: JSX.Element;
}

export interface TabsProps {
  items: TabItem[];
  activeKey: string;
  onChange?: (key: string) => void;
}

export function Tabs(props: TabsProps) {
  mountStyle(css, "tiny-tabs");

  const [dir, setDir] = createSignal<"left" | "right" | null>(null);
  const [prev, setPrev] = createSignal<string>("");

  return (
    <AnimatedGroup activeKey={props.activeKey} onChange={props.onChange}>
      {(state, actions) => {
        return (
          <div class="tiny-tabs">
            <div class="tiny-tabs__header">
              <For each={props.items}>
                {(item) => (
                  <button
                    class="tiny-tabs__tab"
                    data-active={dataIf(state.active === item.key)}
                    data-dir={dir() || undefined}
                    data-prev={dataIf(
                      prev() === item.key && state.active !== item.key
                    )}
                    onClick={() => {
                      if (state.active === item.key) {
                        return;
                      }

                      const prevIndex = props.items.findIndex(
                        (i) => i.key === state.active
                      );
                      const itemIndex = props.items.findIndex(
                        (i) => i.key === item.key
                      );
                      setDir(itemIndex > prevIndex ? "right" : "left");
                      setPrev(state.active);
                      actions.setState("active", item.key);
                    }}
                    type="button"
                  >
                    {item.label ?? item.key}
                  </button>
                )}
              </For>
            </div>
            <div class="tiny-tabs__content">
              <For each={props.items}>
                {(item) => (
                  <AnimatedGroup.Panel
                    class="tiny-tabs__item"
                    data-dir={dir() || undefined}
                    key={item.key}
                  >
                    {item.content}
                  </AnimatedGroup.Panel>
                )}
              </For>
            </div>
          </div>
        );
      }}
    </AnimatedGroup>
  );
}
