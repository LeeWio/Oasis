import { memo } from "react";
import { CircularProgress } from "@heroui/progress";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { Tabs, Tab } from "@heroui/tabs";
import { CardBody, Card } from "@heroui/card";

export type EditorFooterProps = {
  characters: number;
  words: number;
  isOpen?: boolean;
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

export const EditorFooter = memo(
  ({ isOpen, characters, words }: EditorFooterProps) => {
    return isOpen ? (
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-row justify-between gap-2">
          <div className="flex-1 bg-red-400">1</div>

          <div className="flex w-full flex-col flex-1">
            <Tabs fullWidth aria-label="Options" size="sm" radius="sm">
              <Tab key="photos" title="Photos">
                <Card>
                  <CardBody>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="music" title="Music">
                <Card>
                  <CardBody>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                    irure dolor in reprehenderit in voluptate velit esse cillum
                    dolore eu fugiat nulla pariatur.
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="videos" title="Videos">
                <Card>
                  <CardBody>
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    ) : (
      <div className="flex justify-between w-full items-center text-neutral-500 dark:text-neutral-400">
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
          value={characters}
        />
      </div>
    );
  },
);
