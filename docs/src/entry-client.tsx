import { mount, StartClient } from "@solidjs/start/client";

// biome-ignore lint/style/noNonNullAssertion: The 'app' element is guaranteed to exist in the host HTML file.
mount(() => <StartClient />, document.getElementById("app")!);
