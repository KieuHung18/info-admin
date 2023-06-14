import React, { useState, useRef, useEffect } from "react";
import type { FormEvent } from "react";
import JoditEditor from "jodit-react";
import InputContainer from "../../../components/common/input/input-container";
import Input from "../../../components/common/input/input-field";
import TextArea from "../../../components/common/input/text-area";
import Button from "../../../components/common/button";
import MultiMediaUploadForm from "../../../components/form/mutil-media-uploadform";
import apis from "../../../services/apis";
import type { ImageProps, ProjectProps } from "../../../services/model.types";
import { useNavigate, useParams } from "react-router-dom";

const NewProject = () => {
  const editor = useRef(null);
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);
  const [project, setProject] = useState<ProjectProps>({});
  const { id } = useParams();
  //if have id then update else create new
  const getProject = async () => {
    if (!id) {
      return {};
    }
    const [fetchData, error] = await apis.projects.retrieve(id);
    if (fetchData) {
      setProject(fetchData);
    } else {
      navigate("/projects");
      alert(error.message);
    }
  };

  useEffect(() => {
    getProject();
  }, []);
  const submitProject = async () => {
    let fetchData, error;
    if (id) {
      [fetchData, error] = await apis.projects.update(id, project);
    } else {
      [fetchData, error] = await apis.projects.create(project);
    }
    if (fetchData) {
      alert("Success");
    } else {
      alert(error.message);
    }
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setBtnLoading(true);
    await submitProject();
    setBtnLoading(false);
  };

  const handleDelete = async (event: FormEvent) => {
    if (id) {
      event.preventDefault();
      navigate("/projects");
      const [fetchData, error] = await apis.projects.delete(id);
      if (fetchData) {
        navigate("/projects");
        alert("Success");
      } else {
        alert(error.message);
      }
    }
  };
  const handleFileDelete = async (images: ImageProps[]) => {
    project.images = images;
    submitProject();
  };
  const handleFileUpload = async (formData: FormData) => {
    const [fetchData, error] = await apis.uploads.create(formData);
    if (error) {
      alert(error.message);
    } else {
      project.images = fetchData.concat(project.images);
      submitProject();
    }
  };
  return (
    <div className="page-container bg-primary-5">
      <div className="responsive-container items-start">
        <form
          onSubmit={handleSubmit}
          className="bg-primary-0 rounded border border-primary-15 p-6 pb-8 min-w-[50vw]"
        >
          <InputContainer lable="Project name" required>
            <Input
              defaultValue={project.name}
              required
              onBlur={(e) => {
                project.name = e.target.value.trim();
              }}
            />
          </InputContainer>
          <InputContainer lable="Project description" required>
            <TextArea
              defaultValue={project.description}
              required
              onBlur={(e) => {
                project.description = e.target.value.trim();
              }}
            />
          </InputContainer>
          <InputContainer lable="Content" required>
            <JoditEditor
              ref={editor}
              value={project.content ? project.content : ""}
              config={{ theme: "dark", height: 500 }}
              onBlur={(newContent) => {
                project.content = newContent;
              }}
            />
          </InputContainer>
          <InputContainer lable="Publish project">
            <input
              type="checkbox"
              checked={project.publish}
              onChange={(e) => {
                project.publish = e.target.checked;
              }}
            />
          </InputContainer>
          <Button
            loading={btnLoading}
            className="col-span-full mr-auto mt-2"
            type="submit"
          >
            Submit
          </Button>
          {id && (
            <Button
              onClick={handleDelete}
              loading={btnLoading}
              className="col-span-full mr-auto mt-2"
              type="button"
            >
              Delete
            </Button>
          )}
        </form>
        <MultiMediaUploadForm
          defaultValues={project.images}
          onFileUpload={handleFileUpload}
          onFileDelete={handleFileDelete}
        ></MultiMediaUploadForm>
      </div>
    </div>
  );
};
export default NewProject;
