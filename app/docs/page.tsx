"use client";

import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";

import { useAppDispatch } from "@/hooks/store";
import { setToastPlacement } from "@/feature/util/toastSlice";

export default function DocsPage() {
  const dispatch = useAppDispatch();

  return (
    <div className="group">
      <Button onPress={() => dispatch(setToastPlacement("top-left"))}>
        change toast placement
      </Button>
      <Button onPress={() => dispatch(setToastPlacement("top-center"))}>
        change toast placement
      </Button>
      <Button onPress={() => dispatch(setToastPlacement("top-right"))}>
        change toast placement to top-right
      </Button>
      <Button
        onPress={() => {
          addToast({ title: "Success", description: "asdfasdf" });
        }}
      >
        Show Toast
      </Button>
    </div>
  );
}
