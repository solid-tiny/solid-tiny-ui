import css from "sass:./modal-helper.scss";
import { Ref } from "@solid-primitives/refs";
import { onMount, Show, splitProps } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import {
  combineClass,
  combineStyle,
  makeEventListener,
  mountStyle,
} from "solid-tiny-utils";
import { CloseLine } from "../../icons/close-line";
import { Flex } from "../../layout";
import { ModalCore } from "../../primitives";

function Root(props: Parameters<typeof Flex>[0]) {
  mountStyle(css, "tiny-modal-helper");
  const [local, others] = splitProps(props, ["class"]);
  return (
    <Flex
      vertical
      {...others}
      class={combineClass("tiny-modal-helper-vars", local.class)}
    />
  );
}

function Header(props: { title: string; closable?: boolean }) {
  return (
    <div class="tiny-modal__header">
      {props.title}
      <Show when={props.closable}>
        <Close>
          <button class="tiny-modal__header-close" type="button">
            <CloseLine />
          </button>
        </Close>
      </Show>
    </div>
  );
}

function Body(props: { children: JSX.Element }) {
  return <div class="tiny-modal__body">{props.children}</div>;
}

function Footer(props: Parameters<typeof Flex>[0]) {
  const [local, others] = splitProps(props, [
    "gap",
    "justify",
    "align",
    "class",
    "style",
  ]);
  return (
    <Flex
      {...others}
      align={local.align ?? "center"}
      class={combineClass("tiny-modal__footer", local.class)}
      gap={local.gap ?? "sm"}
      justify={local.justify ?? "flex-end"}
      style={combineStyle({}, local.style)}
    />
  );
}

function Close(props: { children: JSX.Element }) {
  const [, actions] = ModalCore.useContext();

  let ref!: HTMLElement;

  onMount(() => {
    makeEventListener(ref, "click", () => {
      actions.setState("open", false);
    });
  });

  return <Ref ref={ref}>{props.children}</Ref>;
}

export const ModalHelper = Object.assign(Root, {
  Header,
  Body,
  Footer,
  Close,
});
