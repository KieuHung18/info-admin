import React from "react";
import clsx from "clsx";

interface SpinnerProps {
  size?: "large" | "medium" | "small";
}

const Spinner = (props: SpinnerProps) => (
  <div
    className={clsx(
      "flex items-center justify-center",
      { "h-[24px] w-[24px]": props.size === "large" },
      { "h-[20px] w-[20px]": props.size === "medium" },
      { "h-[16px] w-[16px]": props.size === "small" }
    )}
  >
    <svg className="animate-spin h-5 w-5 " fill="none" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  </div>
);

export default Spinner;
