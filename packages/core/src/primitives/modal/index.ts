import { Content, ContentWrapper } from "./content";
import { context } from "./context";
import { Mask } from "./mask";
import { Portal } from "./portal";
import { Root } from "./root";
import { Trigger } from "./trigger";

export const ModalCore = Object.assign(Root, {
  Trigger,
  Portal,
  ContentWrapper,
  Content,
  Mask,
  useContext: context.useContext,
});
