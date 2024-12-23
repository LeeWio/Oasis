import { useEditor } from "@tiptap/react";
import { ExtensionKit } from "@/extensions/extension-kit";

export const useBlockEditor = () => {
  const editor = useEditor({
    //TODO need to fix
    immediatelyRender: false,
    autofocus: true,
    editable: true,
    extensions: [...ExtensionKit()],
    content: "<p>Hello world</p>",
  });

  return { editor };
};
