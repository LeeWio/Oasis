import {
  ChangeEvent,
  DragEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useUploadFilesMutation } from "@/feature/api/fileApi";
import { addToast } from "@heroui/toast";

export const useUploader = ({
  onUpload,
}: {
  onUpload: (url: string[]) => void;
}) => {
  const [uploadImages, { isLoading }] = useUploadFilesMutation();

  const uploadFiles = useCallback(
    async (files: File[]) => {
      try {
        const result = await uploadImages({ files }).unwrap();
        const urls = result.map((item) => item.fileUrl);

        onUpload(urls);
      } catch (errPayload: any) {
        const error =
          errPayload?.response?.data?.error || "Something went wrong";

        addToast({
          title: error,
          color: "danger",
        });
      }
    },
    [onUpload],
  );

  return { isLoading, uploadFiles };
};

export const useFileUpload = () => {
  // const fileInput = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadFiles } = useUploader({ onUpload: () => {} });

  const handleUploadClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, []);
  // const handleUploadClick = useCallback(() => {
  //   fileInput.current?.click();
  // }, []);

  const onFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.target.files && uploadFiles(Array.from(e.target.files));
    },
    [uploadFiles],
  );

  return { ref: inputRef, onFileChange, handleUploadClick };
};

export const useDropZone = ({
  uploader,
}: {
  uploader: (file: File[]) => void;
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggedInside, setDraggedInside] = useState<boolean>(false);

  useEffect(() => {
    const dragStartHandler = () => {
      setIsDragging(true);
    };

    const dragEndHandler = () => {
      setIsDragging(false);
    };

    document.body.addEventListener("dragstart", dragStartHandler);
    document.body.addEventListener("dragend", dragEndHandler);

    return () => {
      document.body.removeEventListener("dragstart", dragStartHandler);
      document.body.removeEventListener("dragend", dragEndHandler);
    };
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault(); // 必须放在最前面
      setDraggedInside(false);

      if (e.dataTransfer.files.length === 0) {
        return;
      }

      const fileList = e.dataTransfer.files;
      const files: File[] = [];

      for (let i = 0; i < fileList.length; i++) {
        const file = fileList.item(i);
        if (file) {
          files.push(file);
        }
      }

      // 过滤出图片类型的文件
      const imageFiles = files.filter((file) => file.type.startsWith("image/"));

      if (imageFiles.length === 0) {
        return;
      }

      // ✅ 调用 uploader 并传入多个文件
      uploader(imageFiles);
    },
    [uploader],
  );
  // const onDrop = useCallback(
  //   (e: DragEvent<HTMLDivElement>) => {
  //     setDraggedInside(false);
  //     if (e.dataTransfer.files.length === 0) {
  //       return;
  //     }
  //
  //     const fileList = e.dataTransfer.files;
  //
  //     const files: File[] = [];
  //
  //     for (let i = 0; i < fileList.length; i += 1) {
  //       const item = fileList.item(i);
  //
  //       if (item) {
  //         files.push(item);
  //       }
  //     }
  //
  //     if (files.some((file) => file.type.indexOf("image") === -1)) {
  //       return;
  //     }
  //
  //     e.preventDefault();
  //
  //     const filteredFiles = files.filter((f) => f.type.indexOf("image") !== -1);
  //
  //     const file = filteredFiles.length > 0 ? filteredFiles[0] : undefined;
  //
  //     if (file) {
  //       uploader(file);
  //     }
  //   },
  //   [uploader],
  // );

  // const onDragEnter = () => {
  //   setDraggedInside(true);
  // };

  const onDragEnter = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDraggedInside(true);
  }, []);

  // const onDragLeave = () => {
  //   setDraggedInside(false);
  // };

  const onDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDraggedInside(false);
  }, []);

  return { isDragging, draggedInside, onDragEnter, onDragLeave, onDrop };
};
