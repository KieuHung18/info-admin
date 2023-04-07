import type { FormEvent } from "react";
import React from "react";
import Button from "../../components/common/button";
import Input from "../../components/common/input/input-field";
import TextArea from "../../components/common/input/text-area";
import InputContainer from "../../components/common/input/input-container";

const ComponentsDemo = () => {
  const testValue = (event: FormEvent | any) => {
    event.preventDefault();
  };
  return (
    <div className="min-h-[100vh] bg-primary-5">
      <TextArea />
      <form action="" onSubmit={testValue}>
        <InputContainer lable="name" required>
          <Input error="hehe" />
        </InputContainer>
        <Button
          type="submit"
          className="text-red-500 w-32"
          variant={"primary"}
          size="small"
        >
          submit
        </Button>
      </form>
      <div>Hello Admin click to connect backend</div>
      <h1 className="text-3xl font-bold text-red-600">Hello world!</h1>
      <div></div>
    </div>
  );
};
export default ComponentsDemo;
