import { MouseEventHandler } from "react";
import { DropzoneOptions } from "react-dropzone";
import { FieldValues, useController, useFormContext } from "react-hook-form";
import { ImgLink, Props } from "./types";
import { useModalContext } from "contexts/ModalContext";
import Popup from "components/Popup";
import ImgCropper from "./ImgCropper";

type Key = keyof ImgLink;
const fileKey: Key = "file";
const previewKey: Key = "preview";
const precropFileKey: Key = "precropFile";

export default function useImgEditor<T extends FieldValues, K extends keyof T>({
  name,
  aspect,
  accept,
}: Props<T, K>) {
  const filePath: any = `${String(name)}.${fileKey}`;
  const previewPath: any = `${String(name)}.${previewKey}`;
  const precropFilePath: any = `${String(name)}.${precropFileKey}`;

  const { setValue, watch } = useFormContext<T>();
  const { showModal } = useModalContext();
  const {
    field: { value: currFile, onChange: onFileChange, ref },
  } = useController<T>({ name: filePath });

  const { publicUrl, preview, precropFile }: ImgLink = watch(name as any);
  const isInitial = preview === publicUrl;
  const noneUploaded = !publicUrl && !preview;

  const onDrop: DropzoneOptions["onDrop"] = (files: File[]) => {
    const newFile = files[0];
    if (newFile) {
      //preview & crop valid formats only
      if (accept.includes(newFile.type)) {
        const preview = URL.createObjectURL(newFile);
        showModal(ImgCropper, {
          preview,
          aspect,
          type: newFile.type,
          onSave(blob) {
            handleCropResult(blob, newFile);
          },
        });
      }
      onFileChange(newFile);
      setValue(precropFilePath, newFile as any, { shouldValidate: true });
    }
  };

  const handleOpenCropper: MouseEventHandler<HTMLButtonElement> = (e) => {
    //prevent container dropzone from catching click event
    e.stopPropagation();
    showModal(ImgCropper, {
      preview,
      aspect,
      type: currFile.type,
      onSave(blob) {
        handleCropResult(blob, currFile);
      },
    });
  };

  function handleCropResult(blob: Blob | null, originalFile: File) {
    if (!blob) {
      showModal(Popup, { message: "Failed to crop image" });
      return;
    }
    const cropped = URL.createObjectURL(blob);
    setValue(previewPath, cropped as any);
    onFileChange(
      new File([blob], originalFile.name, {
        type: blob.type,
      })
    );
  }

  const handleReset: MouseEventHandler<HTMLButtonElement> = (e) => {
    //prevent container dropzone from catching click event
    e.stopPropagation();
    setValue(previewPath, publicUrl as any, { shouldValidate: false });
    setValue(filePath, undefined as any, { shouldValidate: false });
    setValue(precropFilePath, undefined as any, { shouldValidate: false });
  };

  return {
    onDrop,
    handleOpenCropper,
    isInitial,
    noneUploaded,
    handleReset,
    preview,
    imgSize: precropFile?.size,
    ref,
  };
}
