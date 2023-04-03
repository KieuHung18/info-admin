import type { FormEvent } from "react";
import React from "react";
import clsx from "clsx";
import { useState } from "react";
import apis from "../../../../services/apis";

type FileUploadFieldProps = {
  onFileChosen: () => void;
  filetypes: string[];
  errorMessage?: string;
  placeholder?: React.ReactElement | string;
  className?: string;
  multiple?: boolean;
  text?: React.ReactElement | string;
};

const FileUploadField = (props: FileUploadFieldProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const handleOnChange = (event: FormEvent | any) => {
    console.log(event.target.files);
    const tempFiles: File[] = [];
    for (const file of event.target.files) {
      tempFiles.push(file);
    }

    setFiles(tempFiles);
  };
  const handleUploadFile = () => {
    const formData = new FormData();
    for (const file of files) {
      formData.append("files", file);
    }
    apis.uploads.create(formData);
  };

  return (
    <div className=" w-fit h-fit border-dashed border-2">
      <input
        accept={["image/jpeg", "image/png"].join(", ")}
        className="opacity-0 w-full"
        multiple
        onChange={handleOnChange}
        type="file"
      />
      <p className="w-fit mx-auto">errorMessage</p>
      <button type="button" onClick={handleUploadFile}>
        upload
      </button>
      {files.length && <img src={URL.createObjectURL(files[0])} />}
    </div>
  );
};
export default FileUploadField;
