import { Entries } from "@solid-primitives/keyed";
import { createUniqueId, type JSX, Match, Switch } from "solid-js";
import type { SetStoreFunction } from "solid-js/store";
import { isArray } from "solid-tiny-utils";
import { Combobox, NumberInput, TextField } from "~";

export function PlayIt<
  T extends { [key: string]: string | number | boolean | (string | number)[] },
>(props: {
  children: JSX.Element;
  properties: T;
  onChange?: SetStoreFunction<T>;
  typeDeclaration?: Record<
    string,
    "string" | "number" | "boolean" | (string | number)[]
  >;
}) {
  const itType = (key: string) => {
    return props.typeDeclaration?.[key] || typeof props.properties[key];
  };

  const thisID = createUniqueId();

  const changeIt = (key: string, value: unknown) => {
    // biome-ignore lint/suspicious/noExplicitAny: The generic nature of this component makes it difficult to correctly type the arguments for the `SetStoreFunction`.
    props.onChange?.(key as any, value as any);
  };

  return (
    <div class="b b-t-border m-1 flex rounded-md p-1">
      <div
        class="flex w-[calc(100%-185px)] flex-1 flex-col justify-start overflow-auto px-4 py-20"
        style={{
          "background-image":
            "radial-gradient(circle, var(--tiny-c-neutral-3) 1px, transparent 1px)",
          "background-size": "16px 16px",
        }}
      >
        {props.children}
      </div>
      <div class="flex w-185px shrink-0 flex-col">
        <div class="b-b b-t-border p-2">Properties</div>
        <div>
          <Entries of={props.properties}>
            {(key, value) => (
              <div class="b-b b-t-border flex items-center justify-between p-2">
                <label class="mr-2" for={`${thisID}-${key}`}>
                  {key}
                </label>
                <Switch>
                  <Match when={itType(key) === "string"}>
                    <TextField
                      id={`${thisID}-${key}`}
                      onChange={(v) => changeIt(key, v)}
                      size="small"
                      value={value() as string}
                    />
                  </Match>
                  <Match when={itType(key) === "number"}>
                    <NumberInput
                      id={`${thisID}-${key}`}
                      onChange={(v) => changeIt(key, v)}
                      size="small"
                      value={value() as number}
                    />
                  </Match>
                  <Match when={itType(key) === "boolean"}>
                    <input
                      checked={value() as boolean}
                      id={`${thisID}-${key}`}
                      onChange={(e) => changeIt(key, e.currentTarget.checked)}
                      type="checkbox"
                    />
                  </Match>
                  <Match when={isArray(itType(key))}>
                    <Combobox
                      onChange={(v) => changeIt(key, v)}
                      options={(itType(key) as (string | number)[]).map(
                        (v) => ({
                          label: String(v),
                          value: v,
                        })
                      )}
                      size="small"
                      value={value() as string | number}
                    />
                  </Match>
                </Switch>
              </div>
            )}
          </Entries>
        </div>
      </div>
    </div>
  );
}
