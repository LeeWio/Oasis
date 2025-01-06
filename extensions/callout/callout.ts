import {
  elementFromString,
  mergeAttributes,
  Node,
  ReactNodeViewRenderer,
} from "@tiptap/react";

import { CalloutView } from "./component/callout-view";
import { CalloutVariantProps } from "@/core/theme/src";

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    Callout: {
      toggleCallout: () => ReturnType;

      setCalloutColor: (color: CalloutVariantProps["color"]) => ReturnType;

      setCalloutRadius: (radius: CalloutVariantProps["radius"]) => ReturnType;

      setCalloutVariant: (
        variant: CalloutVariantProps["variant"],
      ) => ReturnType;

      setCalloutSize: (size: CalloutVariantProps["size"]) => ReturnType;
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
        default: "default",
        parseHTML: (element) => element.getAttribute("data-color"),
        renderHTML: (attributes) => ({ "data-color": attributes.color }),
      },
      size: {
        default: "md",
        parseHTML: (element) => element.getAttribute("data-size"),
        renderHTML: (attributes) => ({ "data-size": attributes.size }),
      },
      radius: {
        default: "none",
        parseHTML: (element) => element.getAttribute("data-radius"),
        renderHTML: (attributes) => ({ "data-radius": attributes.radius }),
      },
      variant: {
        default: "solid",
        parseHTML: (element) => element.getAttribute("data-variant"),
        renderHTML: (attributes) => ({ "data-variant": attributes.variant }),
      },
      startIcon: {
        default: "",
        parseHTML: (element) => element.getAttribute("data-startIcon"),
        renderHTML: (attributes) => ({
          "data-startIcon": attributes.startIcon,
        }),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[date-type="callout"]' }];
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

  addCommands() {
    return {
      toggleCallout:
        () =>
        ({ commands }) => {
          return commands.toggleNode(this.name, "paragraph");
        },
      setCalloutColor:
        (color) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { color });
        },
      setCalloutSize:
        (size) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { size });
        },
      setCalloutVariant:
        (variant) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { variant });
        },
      setCalloutRadius:
        (radius) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { radius });
        },
    };
  },
});

// TODO 在扩展 CodeBlockLowlight 时需要借鉴
// export const Callout = CodeBlockLowlight.extend({
//   addNodeView() {
//     return ReactNodeViewRenderer(CalloutView);
//   },
// }).configure({ lowlight, defaultLanguage: "java" });
