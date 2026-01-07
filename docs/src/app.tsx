import { MetaProvider } from "@solidjs/meta";
import { Router, useIsRouting } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import "uno.css";
import { LoadingBar, TinyUiProvider } from "solid-tiny-ui";

function AppLoadingBar() {
  const isRouting = useIsRouting();
  return (
    <div class="height-8px fixed top-0 right-0 left-0">
      <LoadingBar open={isRouting()} />
    </div>
  );
}

export default function App() {
  return (
    <Router
      root={(props) => (
        <TinyUiProvider>
          <MetaProvider>
            <div class="box bg-brand-0">
              <AppLoadingBar />
              <Suspense>{props.children}</Suspense>
            </div>
          </MetaProvider>
        </TinyUiProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
