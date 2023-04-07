import React from "react";
import FileUploadField from "../../common/input/file-upload-field";
import { useState } from "react";
import Button from "../../common/button";
import { useRef } from "react";
import clsx from "clsx";

const SingleMediaUploadForm = (props: {
  onFileUpload: (data: FormData) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const ref = useRef<HTMLInputElement>(null);
  const [disable, setDisable] = useState(true);
  const onFileChoosen = (f: File[]) => {
    setFiles(f);
    setDisable(false);
  };
  const handleUploadFile = () => {
    const formData = new FormData();
    for (const file of files) {
      formData.append("files", file);
    }
    props.onFileUpload(formData);
  };

  return (
    <div className="w-1/3">
      <FileUploadField
        className={clsx(files.length > 0 && "invisible h-0 m-0", "my-4")}
        onFileChosen={onFileChoosen}
        filetypes={["image/jpeg", "image/png"]}
        forwardedRef={ref}
      />
      {files.length > 0 && (
        <img
          className="mb-4"
          onClick={() => {
            ref.current?.click();
          }}
          src={URL.createObjectURL(files[0])}
        />
      )}

      {!disable && (
        <Button
          className="h-fit m-auto mt-4 w-1/2 my-4"
          onClick={handleUploadFile}
          type="button"
          variant="secondary"
        >
          Save
        </Button>
      )}
    </div>
  );
};
export default SingleMediaUploadForm;
