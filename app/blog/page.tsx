"use client";

import { tv, VariantProps } from "tailwind-variants";
import { useState } from "react";
import { Input } from "@nextui-org/input";

const item = tv({
  slots: {
    base: "flex flex-col mb-4 sm:flex-row p-6 bg-white dark:bg-stone-900 drop-shadow-xl rounded-xl",
    imageWrapper:
      "flex-none w-full sm:w-48 h-48 mb-6 sm:mb-0 sm:h-auto relative z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-xl before:bg-[#18000E] before:bg-gradient-to-r before:from-[#010187]",
    img: "sm:scale-125 absolute z-10 top-2 sm:left-2 inset-0 w-full h-full object-cover rounded-lg",
    title:
      "relative w-full flex-none mb-2 text-2xl font-semibold text-stone-900 dark:text-white",
    price: "relative font-semibold text-xl dark:text-white",
    previousPrice: "relative line-through font-bold text-neutral-500 ml-3",
    percentOff: "relative font-bold text-green-500 ml-3",
    sizeButton:
      "cursor-pointer select-none relative font-semibold rounded-full w-10 h-10 flex items-center justify-center active:opacity-80 dark:text-white peer-checked:text-white",
    buyButton:
      "text-xs sm:text-sm px-4 h-10 rounded-lg shadow-lg uppercase font-semibold tracking-wider text-white active:opacity-80",
    addToBagButton:
      "text-xs sm:text-sm px-4 h-10 rounded-lg uppercase font-semibold tracking-wider border-2 active:opacity-80",
  },
  variants: {
    color: {
      primary: {
        buyButton: "bg-blue-500 shadow-blue-500/50",
        sizeButton: "peer-checked:bg-blue",
        addToBagButton: "text-blue-500 border-blue-500",
      },
      secondary: {
        buyButton: "bg-purple-500 shadow-purple-500/50",
        sizeButton: "peer-checked:bg-purple",
        addToBagButton: "text-purple-500 border-purple-500",
      },
      success: {
        buyButton: "bg-green-500 shadow-green-500/50",
        sizeButton: "peer-checked:bg-green",
        addToBagButton: "text-green-500 border-green-500",
      },
    },
  },
});

const itemSizes = ["xs", "s", "m", "l", "xl"];

type Variants = VariantProps<typeof item>;
type ItemSizes = (typeof itemSizes)[number];

export default function BlogPage() {
  const [size, setSize] = useState<ItemSizes>("xs");
  const [color, setColor] = useState<Variants["color"]>("secondary");

  const {
    base,
    imageWrapper,
    img,
    title,
    price,
    previousPrice,
    percentOff,
    sizeButton,
    buyButton,
    addToBagButton,
  } = item({ color });

  return <Input color={"warning"} variant={"bordered"} />;
}
