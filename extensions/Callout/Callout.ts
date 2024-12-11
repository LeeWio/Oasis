import { mergeAttributes, Node, ReactNodeViewRenderer } from "@tiptap/react";

import { CalloutView } from "@/extensions/Callout/component/CalloutView";

export type NextProps = {
  color: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  variant: "flat" | "faded" | "bordered" | "underlined" | "solid";
  radius: "none" | "sm" | "md" | "lg" | "full";
  size: "sm" | "md" | "lg";
};

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    Callout: {
      insertCallout: () => ReturnType;

      setCalloutColor: (color: NextProps["color"]) => ReturnType;

      setCalloutRadius: (radius: NextProps["radius"]) => ReturnType;

      setCalloutVariant: (variant: NextProps["variant"]) => ReturnType;

      setCalloutSize: (size: NextProps["size"]) => ReturnType;
    };
  }
}
export const Callout = Node.create({
  name: "callout",
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
      size: {
        default: "lg",
        parseHTML: (element) => element.getAttribute("data-size"),
        renderHTML: (attributes) => ({ "data-size": attributes.size }),
      },
      variant: {
        default: "flat",
        parseHTML: (element) => element.getAttribute("data-variant"),
        renderHTML: (attributes) => ({ "data-variant": attributes.variant }),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="callout"]' }];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CalloutView);
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "callout" }),
      0,
    ];
  },
  // addKeyboardShortcuts() {
  //   return {
  //     "Mod-Enter": () => {
  //       return this.editor
  //         .chain()
  //         .insertContentAt(this.editor.state.selection.head, {
  //           type: this.type.name,
  //         })
  //         .focus()
  //         .run();
  //     },
  //   };
  // },
  addCommands() {
    return {
      insertCallout:
        () =>
        ({ commands }) => {
          return commands.setNode(this.name);
        },
      setCalloutColor:
        (color: NextProps["color"]) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { color });
        },
      setCalloutRadius:
        (radius: NextProps["radius"]) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { radius });
        },
      setCalloutSize:
        (size: NextProps["size"]) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { size });
        },
      setCalloutVariant:
        (variant: NextProps["variant"]) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { variant });
        },
    };
  },
});
