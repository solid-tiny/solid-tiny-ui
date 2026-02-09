import { Button, Flex, useDialog } from "~";
import { PlayIt } from "~play/components/play-it";

export default function DialogPage() {
  const dialog = useDialog();

  return (
    <PlayIt properties={{}}>
      <Flex gap={"sm"} wrap>
        <Button
          onClick={() => {
            dialog("This is a simple dialog message!");
          }}
        >
          Basic Dialog
        </Button>

        <Button
          onClick={() => {
            dialog("This dialog has a title!", {
              title: "Information",
            });
          }}
          variant="outline"
        >
          Dialog with Title
        </Button>

        <Button
          color="primary"
          onClick={() => {
            dialog("This dialog has custom width.", {
              title: "Wide Dialog",
              width: "700px",
            });
          }}
        >
          Wide Dialog
        </Button>

        <Button
          color="warning"
          onClick={() => {
            dialog("This dialog cannot be closed by clicking the mask.", {
              title: "Non-Mask-Closable",
              maskClosable: false,
            });
          }}
          variant="outline"
        >
          Mask Not Closable
        </Button>

        <Button
          onClick={() => {
            dialog("This is a closable dialog with no close button.", {
              title: "No Close Button",
              closable: false,
              footer: ({ id }) => (
                <Flex gap="sm" justify="flex-end">
                  <Button onClick={() => dialog.dismiss(id)} size="small">
                    Close
                  </Button>
                </Flex>
              ),
            });
          }}
          variant="outline"
        >
          No Close Button
        </Button>

        <Button
          onClick={() => {
            dialog("Would you like to proceed?", {
              title: "Confirmation",
              footer: ({ id }) => (
                <Flex gap="sm" justify="flex-end">
                  <Button
                    onClick={() => dialog.dismiss(id)}
                    size="small"
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => {
                      dialog.dismiss(id);
                    }}
                    size="small"
                  >
                    Confirm
                  </Button>
                </Flex>
              ),
            });
          }}
        >
          Confirmation Dialog
        </Button>

        <Button
          onClick={() => {
            dialog(
              (d) => (
                <Flex gap="md" vertical>
                  <div>This is a fully customized dialog content.</div>
                  <div>Dialog ID: {d.id}</div>
                  <Button onClick={() => dialog.dismiss(d.id)} size="small">
                    Close Me
                  </Button>
                </Flex>
              ),
              {
                title: "Custom Content",
              }
            );
          }}
        >
          Custom Content
        </Button>

        <Button
          color="danger"
          onClick={() => {
            dialog("First dialog", { title: "Dialog 1" });
            setTimeout(() => {
              dialog("Second dialog", { title: "Dialog 2" });
            }, 500);
          }}
          variant="outline"
        >
          Multiple Dialogs
        </Button>

        <Button
          color="success"
          onClick={() => {
            const id = dialog("This content will be updated...", {
              title: "Updating",
            });
            setTimeout(() => {
              dialog.update(id, {
                content: "Content has been updated!",
                title: "Updated",
              });
            }, 2000);
          }}
        >
          Update Dialog
        </Button>
      </Flex>
    </PlayIt>
  );
}
