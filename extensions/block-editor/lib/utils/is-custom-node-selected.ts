import { Editor } from "@tiptap/react";

import {
  CodeBlock, // AiWriter,
  // AiImage,
  // Figcaption,
  // HorizontalRule,
  Image,
  ImageUpload,
  Link,
} from "../../extensions";

import { TableOfContentsNode } from "@/extensions/block-editor/extensions/table-of-contents-node";

export const isTableGripSelected = (node: HTMLElement) => {
  let container = node;

  while (container && !["TD", "TH"].includes(container.tagName)) {
    container = container.parentElement!;
  }

  const gripColumn =
    container &&
    container.querySelector &&
    container.querySelector("a.grip-column.selected");
  const gripRow =
    container &&
    container.querySelector &&
    container.querySelector("a.grip-row.selected");

  if (gripColumn || gripRow) {
    return true;
  }

  return false;
};

export const isCustomNodeSelected = (editor: Editor, node: HTMLElement) => {
  const customNodes = [
    // HorizontalRule.name,
    Image.name,
    ImageUpload.name,
    CodeBlock.name,
    // ImageBlock.name,
    Link.name,
    // AiWriter.name,
    // AiImage.name,
    // Figcaption.name,
    TableOfContentsNode.name,
  ];

  return (
    customNodes.some((type) => editor.isActive(type)) ||
    isTableGripSelected(node)
  );
};

export default isCustomNodeSelected;
