import type { JSX } from "solid-js";

export function ShowcaseBox(props: {
  children?: JSX.Element;
  description?: JSX.Element;
  title?: string;
}) {
  return (
    <section class="b b-border mb-lg w-full rounded-md bg-neutral-0">
      <section class="b-b flex min-h-175px w-full flex-col items-center justify-center p-lg">
        {props.children}
      </section>
      <section class="relative">
        <div class="fs-sm c-text-heading absolute top-[-14px] ml-lg bg-neutral-0 px-md">
          {props.title || "Showcase Box"}
        </div>
        <div class="fs-sm p-md">
          {props.description || "This is a showcase box description."}
        </div>
      </section>
    </section>
  );
}
