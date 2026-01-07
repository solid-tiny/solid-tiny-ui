import routes from "virtual:pages";
import { Router, useCurrentMatches } from "@solidjs/router";
import type { JSX } from "solid-js";
import { createMemo, Suspense } from "solid-js";
import { createWatch } from "solid-tiny-utils";
import { TinyUiProvider } from "~";
import { Aside } from "./parts/aside";
import { Header } from "./parts/header";
import { useAppState } from "./state/app-state";

function RouteWrapper(props: { children: JSX.Element }) {
  const matches = useCurrentMatches();
  const info = createMemo(() => {
    const m = matches();
    if (m.length === 0) {
      return {};
    }
    return m.at(-1)?.route.info || {};
  });
  return (
    <div class="p-2">
      <div class="fw-bold text-2xl">{info().title}</div>
      <div class="p-2">{props.children}</div>
    </div>
  );
}

export function App() {
  const [appState] = useAppState();

  createWatch(
    () => [appState.isDark],
    ([isDark]) => {
      document.documentElement.classList.toggle("dark", isDark);
    }
  );

  return (
    <Router
      root={(props) => (
        <TinyUiProvider hue={appState.hue}>
          <div class="flex h-screen w-screen flex-col overflow-hidden bg-neutral-1">
            <div class="h-45px w-full">
              <Header />
            </div>
            <div class="flex h-[calc(100%-45px)] w-full">
              <div class="h-full w-185px overflow-auto">
                <Aside />
              </div>
              <Suspense>
                <div class="b-rd-tl-2xl b b-border h-full w-[calc(100%-185px)] overflow-auto bg-neutral-0">
                  <RouteWrapper>{props.children}</RouteWrapper>
                </div>
              </Suspense>
            </div>
          </div>
        </TinyUiProvider>
      )}
    >
      {routes}
    </Router>
  );
}
