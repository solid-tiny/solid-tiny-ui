import { createComponentState } from "solid-tiny-context";

export const context = createComponentState({
  state: () => ({
    selectValues: [] as unknown[],
    name: "",
    disabled: false,
  }),
  methods: {
    toggleValue(value: unknown, checked: boolean) {
      const { state, actions } = this;
      const currentValues = state.selectValues;
      let newValues: unknown[];
      if (checked) {
        newValues = [...currentValues, value];
      } else {
        newValues = currentValues.filter((v) => v !== value);
      }
      actions.setState({ selectValues: newValues });
    },
  },
});
