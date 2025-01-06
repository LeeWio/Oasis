import { StarterKit, Typography, Highlight, Callout } from ".";

export const ExtensionKit = () => [
  Typography,
  Highlight,
  Callout,
  StarterKit.configure({
    blockquote: false,
    codeBlock: false,
  }),
];
