import { mergeAttributes, Node, ReactNodeViewRenderer } from "@tiptap/react";
import { AlertProps } from "@nextui-org/alert";

import { AlertView } from "./component/AlertView";

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    Alert: {
      insertAlert: () => ReturnType;

      setAlertColor: (color: AlertProps["color"]) => ReturnType;

      setAlertRadius: (radius: AlertProps["radius"]) => ReturnType;

      setAlertSize: (size: AlertProps["size"]) => ReturnType;

      setAlertVariant: (variant: AlertProps["variant"]) => ReturnType;
    };
  }
}
export const Alert = Node.create({
  name: "alert",

  group: "block",

  content: "inline*",

  draggable: true,

  addAttributes() {
    return {
      color: {
        default: "primary",
        parseHTML: (element) => element.getAttribute("data-color"),
        renderHTML: (attributes) => ({ "data-color": attributes.color }),
      },
      radius: {
        default: "sm",
        parseHTML: (element) => element.getAttribute("data-radius"),
        renderHTML: (attributes) => ({ "data-radius": attributes.radius }),
      },
      variant: {
        default: "flat",
        parseHTML: (element) => element.getAttribute("data-variant"),
        renderHTML: (attributes) => ({ "data-variant": attributes.variant }),
      },
      // description: {
      //   default: "",
      //   parseHTML: (element) => element.getAttribute("data-description"),
      //   renderHTML: (attributes) => ({
      //     "data-description": attributes.variant,
      //   }),
      // },
    };
  },
  parseHTML() {
    return [{ tag: 'div[data-type="alert"]' }];
  },

  addKeyboardShortcuts() {
    return {
      "Mod-Enter": () => {
        return this.editor
          .chain()
          .insertContentAt(this.editor.state.selection.head, {
            type: this.type.name,
          })
          .focus()
          .run();
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "alert" }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(AlertView); // Use the SnippetView component
  },

  addCommands() {
    return {
      insertAlert:
        () =>
        ({ commands }) => {
          return commands.setNode(this.name);
        },

      setAlertColor:
        (color) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, {
            color,
          });
        },
      setAlertRadius:
        (radius) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, {
            radius,
          });
        },
      setAlertVariant:
        (variant) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { variant });
        },
    };
  },
});
