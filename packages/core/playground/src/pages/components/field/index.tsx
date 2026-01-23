import { Show } from "solid-js";
import { createStore } from "solid-js/store";
import { list } from "solid-tiny-utils";
import { Combobox, Field, Flex, Switcher } from "~";
import { PlayIt } from "~play/components/play-it";

export default function FieldPage() {
  const [params, setParams] = createStore({
    required: false,
    vertical: true,
  });

  return (
    <PlayIt onChange={setParams} properties={params}>
      <Show when={params.vertical}>
        <Field>
          <Field.Title>
            Select Item <Field.RequiredIndicator show={params.required} />
          </Field.Title>
          <Combobox
            options={list(20).map((v) => ({
              label: `Option ${v + 1}`,
              value: v + 1,
              disabled: (v + 1) % 4 === 0,
            }))}
            placeholder="select some ..."
            styles={{
              trigger: {
                width: "125px",
              },
            }}
          />
          <Field.Description>
            Please select one item from the dropdown list.
          </Field.Description>
        </Field>
      </Show>

      <Show when={!params.vertical}>
        <Field orientation="horizontal">
          {(state) => (
            <>
              <Field.Title for={state.uniqueId} vertical>
                <Flex gap="sm">
                  Enabled <Field.RequiredIndicator show={params.required} />
                </Flex>
                <Field.Description>
                  Please click the switcher to enable the feature.
                </Field.Description>
              </Field.Title>

              <Switcher id={state.uniqueId} />
            </>
          )}
        </Field>
      </Show>
    </PlayIt>
  );
}
