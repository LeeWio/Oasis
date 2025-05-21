"use client";

import {
  ListKit,
  TextStyleKit,
  StarterKit,
  Column,
  Columns,
  Details,
  Highlight,
  DetailsContent,
  Mathematics,
  DetailsSummary,
  Table,
  Subscript,
  Superscript,
  TextAlign,
} from ".";

export const ExtensionKit = () => [
  Column,
  Mathematics,
  ListKit,
  Subscript,
  Columns,
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
  StarterKit.configure({
    listItem: false,
    orderedList: false,
    bulletList: false,
  }),
];

export default ExtensionKit;
