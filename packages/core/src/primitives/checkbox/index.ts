import { context } from "./context";
import { Input, Label } from "./parts";
import { Root } from "./root";

export const CheckboxCore = Object.assign(Root, {
  Input,
  Label,
  useContext: context.useContext,
});
