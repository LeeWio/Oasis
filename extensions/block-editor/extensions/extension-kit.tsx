"use client";

import {
  StarterKit,
  Column,
  Columns,
  Details,
  DetailsContent,
  DetailsSummary,
  Table,
} from ".";

export const ExtensionKit = () => [
  Column,
  Columns,
  Details.configure({
    persist: true,
    HTMLAttributes: {
      class: "details",
    },
  }),
  DetailsContent,
  DetailsSummary,
  Table,
  StarterKit.configure({}),
];

export default ExtensionKit;
