import { createStore } from "solid-js/store";
import { Pagination } from "~";
import { PlayIt } from "~play/components/play-it";

export default function PaginationPage() {
  const [params, setParams] = createStore({
    current: 1,
    total: 100,
    pageSize: 10,
    disabled: false,
    dense: false,
    maxVisiblePages: 7,
    size: "middle" as "small" | "middle" | "large",
  });

  return (
    <PlayIt
      onChange={setParams}
      properties={params}
      typeDeclaration={{
        size: ["small", "middle", "large"],
      }}
    >
      <Pagination
        current={params.current}
        dense={params.dense}
        disabled={params.disabled}
        maxVisiblePages={params.maxVisiblePages}
        onChange={(page) => setParams("current", page)}
        pageSize={params.pageSize}
        size={params.size}
        total={params.total}
      />
    </PlayIt>
  );
}
