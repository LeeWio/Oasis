"use client";

import "iframe-resizer/js/iframeResizer.contentWindow";
import { useEffect, useState } from "react";

import { BlockEditor } from "@/components/BlockEditor";
import { useCollaboration } from "@/hooks/useCollaboration";

export default function Room({
  params,
}: {
  params: {
    room: string;
    isOpen: boolean;
    onOpenChange: () => void;
  };
}) {
  const [aiToken, setAiToken] = useState<string | null | undefined>();

  const providerState = useCollaboration({
    docId: params.room,
    enabled: process.env.NEXT_PUBLIC_COLLAB === "1",
  });

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      try {
        const response = await fetch("/api/ai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            "No AI token provided, please set TIPTAP_AI_SECRET in your environment",
          );
        }
        const data = await response.json();

        const { token } = data;

        // set state when the data received
        setAiToken(token);
      } catch (e) {
        if (e instanceof Error) {
          console.error(e.message);
        }
        setAiToken(null);

        return;
      }
    };

    dataFetch();
  }, []);
  if (providerState.state === "loading" || aiToken === undefined) return;

  return (
    <BlockEditor
      aiToken={aiToken ?? undefined}
      isOpen={params.isOpen}
      provider={providerState.provider}
      ydoc={providerState.yDoc}
      onOpenChange={params.onOpenChange}
    />
  );
}
