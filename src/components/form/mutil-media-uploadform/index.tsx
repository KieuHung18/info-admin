import React, { ReactNode } from "react";
import FileUploadField from "../../common/input/file-upload-field";
import { useState } from "react";
import Button from "../../common/button";
import { useRef } from "react";
import type { ImageProps } from "../../../services/model.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import apis from "../../../services/apis";

const MultiMediaUploadForm = (props: {
  onFileUpload: (data: FormData) => Promise<void>;
  onFileDelete: (data: ImageProps[]) => Promise<void>;
  defaultValues?: ImageProps[];
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const ref = useRef<HTMLInputElement>(null);
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState<ImageProps[]>([]);
  if (!values.length && props.defaultValues?.length) {
    setValues(props.defaultValues);
  }
  const onFileChoosen = (files: File[]) => {
    setFiles(files);
    for (const file of files) {
      values?.push({
        url: URL.createObjectURL(file),
      });
    }
    setDisable(false);
  };
  const handleDetele = async (image: ImageProps) => {
    const tempValues = [...values];
    tempValues.splice(values.indexOf(image), 1);
    setValues(tempValues);
    if (image.publicId) {
      const [fetchData, error] = await apis.uploads.delete(image.publicId);
      if (error) {
        return;
      } else {
        props.onFileDelete(tempValues);
      }
    }
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
  const previewImage = values?.map((value, i) => {
    return (
      <div className="h-fit">
        <div className="flex">
          <Button
            size="small"
            onClick={() => {
              handleDetele(value);
            }}
          >
            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
          </Button>
        </div>
        <img key={i} className="mb-4" src={value.url} />
      </div>
    );
  });
  return (
    <div className="w-1/3">
      <FileUploadField
        onFileChosen={onFileChoosen}
        filetypes={["image/jpeg", "image/png"]}
        multiple
        forwardedRef={ref}
      />
      <div className="grid grid-cols-3 grid-flow-row gap-4">{previewImage}</div>

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
export default MultiMediaUploadForm;
