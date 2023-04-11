import type { InputHTMLAttributes } from "react";
import React from "react";
import clsx from "clsx";
import { useState } from "react";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}
const Input = (props: inputProps) => {
  const [error, setError] = useState(props.error);
  return (
    <div>
      <input
        {...props}
        className={clsx(
          "bg-primary-10 text-neutral-light rounded font-muli focus-visible:outline-none min-h-[45px] w-full p-1 pl-3",
          props.className
        )}
        onBlur={(e) => {
          if (props.required && e.target.value === "") {
            setError("Please fill out this field");
          } else setError(props.error);
          if (props.onBlur) {
            props.onBlur(e);
          }
        }}
      />
      <p className="text-[#FF0000] pl-2 font-[14px]">{error}</p>
    </div>
  );
};
export default Input;
