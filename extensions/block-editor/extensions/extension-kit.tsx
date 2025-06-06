"use client";

import {
  ListKit,
  TextStyleKit,
  StarterKit,
  Column,
  Columns,
  CharacterCount,
  Details,
  Highlight,
  Dropcursor,
  Placeholder,
  BlockquoteFigure,
  TableOfContents,
  // Figcaption,
  Link,
  Focus,
  Typography,
  DetailsContent,
  ImageUpload,
  Mathematics,
  DetailsSummary,
  Table,
  Selection,
  Image,
  Subscript,
  Superscript,
  TextAlign,
  CodeBlock,
  TableOfContentsNode,
  // UniqueID,
} from ".";

export const ExtensionKit = () => [
  Column,
  ImageUpload,
  CodeBlock,
  Typography,
  Focus,
  // Figcaption,
  BlockquoteFigure,
  Mathematics,
  Image,
  TableOfContents,
  TableOfContentsNode,
  ListKit.configure({
    taskItem: {
      nested: true,
    },
  }),
  Subscript,
  CharacterCount.configure({
    limit: 10000,
  }),
  // UniqueID.configure({
  //   types: ['paragraph', 'heading', 'blockquote', 'codeBlock', 'table'],
  //   filterTransaction: transaction => !isChangeOrigin(transaction),
  // }),
  Columns,
  Selection,
  Highlight.configure({
    multicolor: true,
  }),
  Superscript,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  TextStyleKit,
  Details.configure({
    persist: true,
    HTMLAttributes: {
      class: "details",
    },
  }),
  DetailsContent,
  DetailsSummary,
  Table,
  Placeholder.configure({
    includeChildren: true,
    showOnlyCurrent: false,
    placeholder: () => "",
  }),
  StarterKit.configure({
    codeBlock: false,
    listKeymap: false,
    dropcursor: false,
    listItem: false,
    orderedList: false,
    bulletList: false,
    link: false,
  }),
  Dropcursor.configure({
    width: 2,
    class: "ProseMirror-dropcursor border-black",
  }),
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {},
  }),
];

export default ExtensionKit;
