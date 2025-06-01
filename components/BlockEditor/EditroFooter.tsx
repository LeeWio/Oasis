import { memo } from "react";
import { CircularProgress } from "@heroui/progress";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";

export type EditorFooterProps = {
  characters: number;
  words: number;
};

const EditorStats = ({ characters, words }: EditorFooterProps) => (
  <div className="flex flex-col justify-center pr-1 text-right">
    <div className="text-xs font-semibold ">
      {words} {words === 1 ? "word" : "words"}
    </div>
    <div className="text-xs font-semibold">
      {characters} {characters === 1 ? "character" : "characters"}
    </div>
  </div>
);
export const EditorFooter = memo(({ characters, words }: EditorFooterProps) => {
  return (
    <>
      <Button isIconOnly size="md" variant="light">
        <Icon
          icon="lucide:panel-left"
          width="24"
          height="24"
          className="text-neutral-500 dark:text-neutral-400"
        />
      </Button>
      <CircularProgress
        showValueLabel
        classNames={{
          base: "flex flex-row-reverse",
        }}
        aria-label="editor-footer circular progress"
        label={<EditorStats characters={characters} words={words} />}
        maxValue={10000}
        value={words}
      />
    </>
  );
});
