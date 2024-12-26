import { StarterKit, Typography, Highlight, CodeBlock } from ".";

export const ExtensionKit = () => [
  Typography,
  Highlight,
  CodeBlock,
  StarterKit.configure({
    blockquote: false,
    codeBlock: false,
  }),
];
