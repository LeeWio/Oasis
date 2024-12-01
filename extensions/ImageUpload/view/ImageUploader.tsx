import { Button } from "@nextui-org/button";
import { Icon } from "@iconify/react";
import { cn } from "@nextui-org/theme";
import { Spinner } from "@nextui-org/spinner";
import { ChangeEvent, useCallback } from "react";

import {
  useDropZone,
  useFileUpload,
  useUploader,
} from "@/extensions/ImageUpload/view/hooks";

export const ImageUploader = ({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) => {
  const { loading, uploadFile } = useUploader({ onUpload });
  const { handleUploadClick, ref } = useFileUpload();
  const { draggedInside, onDrop, onDragEnter, onDragLeave } = useDropZone({
    uploader: uploadFile,
  });

  const onFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      e.target.files ? uploadFile(e.target.files[0]) : null,
    [uploadFile],
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 rounded-lg min-h-[10rem] bg-opacity-80">
        <Spinner className="text-neutral-500" />
      </div>
    );
  }

  const wrapperClass = cn(
    "flex flex-col items-center justify-center px-8 py-10 rounded-lg bg-opacity-80",
    draggedInside && "bg-neutral-100",
  );

  return (
    <div
      className={wrapperClass}
      contentEditable={false}
      onDragLeave={onDragLeave}
      onDragOver={onDragEnter}
      onDrop={onDrop}
    >
      <Icon
        className={"text-neutral-400 dark:text-neutral-500"}
        fontSize={60}
        icon="lucide:image"
      />
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-sm font-medium text-center text-neutral-400 dark:text-neutral-500">
          {draggedInside ? "Drop image here" : "Drag and drop or"}
        </div>
        <Button
          disabled={draggedInside}
          size={"sm"}
          startContent={<Icon fontSize={15} icon="lucide:upload" />}
          variant={"solid"}
          onClick={handleUploadClick}
        >
          Upload an image
        </Button>
      </div>
      <input
        ref={ref}
        accept=".jpg,.jpeg,.png,.webp,.gif"
        className="w-0 h-0 overflow-hidden opacity-0"
        type="file"
        onChange={onFileChange}
      />
    </div>
  );
};
export default ImageUploader;
