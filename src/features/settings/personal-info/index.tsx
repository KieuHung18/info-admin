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
  const [refresh, setRefresh] = useState(false);
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

  const customSection = user.metadata?.map((metadata, i) => {
    return (
      <InputContainer key={i} lable="Section name" className="ml-8" required>
        <Input
          required
          defaultValue={metadata.section}
          onBlur={(e) => {
            metadata.section = e.target.value.trim();
          }}
        />
        {metadata.sectionItems?.map((sectionItem, i) => {
          return (
            <div className="ml-8">
              <InputContainer key={"sectionItem_" + i} lable="Name" required>
                <Input
                  required
                  defaultValue={sectionItem.name}
                  onBlur={(e) => {
                    sectionItem.name = e.target.value.trim();
                  }}
                />
              </InputContainer>
              <InputContainer
                key={"sectionItem_" + i}
                lable="Experience"
                required
              >
                <Input
                  type="number"
                  required
                  defaultValue={sectionItem.experience}
                  onBlur={(e) => {
                    sectionItem.experience = parseInt(e.target.value);
                  }}
                />
              </InputContainer>
              <Button
                className="col-span-full mr-auto my-4"
                type="button"
                onClick={() => {
                  metadata.sectionItems?.splice(
                    metadata.sectionItems.indexOf(sectionItem),
                    1
                  );
                  setRefresh(!refresh);
                }}
              >
                Delete section item
              </Button>
            </div>
          );
        })}
        <Button
          className="col-span-full mr-auto my-4"
          type="button"
          onClick={() => {
            if (!metadata.sectionItems) {
              metadata.sectionItems = [];
            }
            metadata.sectionItems.push({});
            setRefresh(!refresh);
          }}
        >
          Add section item
        </Button>
        <Button
          className="col-span-full mr-auto"
          type="button"
          onClick={() => {
            user.metadata?.splice(user.metadata.indexOf(metadata), 1);
            setRefresh(!refresh);
          }}
        >
          Delete section
        </Button>
      </InputContainer>
    );
  });
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
            <InputContainer lable="Custom section">
              {customSection}
              <Button
                className="col-span-full mr-auto"
                type="button"
                onClick={() => {
                  if (!user.metadata) {
                    user.metadata = [];
                  }
                  user.metadata.push({});
                  setRefresh(!refresh);
                }}
              >
                Add section
              </Button>
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
