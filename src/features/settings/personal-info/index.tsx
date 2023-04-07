import React from "react";
import type { FormEvent, ReactNode } from "react";
import Input from "../../../components/common/input/input-field";
import TextArea from "../../../components/common/input/text-area";
import InputContainer from "../../../components/common/input/input-container";
import apis from "../../../services/apis";
import Button from "../../../components/common/button";
import type { User } from "../../../services/model.types";
import SingleMediaUploadForm from "../../../components/form/single-media-upload-form";

const PersonalInfo = () => {
  const user: User = {
    firstName: "",
    midleName: "",
    lastName: "",
    email: "",
    hashPassword: "",
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const error = await apis.users.create(user);
    if (error) {
      alert(error);
    } else {
      alert("success");
    }
  };
  const Title = (props: { children?: ReactNode | undefined }) => (
    <span className="col-span-full font-futura font-bold text-[18px]">
      {props.children}
    </span>
  );
  const handlepProfileUpload = async (formData: FormData) => {
    const error = await apis.uploads.profile(formData);
    if (error) {
      alert(error);
    } else {
      alert("success");
    }
  };
  return (
    <div className="page-container bg-primary-5">
      <div className="reponsive-container ">
        <form
          onSubmit={handleSubmit}
          className="bg-primary-0 rounded border border-primary-15 p-6 pb-8"
        >
          <Title>Profile</Title>
          <SingleMediaUploadForm onFileUpload={handlepProfileUpload} />
          <div className=" grid grid-cols-3 grid-flow-row gap-4 w-[1366px] ">
            <Title>General infomation</Title>
            <InputContainer lable="First name" required>
              <Input
                required
                onBlur={(e) => {
                  user.firstName = e.target.value.trim();
                }}
              />
            </InputContainer>
            <InputContainer lable="Midle name">
              <Input
                onBlur={(e) => {
                  user.midleName = e.target.value.trim();
                }}
              />
            </InputContainer>
            <InputContainer lable="Last name" required>
              <Input
                required
                onBlur={(e) => {
                  user.lastName = e.target.value.trim();
                }}
              />
            </InputContainer>
            <InputContainer lable="Email" required>
              <Input
                required
                type="email"
                onBlur={(e) => {
                  user.email = e.target.value;
                }}
              />
            </InputContainer>
            <InputContainer lable="Password" required>
              <Input
                type="password"
                required
                defaultValue="123456"
                onBlur={(e) => {
                  user.hashPassword = e.target.value;
                }}
              />
            </InputContainer>
            <Title>Contact</Title>
            <InputContainer lable="Phone">
              <Input
                type="number"
                onBlur={(e) => {
                  user.phone = parseInt(e.target.value);
                }}
              />
            </InputContainer>
            <InputContainer lable="Address">
              <Input
                onBlur={(e) => {
                  user.address = e.target.value.trim();
                }}
              />
            </InputContainer>
            <Title>Detail infomation</Title>
            <InputContainer lable="You are">
              <Input
                onBlur={(e) => {
                  user.intro = e.target.value.trim();
                }}
              />
            </InputContainer>
            <InputContainer lable="About you">
              <Input
                onBlur={(e) => {
                  user.aboutMe = e.target.value.trim();
                }}
              />
            </InputContainer>
            <InputContainer lable="Job titile">
              <Input
                onBlur={(e) => {
                  user.title = e.target.value.trim();
                }}
              />
            </InputContainer>
            <InputContainer lable="Description" className="col-span-full">
              <TextArea
                onBlur={(e) => {
                  user.description = e.target.value.trim();
                }}
              />
            </InputContainer>
            <Button className="col-span-full mr-auto" type="submit">
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default PersonalInfo;
