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
          onClick={() => {
            dialog("This dialog has custom width.", {
              title: "Wide Dialog",
              width: "700px",
            });
          }}
          color="primary"
        >
          Wide Dialog
        </Button>

        <Button
          onClick={() => {
            dialog("This dialog cannot be closed by clicking the mask.", {
              title: "Non-Mask-Closable",
              maskClosable: false,
            });
          }}
          variant="outline"
          color="warning"
        >
          Mask Not Closable
        </Button>

        <Button
          onClick={() => {
            const id = dialog("This is a closable dialog with no close button.", {
              title: "No Close Button",
              closable: false,
              footer: ({ id }) => (
                <Flex gap="sm" justify="flex-end">
                  <Button onClick={() => dialog.close(id)} size="small">
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
            const id = dialog("Would you like to proceed?", {
              title: "Confirmation",
              footer: ({ id }) => (
                <Flex gap="sm" justify="flex-end">
                  <Button
                    onClick={() => dialog.close(id)}
                    size="small"
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => {
                      dialog.close(id);
                      alert("Confirmed!");
                    }}
                    size="small"
                  >
                    Confirm
                  </Button>
                </Flex>
              ),
            });
          }}
          color="link"
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
                  <Button onClick={() => dialog.close(d.id)} size="small">
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
          onClick={() => {
            const id1 = dialog("First dialog", { title: "Dialog 1" });
            setTimeout(() => {
              dialog("Second dialog", { title: "Dialog 2" });
            }, 500);
          }}
          variant="outline"
          color="danger"
        >
          Multiple Dialogs
        </Button>

        <Button
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
          color="success"
        >
          Update Dialog
        </Button>
      </Flex>
    </PlayIt>
  );
}
