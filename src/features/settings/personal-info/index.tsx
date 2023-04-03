import type { FormEvent, ReactNode } from "react";
import React from "react";
import Input from "../../../components/common/input/input-field";
import TextArea from "../../../components/common/input/text-area";
import InputContainer from "../../../components/common/input/input-container";
import apis from "../../../services/apis";
import Button from "../../../components/common/button";
import type { User } from "../../../services/model.types";

const PersonalInfo = () => {
  const user: User = {
    firstName: "",
    midleName: "",
    lastName: "",
    email: "",
    hashPassword: "",
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(user);
    apis.users.create(user);
  };
  const Title = (props: { children?: ReactNode | undefined }) => (
    <span className="col-span-full font-futura font-bold text-[18px]">
      {props.children}
    </span>
  );
  return (
    <div className="page-container bg-primary-5">
      <div className="reponsive-container ">
        <form onSubmit={handleSubmit}>
          <div className="bg-primary-0 p-6 pb-8 grid grid-cols-3 grid-flow-row gap-4 w-[1366px] rounded border border-primary-15">
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
                required
                type="password"
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
                  user.intro = e.target.value.trim();
                }}
              />
            </InputContainer>
            <Button className="col-span-full m-auto w-1/3" type="submit">
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default PersonalInfo;
