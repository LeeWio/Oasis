import { useEditor } from "@tiptap/react";

import ExtensionKit from "../extensions/extension-kit";
export const useBlockEditor = () => {
  const editor = useEditor({
    // place the cursor in the editor after initialization
    autofocus: true,
    // make the text editable(default is true)
    editable: true,
    immediatelyRender: false,
    // prevent loading the default css(which isn't much anyway)
    injectCSS: true,

    extensions: [...ExtensionKit()],
  });

  return { editor };
};
