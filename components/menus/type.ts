import React from "react";
import { Editor } from "@tiptap/react";

export interface MenuProps {
  editor: Editor;
  appendTo?: React.RefObject<any>;
  shouldHide?: boolean;
}
