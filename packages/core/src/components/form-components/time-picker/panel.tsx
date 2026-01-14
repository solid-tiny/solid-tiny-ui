import { createMemo, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { createWatch, list } from "solid-tiny-utils";
import { CheckLine, CloseLine } from "../../../icons";
import { FakeScrollListCore } from "../../../primitives";

function CommonTimeList(props: {
  items: number[];
  itemHeight: number;
  inViewItem: number;
  onChange: (value: number) => void;
}) {
  return (
    <FakeScrollListCore
      inViewIndex={props.inViewItem}
      itemHeight={props.itemHeight}
      items={props.items.map((v) => v.toString().padStart(2, "0"))}
      onInViewIndexChange={(i) => {
        props.onChange(i);
      }}
      visibleItemsCount={7}
    >
      <FakeScrollListCore.Listbox>
        {(label, key) => (
          <FakeScrollListCore.Item
            class="tiny-time-picker__listbox-item"
            key={key}
          >
            {label}
          </FakeScrollListCore.Item>
        )}
      </FakeScrollListCore.Listbox>
    </FakeScrollListCore>
  );
}

function HourList(props: {
  itemHeight: number;
  hour: number;
  onChange: (hour: number) => void;
}) {
  return (
    <CommonTimeList
      inViewItem={props.hour}
      itemHeight={props.itemHeight}
      items={list(0, 23)}
      onChange={(hour) => {
        props.onChange(hour);
      }}
    />
  );
}

function MinuteList(props: {
  itemHeight: number;
  minute: number;
  onChange: (minute: number) => void;
}) {
  return (
    <CommonTimeList
      inViewItem={props.minute}
      itemHeight={props.itemHeight}
      items={list(0, 59)}
      onChange={(minute) => {
        props.onChange(minute);
      }}
    />
  );
}

function SecondList(props: {
  itemHeight: number;
  second: number;
  onChange: (second: number) => void;
}) {
  return (
    <CommonTimeList
      inViewItem={props.second}
      itemHeight={props.itemHeight}
      items={list(0, 59)}
      onChange={(second) => {
        props.onChange(second);
      }}
    />
  );
}

export function TimePanel(props: {
  itemHeight: number;
  width: number;
  type: "hour" | "minute" | "second";
  hour: number;
  minute: number;
  second: number;
  onConfirm: (hour: number, minute: number, second: number) => void;
  onCancel: (hour: number, minute: number, second: number) => void;
  onChange: (hour: number, minute: number, second: number) => void;
}) {
  const [time, setTime] = createStore({
    hour: 0,
    minute: 0,
    second: 0,
  });

  createWatch(
    () => [props.hour, props.minute, props.second],
    ([hour, minute, second]) => {
      setTime({ hour, minute, second });
    }
  );

  createWatch(
    () => [time.hour, time.minute, time.second],
    ([hour, minute, second]) => {
      if (
        hour === props.hour &&
        minute === props.minute &&
        second === props.second
      ) {
        return;
      }
      props.onChange(hour, minute, second);
    }
  );

  const typeIndex = createMemo(() => {
    return ["hour", "minute", "second"].indexOf(props.type);
  });

  return (
    <div
      style={{
        width: `${props.width}px`,
        display: "flex",
        "flex-direction": "column",
        position: "relative",
      }}
    >
      <div
        class="tiny-time-picker__thumb"
        style={{
          "--tiny-time-picker-thumb-height": `${props.itemHeight}px`,
          "--tiny-time-picker-thumb-top": `${(props.itemHeight * 7) / 2 - props.itemHeight / 2}px`,
        }}
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          position: "relative",
        }}
      >
        <HourList
          hour={time.hour}
          itemHeight={props.itemHeight}
          onChange={(hour) => setTime("hour", hour)}
        />
        <Show when={typeIndex() > 0}>
          <MinuteList
            itemHeight={props.itemHeight}
            minute={time.minute}
            onChange={(minute) => setTime("minute", minute)}
          />
        </Show>
        <Show when={typeIndex() > 1}>
          <SecondList
            itemHeight={props.itemHeight}
            onChange={(second) => setTime("second", second)}
            second={time.second}
          />
        </Show>
      </div>
      <div class="tiny-time-picker__action">
        <button
          onClick={() => {
            props.onCancel(time.hour, time.minute, time.second);
          }}
          type="button"
        >
          <CloseLine />
        </button>
        <button
          onClick={() => {
            props.onConfirm(time.hour, time.minute, time.second);
          }}
          type="button"
        >
          <CheckLine />
        </button>
      </div>
    </div>
  );
}
