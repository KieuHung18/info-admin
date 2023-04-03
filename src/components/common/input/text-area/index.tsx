import React from "react";
import type { TextareaHTMLAttributes } from "react";
import clsx from "clsx";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;
const TextArea = (props: TextAreaProps) => (
  <textarea
    {...props}
    className={clsx(
      "font-muli bg-primary-10 focus-visible:outline-none w-full min-h-[180px] rounded p-1 pl-3",
      props.className
    )}
  />
);
export default TextArea;
