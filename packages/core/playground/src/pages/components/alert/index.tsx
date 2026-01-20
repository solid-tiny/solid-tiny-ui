import { createSignal, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { Alert, Button, Field, Input, useToaster } from "~";
import { PlayIt } from "../../../components/play-it";

function PlayClosable() {
  const [error, setError] = createSignal("");
  return (
    <PlayIt properties={{}}>
      <div class="flex max-w-400px flex-col gap-md p-sm">
        <Field>
          <Field.Title>Username</Field.Title>
          <Input />
        </Field>
        <Field>
          <Field.Title>Password</Field.Title>
          <Input />
        </Field>
        <Button
          classNames={{ root: "w-full!" }}
          onClick={() => {
            setError("error");
          }}
        >
          Login
        </Button>

        <Show when={error()}>
          <Alert
            onClose={() => {
              setError("");
            }}
            showClose={true}
            status="error"
            title="Closable Error Alert"
          >
            This alert can be dismissed by clicking the close button.
          </Alert>
        </Show>
      </div>
    </PlayIt>
  );
}

export default function AlertPage() {
  const [params, setParams] = createStore({
    status: "info" as "info" | "success" | "warning" | "error",
    variant: "subtle" as "subtle" | "solid" | "outline",
    showIcon: true,
    showClose: false,
  });

  const toast = useToaster();

  return (
    <div>
      <div class="c-text-heading fs-sm mb-sm ml-lg">Basic Alert</div>
      <PlayIt
        onChange={setParams}
        properties={params}
        typeDeclaration={{
          status: ["info", "success", "warning", "error"],
          variant: ["subtle", "solid", "outline"],
        }}
      >
        <div class="p-md">
          <Alert
            onClose={() => {
              toast.info("You clicked the close button!");
            }}
            showClose={params.showClose}
            showIcon={params.showIcon}
            status={params.status}
            variant={params.variant}
          >
            This is an alert component. You can customize it with different
            statuses and variants.
          </Alert>
        </div>
      </PlayIt>

      <div class="c-text-heading fs-sm mt-lg mb-sm ml-lg">
        Alert with Title and Description
      </div>
      <PlayIt properties={{}}>
        <div class="space-y-md p-md">
          <Alert
            description="Check out the new features we've added to our platform."
            status="info"
            title="Update Available"
          />
          <Alert
            description="Your account has been created successfully."
            status="success"
            title="Success"
          />
          <Alert
            description="Please review your information before proceeding."
            status="warning"
            title="Warning"
          />
          <Alert
            description="There was an error processing your request."
            status="error"
            title="Error"
          />
        </div>
      </PlayIt>

      <div class="c-text-heading fs-sm mt-lg mb-sm ml-lg">All Variants</div>
      <PlayIt properties={{}}>
        <div class="space-y-md p-md">
          <Alert status="info" variant="subtle">
            Subtle variant with info status
          </Alert>
          <Alert status="success" variant="solid">
            Solid variant with success status
          </Alert>
          <Alert status="warning" variant="outline">
            Outline variant with warning status
          </Alert>
        </div>
      </PlayIt>

      <div class="c-text-heading fs-sm mt-lg mb-sm ml-lg">Closable Alerts</div>
      <PlayClosable />

      <div class="c-text-heading fs-sm mt-lg mb-sm ml-lg">Without Icon</div>
      <PlayIt properties={{}}>
        <div class="space-y-md p-md">
          <Alert showIcon={false} status="info">
            Alert without icon
          </Alert>
          <Alert
            description="You can hide the icon if needed."
            showIcon={false}
            status="warning"
            title="No Icon"
          />
        </div>
      </PlayIt>

      <div class="c-text-heading fs-sm mt-lg mb-sm ml-lg">Custom Icon</div>
      <PlayIt properties={{}}>
        <div class="p-md">
          <Alert
            icon={<div style={{ "font-size": "20px" }}>🎉</div>}
            status="success"
            title="Custom Icon"
          >
            You can provide your own custom icon.
          </Alert>
        </div>
      </PlayIt>
    </div>
  );
}
