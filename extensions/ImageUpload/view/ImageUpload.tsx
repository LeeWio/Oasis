import { Editor, NodeViewWrapper } from "@tiptap/react";
import { useCallback } from "react";

import ImageUploader from "@/extensions/ImageUpload/view/ImageUploader";

export const ImageUpload = ({
  getPos,
  editor,
}: {
  getPos: () => number;
  editor: Editor;
}) => {
  const onUpload = useCallback(
    (url: string) => {
      if (url) {
        editor
          .chain()
          .setImageBlock({ src: url })
          .deleteRange({ from: getPos(), to: getPos() })
          .focus()
          .run();
      }
    },
    [getPos, editor],
  );

  return (
    <NodeViewWrapper>
      <div data-drag-handle className="p-0 m-0">
        <ImageUploader onUpload={onUpload} />
      </div>
    </NodeViewWrapper>
  );
};
