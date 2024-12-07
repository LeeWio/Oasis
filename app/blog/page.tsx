"use client";

import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";

export default function BlogPage() {
  return (
    <Tooltip content="I am a tooltip">
      <Button>Hover me</Button>
    </Tooltip>
  );
}
