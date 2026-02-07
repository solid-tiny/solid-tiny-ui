/** biome-ignore-all lint/complexity/noBannedTypes: I need Function */
import css from "sass:./combobox.scss";
import { createMemo, createSignal, For } from "solid-js";
import {
  combineClass,
  combineStyle,
  createWatch,
  dataIf,
  mountStyle,
} from "solid-tiny-utils";
import { ArrowDownSLine } from "../../../icons";
import { Listbox } from "../../../primitives/listbox";
import { createClassStyles } from "../../../utils";
import type { ClassNames, Styles } from "../../../utils/types";
import { Popover } from "../../popover";
import { ReInput } from "../../reset";

export interface ComboboxProps<
  T extends {
    label: string;
    value: unknown;
    disabled?: boolean;
  },
> {
  value?: T["value"];
  onChange?: (value: T["value"]) => void;
  options: T[];
  classNames?: ClassNames<
    "trigger" | "popoverContent" | "options" | "option" | "suffix",
    {}
  >;
  styles?: Styles<
    "trigger" | "popoverContent" | "options" | "option" | "suffix",
    {}
  >;
  placeholder?: string;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  id?: string;
  name?: string;
}

export function Combobox<
  T extends {
    label: string;
    value: unknown;
    disabled?: boolean;
  },
>(props: ComboboxProps<T>) {
  mountStyle(css, "tiny-combobox");

  const [value, setValue] = createSignal<T["value"] | undefined>(props.value);

  const label = createMemo(() => {
    const found = props.options.find((option) => option.value === value());
    return found ? found.label : "";
  });

  createWatch(
    () => props.value,
    (v) => {
      setValue(() => v);
    },
    { defer: true }
  );

  const [classes, styles] = createClassStyles(
    () => props.classNames,
    () => props.styles,
    () => ({})
  );

  return (
    <Popover placement="bottom" trigger="click">
      {(state, acts) => (
        <>
          <Popover.Trigger>
            <div
              class={combineClass("tiny-combobox__trigger", classes().trigger)}
              data-disabled={dataIf(props.disabled ?? false)}
              data-open={dataIf(state.open)}
              data-size={props.size ?? "medium"}
              style={combineStyle({}, styles().trigger)}
            >
              <ReInput
                aria-expanded={state.open}
                autocomplete="off"
                id={props.id}
                name={props.name}
                placeholder={props.placeholder}
                readonly
                role="combobox"
                style={{ height: "100%", width: "100%" }}
                tabIndex={-1}
                type="search"
                value={label()}
              />
              <div
                class="tiny-combobox__suffix"
                style={combineStyle({}, styles().suffix)}
              >
                <ArrowDownSLine />
              </div>
            </div>
          </Popover.Trigger>
          <Popover.Content
            class={combineClass("", classes().popoverContent)}
            style={combineStyle(
              {
                padding: 0,
                overflow: "hidden",
              },
              styles().popoverContent
            )}
          >
            <Listbox
              autofocus
              class={combineClass(
                "tiny-combobox__options tiny-combobox-vars",
                classes().options
              )}
              style={combineStyle(
                {
                  "--tiny-combobox-trigger-width": `${state.refTrigger?.offsetWidth}px`,
                },
                styles().options
              )}
            >
              <For each={props.options}>
                {(option) => (
                  <Listbox.Item
                    class={combineClass(
                      "tiny-combobox__option",
                      classes().option
                    )}
                    data-selected={dataIf(option.value === value())}
                    disabled={option.disabled}
                    focus={option.value === value()}
                    onClick={() => {
                      props.onChange?.(option.value);
                      setValue(option.value);
                      acts.setOpen(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        props.onChange?.(option.value);
                        setValue(option.value);
                        acts.setOpen(false);
                      }
                    }}
                    style={combineStyle({}, styles().option)}
                  >
                    {option.label}
                  </Listbox.Item>
                )}
              </For>
            </Listbox>
          </Popover.Content>
        </>
      )}
    </Popover>
  );
}
