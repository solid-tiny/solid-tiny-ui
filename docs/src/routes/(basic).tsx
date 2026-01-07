import { Title } from "@solidjs/meta";

export default function Index() {
  return (
    <div class="flex flex-col items-center p-xl">
      <Title>
        Solid Tiny UI - A tiny, fast, and accessible component library for
        SolidJS.
      </Title>
      <div class="c-white fs-md mb-lg rounded-3xl bg-brand-5 px-xl py-md font-bold">
        Solid Tiny UI
      </div>
      <div class="c-text-heading fs-3xl mb-xl w-80% text-center lg:w-625px">
        A tiny, fast, and accessible component library for SolidJS.
      </div>
      <div class="flex gap-xl">
        <a
          class="fs-md c-white flex h-38px w-128px items-center justify-center rounded-3xl bg-dark shadow-1 hover:shadow-3"
          href="https://github.com/solid-tiny/solid-tiny-ui"
          rel="noopener"
          target="_blank"
        >
          Get on GitHub
        </a>
        <a
          class="fs-md c-text-heading flex h-38px w-128px items-center justify-center rounded-3xl bg-white shadow-1 hover:shadow-3"
          href="/docs/introduction"
        >
          Read the docs
        </a>
      </div>
    </div>
  );
}
