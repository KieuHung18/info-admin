import React from "react";
import type { ReactNode } from "react";
import clsx from "clsx";

interface InputContainerProps {
  className?: string;
  children?: ReactNode | undefined;
  required?: boolean;
  lable?: string;
}
const InputContainer = (props: InputContainerProps) => (
  <div className={clsx("", props.className)}>
    <label className="font-futura font-bold text-primary-20 text-[15px] ">
      {props.lable}
    </label>
    {props.required && <span className="text-[#FF0000]">*</span>}
    <div className="mt-2">{props.children}</div>
  </div>
);
export default InputContainer;
