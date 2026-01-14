import { Button, useToaster } from "~";
import { PlayIt } from "~play/components/play-it";

export default function ToasterPage() {
  const toast = useToaster();
  return (
    <PlayIt properties={{}}>
      <Button
        onClick={() => {
          toast.blank("This is a toast message!");
        }}
      >
        Show Toast
      </Button>
    </PlayIt>
  );
}
