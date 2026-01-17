import css from "sass:./drawer.scss";
import { createMemo, type JSX } from "solid-js";
import {
  combineClass,
  combineStyle,
  dataIf,
  mountStyle,
} from "solid-tiny-utils";
import { ModalCore } from "../../primitives/modal";
import { createClassStyles } from "../../utils";
import type { ClassNames, Styles } from "../../utils/types";

function Root(props: Parameters<typeof ModalCore>[0]) {
  return <ModalCore {...props} />;
}

function Content(props: {
  children: JSX.Element;
  placement?: "left" | "right" | "top" | "bottom";
  width?: string;
  height?: string;
  classNames?: ClassNames<"mask" | "wrapper" | "content">;
  styles?: Styles<"mask" | "wrapper" | "content">;
}) {
  mountStyle(css, "tiny-drawer");
  const [, , { presencePhase }] = ModalCore.useContext();
  const [classes, styles] = createClassStyles(
    () => props.classNames,
    () => props.styles
  );

  const placement = () => props.placement || "right";

  const isEntering = createMemo(() =>
    ["pre-enter", "entering"].includes(presencePhase())
  );
  const isExiting = createMemo(() => ["exiting"].includes(presencePhase()));

  const getSize = () => {
    const isHorizontal = placement() === "left" || placement() === "right";
    if (isHorizontal) {
      return {
        width: props.width || "378px",
        height: "100%",
      };
    }
    return {
      width: "100%",
      height: props.height || "378px",
    };
  };

  return (
    <ModalCore.Portal>
      <ModalCore.Mask
        class={combineClass("tiny-drawer__mask", classes().mask)}
        data-entering={dataIf(isEntering())}
        data-exiting={dataIf(isExiting())}
        style={styles().mask}
      />
      <ModalCore.ContentWrapper
        class={combineClass(
          "tiny-drawer__wrapper tiny-drawer-vars",
          classes().wrapper
        )}
        style={combineStyle({}, styles().wrapper)}
      >
        <ModalCore.Content
          class={combineClass("tiny-drawer__content", classes().content)}
          data-entering={dataIf(isEntering())}
          data-exiting={dataIf(isExiting())}
          data-placement={placement()}
          style={combineStyle(getSize(), styles().content)}
        >
          {props.children}
        </ModalCore.Content>
      </ModalCore.ContentWrapper>
    </ModalCore.Portal>
  );
}

export const Drawer = Object.assign(Root, {
  Trigger: ModalCore.Trigger,
  Content,
  useContext: ModalCore.useContext,
});

export { DrawerHelper } from "./helpers";
