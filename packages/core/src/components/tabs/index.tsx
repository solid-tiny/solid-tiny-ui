import css from "sass:./tabs.scss";
import { createMemo, createSignal, For, type JSX } from "solid-js";
import {
  combineClass,
  combineStyle,
  dataIf,
  mountStyle,
} from "solid-tiny-utils";
import { AnimatedGroup } from "../../primitives/animated-group";
import { createClassStyles } from "../../utils";
import type { ClassNames, Styles } from "../../utils/types";

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
  classNames?: ClassNames<
    "root" | "header" | "tab" | "content" | "item",
    {
      activeKey: string;
    }
  >;
  styles?: Styles<
    "root" | "header" | "tab" | "content" | "item",
    {
      activeKey: string;
    }
  >;
}

export function Tabs(props: TabsProps) {
  mountStyle(css, "tiny-tabs");

  const [dir, setDir] = createSignal<"left" | "right" | null>(null);
  const [prev, setPrev] = createSignal<string>("");

  const [classes, styles] = createClassStyles(
    () => props.classNames,
    () => props.styles,
    () => ({
      activeKey: props.activeKey,
    })
  );

  return (
    <AnimatedGroup activeKey={props.activeKey} onChange={props.onChange}>
      {(state, actions) => {
        return (
          <div
            class={combineClass("tiny-tabs", classes().root)}
            style={combineStyle({}, styles().root)}
          >
            <div
              class={combineClass("tiny-tabs__header", classes().header)}
              style={combineStyle({}, styles().header)}
            >
              <For each={props.items}>
                {(item) => (
                  <button
                    class={combineClass("tiny-tabs__tab", classes().tab)}
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
                    style={combineStyle({}, styles().tab)}
                    type="button"
                  >
                    {item.label ?? item.key}
                  </button>
                )}
              </For>
            </div>
            <div
              class={combineClass("tiny-tabs__content", classes().content)}
              style={combineStyle({}, styles().content)}
            >
              <For each={props.items}>
                {(item) => (
                  <AnimatedGroup.Panel
                    class={combineClass("tiny-tabs__item", classes().item)}
                    data-dir={dir() || undefined}
                    key={item.key}
                    style={combineStyle({}, styles().item)}
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
