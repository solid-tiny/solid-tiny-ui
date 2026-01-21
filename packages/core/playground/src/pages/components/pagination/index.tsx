import { createStore } from "solid-js/store";
import { Pagination } from "~";
import { PlayIt } from "~play/components/play-it";

export default function PaginationPage() {
  const [params, setParams] = createStore({
    current: 1,
    total: 100,
    pageSize: 10,
    disabled: false,
    showSiblingCount: 1,
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
        disabled={params.disabled}
        onChange={(page) => setParams("current", page)}
        pageSize={params.pageSize}
        showSiblingCount={params.showSiblingCount}
        size={params.size}
        total={params.total}
      />

      <div style={{ "margin-top": "20px" }}>
        <Pagination
          current={params.current}
          disabled={params.disabled}
          onChange={(page) => setParams("current", page)}
          pageSize={params.pageSize}
          showSiblingCount={params.showSiblingCount}
          size="small"
          total={params.total}
        />
      </div>

      <div style={{ "margin-top": "20px" }}>
        <Pagination
          current={params.current}
          disabled={params.disabled}
          onChange={(page) => setParams("current", page)}
          pageSize={params.pageSize}
          showSiblingCount={params.showSiblingCount}
          size="large"
          total={params.total}
        />
      </div>
    </PlayIt>
  );
}
