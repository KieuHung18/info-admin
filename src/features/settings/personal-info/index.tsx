import React, { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import Input from "../../../components/common/input/input-field";
import TextArea from "../../../components/common/input/text-area";
import InputContainer from "../../../components/common/input/input-container";
import apis from "../../../services/apis";
import Button from "../../../components/common/button";
import type { UserProps } from "../../../services/model.types";
import SingleMediaUploadForm from "../../../components/form/single-media-upload-form";

const PersonalInfo = () => {
  const [user, setUser] = useState<UserProps>({});
  const [btnLoading, setBtnLoading] = useState(false);
  const getUser = async () => {
    const [fetchData, error] = await apis.auth.session();
    if (error) {
      alert(error.message);
    } else {
      setUser(fetchData);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  const updateUser = async () => {
    const [fetchData, error] = await apis.users.update(user.id as string, user);
    if (error) {
      alert(error.message);
    } else {
      getUser();
      alert(fetchData);
    }
  };
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setBtnLoading(true);
    await updateUser();
    setBtnLoading(false);
  };

  const handlepProfileUpload = async (formData: FormData) => {
    const [fetchData, error] = await apis.uploads.create(formData);

    if (error) {
      alert(error.message);
    } else {
      user.profile = fetchData[0];
      updateUser();
    }
  };
  const Title = (props: { children?: ReactNode | undefined }) => (
    <span className="col-span-full font-futura font-bold text-[18px]">
      {props.children}
    </span>
  );
  return (
    <div className="page-container bg-primary-5">
      <div className="responsive-container ">
        <form
          onSubmit={handleSubmit}
          className="bg-primary-0 rounded border border-primary-15 p-6 pb-8"
        >
          <Title>Profile</Title>
          {user.profile ? (
            <>
              <SingleMediaUploadForm
                value={user.profile.url}
                onFileUpload={handlepProfileUpload}
              />
            </>
          ) : (
            <SingleMediaUploadForm onFileUpload={handlepProfileUpload} />
          )}

          <div className=" grid grid-cols-3 grid-flow-row gap-4 w-[1366px] ">
            <Title>General infomation</Title>
            <InputContainer lable="First name" required>
              <Input
                required
                defaultValue={user?.firstName}
                onBlur={(e) => {
                  user.firstName = e.target.value.trim();
                }}
              />
            </InputContainer>
            <InputContainer lable="Midle name">
              <Input
                defaultValue={user?.middleName}
                onBlur={(e) => {
                  user.middleName = e.target.value.trim();
                }}
              />
            </InputContainer>
            <InputContainer lable="Last name" required>
              <Input
                defaultValue={user?.lastName}
                required
                onBlur={(e) => {
                  user.lastName = e.target.value.trim();
                }}
              />
            </InputContainer>
            <InputContainer lable="Email" required>
              <Input
                defaultValue={user?.email}
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
                defaultValue={user?.phone}
                type="number"
                onBlur={(e) => {
                  user.phone = e.target.value;
                }}
              />
            </InputContainer>
            <InputContainer lable="Address">
              <Input
                defaultValue={user?.address}
                onBlur={(e) => {
                  user.address = e.target.value.trim();
                }}
              />
            </InputContainer>
            <Title>Detail infomation</Title>
            <InputContainer lable="You are">
              <Input
                defaultValue={user?.intro}
                onBlur={(e) => {
                  user.intro = e.target.value.trim();
                }}
              />
            </InputContainer>
            <InputContainer lable="About you">
              <Input
                defaultValue={user?.aboutMe}
                onBlur={(e) => {
                  user.aboutMe = e.target.value.trim();
                }}
              />
            </InputContainer>
            <InputContainer lable="Job titile">
              <Input
                defaultValue={user?.title}
                onBlur={(e) => {
                  user.title = e.target.value.trim();
                }}
              />
            </InputContainer>
            <InputContainer lable="Description" className="col-span-full">
              <TextArea
                defaultValue={user?.description}
                onBlur={(e) => {
                  user.description = e.target.value.trim();
                }}
              />
            </InputContainer>
            <Button
              loading={btnLoading}
              className="col-span-full mr-auto"
              type="submit"
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default PersonalInfo;
