import type { InputHTMLAttributes } from "react";
import React from "react";
import clsx from "clsx";
import { useState } from "react";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}
const Input = (props: inputProps) => {
  const [error, setError] = useState(props.error);
  return (
    <div>
      <input
        {...props}
        className={clsx(
          "bg-primary-10 text-neutral-light rounded font-muli focus-visible:outline-none min-h-[45px] w-full p-1 pl-3 ",
          props.className
        )}
      />
      <p className="text-[#FF0000] pl-2 font-[14px]">{error}</p>
    </div>
  );
};
export default Input;
