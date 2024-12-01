import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Icon } from "@iconify/react";

import { LinkEditorPanel } from "@/components/panels/LinkEditorPanel";

export type EditLinkPopoverProps = {
  onSetLink: (link: string, openInNewTab?: boolean) => void;
};

export const EditLinkPopover = ({ onSetLink }: EditLinkPopoverProps) => {
  return (
    <Popover radius={"md"} showArrow={true}>
      <PopoverTrigger>
        <Button
          disableRipple
          isIconOnly
          as={Link}
          color={"default"}
          size={"sm"}
          variant={"light"}
        >
          <Icon fontSize={20} icon={"lucide:link"} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <LinkEditorPanel onSetLink={onSetLink} />
      </PopoverContent>
    </Popover>
  );
};
