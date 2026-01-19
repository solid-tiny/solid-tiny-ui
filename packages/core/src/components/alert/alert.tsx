import css from "sass:./alert.scss";
import { children, createMemo, type JSX, Match, Show, Switch } from "solid-js";
import {
  combineClass,
  mountStyle,
} from "solid-tiny-utils";
import {
  IconCheckboxCircleLine,
  CloseLine,
  IconErrorWarningLine,
  InformationLine,
} from "../../icons";
import { createClassStyles } from "../../utils";
import type { ClassNames, Styles } from "../../utils/types";

export type AlertStatus = "success" | "error" | "warning" | "info";
export type AlertVariant = "subtle" | "solid" | "left-accent" | "top-accent";

export interface AlertState {
  status: AlertStatus;
  variant: AlertVariant;
}

function AlertIcon(props: { status: AlertStatus }) {
  return (
    <div class="tiny-alert__icon">
      <Switch>
        <Match when={props.status === "info"}>
          <InformationLine size="20px" />
        </Match>
        <Match when={props.status === "success"}>
          <IconCheckboxCircleLine size="20px" />
        </Match>
        <Match when={props.status === "error" || props.status === "warning"}>
          <IconErrorWarningLine size="20px" />
        </Match>
      </Switch>
    </div>
  );
}

export function Alert(props: {
  status?: AlertStatus;
  variant?: AlertVariant;
  title?: JSX.Element;
  description?: JSX.Element;
  children?: JSX.Element;
  icon?: JSX.Element;
  showIcon?: boolean;
  closable?: boolean;
  onClose?: () => void;
  classNames?: ClassNames<
    "root" | "icon" | "content" | "title" | "description" | "close",
    AlertState
  >;
  styles?: Styles<
    "root" | "icon" | "content" | "title" | "description" | "close",
    AlertState
  >;
}) {
  mountStyle(css, "tiny-alert");

  const status = () => props.status ?? "info";
  const variant = () => props.variant ?? "subtle";
  const showIcon = () => props.showIcon ?? true;

  const [classes, styles] = createClassStyles(
    () => props.classNames,
    () => props.styles,
    () => ({
      status: status(),
      variant: variant(),
    })
  );

  const resolvedIcon = children(() => props.icon);
  const resolvedTitle = children(() => props.title);
  const resolvedDescription = children(() => props.description);
  const resolvedChildren = children(() => props.children);

  const hasContent = createMemo(() => {
    return (
      resolvedTitle() || resolvedDescription() || resolvedChildren()
    );
  });

  return (
    <div
      class={combineClass("tiny-alert", classes().root)}
      data-status={status()}
      data-variant={variant()}
      role="alert"
      style={styles().root}
    >
      <Show when={showIcon()}>
        <div
          class={combineClass("tiny-alert__icon", classes().icon)}
          style={styles().icon}
        >
          {resolvedIcon() || <AlertIcon status={status()} />}
        </div>
      </Show>

      <Show when={hasContent()}>
        <div
          class={combineClass("tiny-alert__content", classes().content)}
          style={styles().content}
        >
          <Show when={resolvedTitle()}>
            <div
              class={combineClass("tiny-alert__title", classes().title)}
              style={styles().title}
            >
              {resolvedTitle()}
            </div>
          </Show>
          <Show when={resolvedDescription()}>
            <div
              class={combineClass("tiny-alert__description", classes().description)}
              style={styles().description}
            >
              {resolvedDescription()}
            </div>
          </Show>
          <Show when={resolvedChildren()}>
            {resolvedChildren()}
          </Show>
        </div>
      </Show>

      <Show when={props.closable}>
        <button
          aria-label="Close alert"
          class={combineClass("tiny-alert__close", classes().close)}
          onClick={props.onClose}
          style={styles().close}
          type="button"
        >
          <CloseLine size="16px" />
        </button>
      </Show>
    </div>
  );
}
