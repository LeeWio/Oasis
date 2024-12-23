import { StarterKit, Typography, Highlight } from ".";

export const ExtensionKit = () => [
  Typography,
  Highlight,
  StarterKit.configure({
    blockquote: false,
    codeBlock: false,
  }),
];
