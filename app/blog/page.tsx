"use client";
import Callout from "@/components/callout/src/callout";
import { title } from "@/components/primitives";
import { Snippet } from "@nextui-org/snippet";

export default function BlogPage() {
  return (
    <div className="flex gap-4">
      <Callout color="warning" variant="solid">
        Solid
      </Callout>
      <Callout color="warning" variant="bordered">
        Solid
      </Callout>
      <Callout color="warning" variant="light">
        Solid
      </Callout>
      <Callout color="warning" variant="flat">
        Solid
      </Callout>
      <Callout color="warning" variant="faded">
        Solid
      </Callout>
      <Callout color="warning" variant="shadow">
        Solid
      </Callout>
    </div>
  );
}
