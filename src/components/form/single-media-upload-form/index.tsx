import React from "react";
import FileUploadField from "../../common/input/file-upload-field";
import { useState } from "react";
import Button from "../../common/button";
import { useRef } from "react";
import clsx from "clsx";

const SingleMediaUploadForm = (props: {
  onFileUpload: (data: FormData) => Promise<void>;
  value?: string;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const ref = useRef<HTMLInputElement>(null);
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(props.value);
  const onFileChoosen = (f: File[]) => {
    setFiles(f);
    setValue(URL.createObjectURL(f[0]));
    setDisable(false);
  };
  const handleUploadFile = async () => {
    setLoading(true);
    const formData = new FormData();
    for (const file of files) {
      formData.append("files", file);
    }
    await props.onFileUpload(formData);
    setLoading(false);
  };

  return (
    <div className="w-1/3">
      <FileUploadField
        className={clsx(files.length > 0 && "invisible h-0 m-0", "my-4")}
        onFileChosen={onFileChoosen}
        filetypes={["image/jpeg", "image/png"]}
        forwardedRef={ref}
      />
      {value && (
        <img
          className="mb-4"
          onClick={() => {
            ref.current?.click();
          }}
          src={value}
        />
      )}

      {!disable && (
        <Button
          className="h-fit m-auto mt-4 w-1/2 my-4"
          onClick={handleUploadFile}
          type="button"
          variant="secondary"
          loading={loading}
        >
          Save
        </Button>
      )}
    </div>
  );
};
export default SingleMediaUploadForm;
