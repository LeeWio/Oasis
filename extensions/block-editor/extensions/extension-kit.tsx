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
  // Figcaption,
  Link,
  Focus,
  Typography,
  DetailsContent,
  Mathematics,
  DetailsSummary,
  Table,
  Selection,
  Image,
  Subscript,
  Superscript,
  TextAlign,
  CodeBlock,
  // UniqueID,
} from ".";

export const ExtensionKit = () => [
  Column,
  CodeBlock,
  Typography,
  Focus,
  // Figcaption,
  BlockquoteFigure,
  Mathematics,
  Image,
  ListKit.configure({
    taskItem: {
      nested: true,
    },
  }),
  Subscript,
  CharacterCount.configure({
    limit: 50000,
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
  }),
];

export default ExtensionKit;
