import css from "sass:./time-picker.scss";
import { mountStyle, noop } from "solid-tiny-utils";
import { getHours, getMinutes, getSeconds } from "time-core";
import { Popover } from "../popover";
import { TimePanel } from "./panel";
import { TimeTrigger } from "./trigger";

export function TimePicker(props: {
  type?: "hour" | "minute" | "second";
  size?: "small" | "medium" | "large";
  hour?: number | null;
  minute?: number | null;
  second?: number | null;
  onChange?: (time: {
    hour: number | null;
    minute: number | null;
    second: number | null;
  }) => void;
  disabled?: boolean;
}) {
  mountStyle(css, "tiny-time-picker");
  return (
    <Popover
      disabled={props.disabled}
      floatingOption={{
        offset: ({ rects }) => {
          return -rects.reference.height * 4;
        },
        flip: false,
        shift: {
          crossAxis: true,
        },
      }}
      placement="bottom"
      trigger="click"
    >
      {(state, actions) => (
        <>
          <Popover.Trigger>
            <TimeTrigger
              disabled={props.disabled ?? false}
              hour={props.hour ?? null}
              minute={props.minute ?? null}
              second={props.second ?? null}
              size={props.size ?? "medium"}
              type={props.type ?? "hour"}
            />
          </Popover.Trigger>
          <Popover.Content class="tiny-time-picker-popover tiny-time-picker-popover-vars">
            <TimePanel
              hour={props.hour || getHours(Date.now())}
              itemHeight={state.refTrigger?.clientHeight || 32}
              minute={props.minute || getMinutes(Date.now())}
              onCancel={() => {
                actions.setOpen(false);
              }}
              onChange={noop}
              onConfirm={(hour, minute, second) => {
                props.onChange?.({
                  hour,
                  minute,
                  second,
                });
                actions.setOpen(false);
              }}
              second={props.second || getSeconds(Date.now())}
              type={props.type || "hour"}
              width={state.refTrigger?.clientWidth || 128}
            />
          </Popover.Content>
        </>
      )}
    </Popover>
  );
}
