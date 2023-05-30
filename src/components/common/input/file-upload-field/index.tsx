import type { FormEvent, Ref } from "react";
import clsx from "clsx";
import React from "react";

type FileUploadFieldProps = {
  onFileChosen: (file: File[]) => void;
  filetypes: string[];
  errorMessage?: string;
  text?: string;
  className?: string;
  multiple?: boolean;
  forwardedRef?: Ref<HTMLInputElement>;
};

const FileUploadField = (props: FileUploadFieldProps) => {
  let files: File[] = [];
  const handleOnChange = (event: FormEvent | any) => {
    const tempFiles: File[] = [];
    for (const file of event.target.files) {
      tempFiles.push(file);
    }
    files = tempFiles;
    props.onFileChosen(files);
  };

  return (
    <div className={clsx("", props.className)}>
      <div className="border-dashed border-2 border-neutral-light h-full">
        <input
          ref={props.forwardedRef}
          accept={props.filetypes.join(", ")}
          className="opacity-0 w-full h-full"
          multiple={props.multiple}
          onChange={handleOnChange}
          type="file"
        />
      </div>
      {props.text && <p>{props.text}</p>}
      {props.errorMessage && (
        <p className="w-fit mx-auto text-[#FF0000]">{props.errorMessage}</p>
      )}
    </div>
  );
};
export default FileUploadField;
