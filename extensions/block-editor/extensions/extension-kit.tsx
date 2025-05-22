'use client'

import {
  ListKit,
  TextStyleKit,
  StarterKit,
  Column,
  Columns,
  CharacterCount,
  Details,
  Highlight,
  DetailsContent,
  Mathematics,
  DetailsSummary,
  Table,
  Selection,
  Subscript,
  Superscript,
  TextAlign,
} from '.'

export const ExtensionKit = () => [
  Column,
  Mathematics,
  ListKit.configure({
    taskItem: {
      nested: true,
    },
  }),
  Subscript,
  CharacterCount.configure({
    limit: 5000,
  }),
  Columns,
  Selection,
  Highlight.configure({
    multicolor: true,
  }),
  Superscript,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  TextStyleKit,
  Details.configure({
    persist: true,
    HTMLAttributes: {
      class: 'details',
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
]

export default ExtensionKit
