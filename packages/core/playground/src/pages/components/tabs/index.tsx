import { createStore } from "solid-js/store";
import { list } from "solid-tiny-utils";
import { Tabs } from "~";
import { PlayIt } from "../../../components/play-it";

export default function TabsPage() {
  const [params, setParams] = createStore({});
  return (
    <div>
      <PlayIt onChange={setParams} properties={params}>
        <Tabs
          activeKey="1"
          items={list(3).map((v) => ({
            label: `tab ${v}`,
            key: `${v}`,
            content: `value is ${v}`,
          }))}
        />
      </PlayIt>
    </div>
  );
}
