"use client";

import { addToast } from "@heroui/toast";
import { Button } from "@heroui/button";

import { useAppDispatch } from "@/hooks/store";
import {
  resetToastConfig,
  setColor,
  setToastPlacement,
} from "@/feature/util/toastSlice";

export default function BlogPage() {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-wrap gap-2 ml-auto mr-0">
      {[
        ["Solid", "solid"],
        ["Bordered", "bordered"],
        ["Flat", "faded"],
      ].map((variant) => (
        <Button
          key={variant[0]}
          // @ts-ignore
          variant={variant[1]}
          onPress={() =>
            addToast({
              // @ts-ignore
              variant: variant[0].toLowerCase(),
            })
          }
        >
          {variant[0]}
        </Button>
      ))}
      <Button onPress={() => dispatch(setColor("danger"))}>
        set toast color
      </Button>
      <Button onPress={() => dispatch(setToastPlacement("top-center"))}>
        set toast placement
      </Button>

      <Button onPress={() => dispatch(resetToastConfig())}>reset</Button>
    </div>
  );
}
