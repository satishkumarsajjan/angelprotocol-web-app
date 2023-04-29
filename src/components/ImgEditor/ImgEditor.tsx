import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { useDropzone } from "react-dropzone";
import { FieldValues, useFormContext } from "react-hook-form";
import { ImgLink, Props } from "./types";
import Icon from "components/Icon";
import { humanize } from "helpers";
import useImgEditor from "./useImgEditor";

const BYTES_IN_MB = 1e6;

type Key = keyof ImgLink;
const precropFileKey: Key = "precropFile";

export default function ImgEditor<T extends FieldValues, K extends keyof T>(
  props: Props<T, K>
) {
  const { name, classes, maxSize } = props;
  const precropFilePath: any = `${String(name)}.${precropFileKey}`;

  const {
    formState: { errors, isSubmitting },
  } = useFormContext<T>();

  const {
    handleOpenCropper,
    handleReset,
    imgSize,
    isInitial,
    noneUploaded,
    onDrop,
    preview,
    ref,
  } = useImgEditor(props);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    disabled: isSubmitting,
    multiple: false,
    onDrop,
  });

  const overlay = `before:content-[''] before:absolute before:inset-0 ${
    isDragActive
      ? "before:bg-orange-l5/95 before:dark:bg-blue-d6/95"
      : isSubmitting
      ? "before:bg-gray-l4/95 before:dark:bg-bluegray-d1/95"
      : ""
  }`;

  return (
    <div className={`${classes?.container ?? ""} grid grid-rows-[1fr_auto]`}>
      <div
        {...getRootProps({
          className: `relative ${overlay} group rounded border border-dashed focus:outline-none ${
            isDragActive
              ? "border-gray-d1 dark:border-gray"
              : "border-prim focus:border-orange-l2 focus:dark:border-blue-d1"
          } ${
            isSubmitting
              ? "cursor-default bg-gray-l4 dark:bg-bluegray-d1"
              : "bg-gray-l5 dark:bg-blue-d5 cursor-pointer"
          } ${classes?.dropzone ?? ""}`,
          ref,
        })}
        style={{
          background: `url('${preview}') center/cover no-repeat`,
        }}
      >
        {noneUploaded ? (
          <button
            type="button"
            className="absolute-center grid justify-items-center text-sm text-gray-d1 dark:text-gray"
          >
            <Icon type="FileUpload" size={24} className="mb-[1.125rem]" />
            <p className="font-semibold mb-1">Upload file</p>
            <span className="text-center">
              Click to Browse or Drag &amp; Drop
            </span>
          </button>
        ) : (
          /** something is uploaded and would disrupt text above
           *  so just show upload icon instead of it.
           */
          <div className="absolute-center hidden group-hover:flex">
            <div className={buttonStyle}>
              <input {...getInputProps()} />
              <Icon type="Upload" />
            </div>
            {
              /** only show controls if new file is uploaded */
              !isInitial && (
                <IconButton disabled={isSubmitting} onClick={handleReset}>
                  <Icon type="Undo" />
                </IconButton>
              )
            }
          </div>
        )}
        {
          //allow crop only on new uploaded image
          !isInitial && (
            <IconButton onClick={handleOpenCropper} disabled={isSubmitting}>
              <Icon type="Crop" />
            </IconButton>
          )
        }
      </div>
      <p className="text-xs text-gray-d1 dark:text-gray mt-2">
        <span>
          Valid types are: JPG, JPEG, PNG and WEBP.{" "}
          {maxSize ? (
            <>
              Image should be less than {maxSize / BYTES_IN_MB}MB in size.
              <br />
              {imgSize
                ? `Current image size: ${humanize(imgSize / BYTES_IN_MB)}MB.`
                : ""}
            </>
          ) : (
            ""
          )}
        </span>{" "}
        <ErrorMessage
          errors={errors}
          name={precropFilePath as any}
          as="span"
          className="text-red dark:text-red-l2 text-xs before:content-['('] before:mr-0.5 after:content-[')'] after:ml-0.5 empty:before:hidden empty:after:hidden"
        />
      </p>
    </div>
  );
}

const buttonStyle =
  "cursor-pointer text-white text-lg bg-blue enabled:hover:bg-blue-l1 disabled:bg-gray-l1 p-2 m-1 rounded-md shadow-lg";
function IconButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} type="button" className={buttonStyle} />;
}
