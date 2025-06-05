import { useDropZone, useFileUpload, useUploader } from "@/hooks/useFileUpload";
import { Spinner } from "@heroui/spinner";
import { Card, CardBody } from "@heroui/card";
import { cn } from "@heroui/theme";
import { Icon } from "@iconify/react";
import { useCallback, ChangeEvent } from "react";

type FileUploadProps = {
  onUpload: (url: string[]) => void;
};

export const FileUpload = ({ onUpload }: FileUploadProps) => {
  const { isLoading, uploadFiles } = useUploader({ onUpload });
  const { handleUploadClick, ref } = useFileUpload();

  const onFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.target.files && uploadFiles(Array.from(e.target.files));
    },
    [uploadFiles],
  );

  const { draggedInside, onDrop, onDragEnter, onDragLeave } = useDropZone({
    uploader: uploadFiles,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 rounded-lg min-h-[10rem] bg-opacity-80">
        <Spinner className="text-neutral-500" size="lg" variant="dots" />
      </div>
    );
  }

  return (
    <Card
      onDrop={onDrop}
      onDragOver={onDragEnter}
      onDragLeave={onDragLeave}
      classNames={{
        base: cn(!draggedInside && "shadow-none", "w-full"),
      }}
      contentEditable={false}
      onPress={handleUploadClick}
      isPressable={!draggedInside}
    >
      <CardBody className="flex justify-center items-center">
        <Icon
          icon="lucide:image-up"
          className="w-12 h-12 mb-4 text-black dark:text-white opacity-20"
        />
        <div className="text-sm font-medium text-center text-neutral-400 dark:text-neutral-500">
          {draggedInside ? "Drop image here" : "Drag and drop or"}
        </div>
        <input
          className="w-0 h-0 overflow-hidden opacity-0"
          ref={ref}
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.gif"
          onChange={onFileChange}
          multiple
        />
      </CardBody>
    </Card>
  );
};
