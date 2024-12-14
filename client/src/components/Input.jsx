import React from "react";
import { v4 as uuidv4 } from "uuid"; // Import uuid function from the uuid library

// for passing data to parent component using forwardRef hook
const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = uuidv4();
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className={`text-[17px] font-medium font-serif pr-[2px]}`}
        >
          {label}
        </label>
      )}

      <input
        type={type}
        ref={ref}
        id={id}
        {...props}
        className={` text-[13px] focus:outline-none  rounded-md bg-slate-50 placeholder-gray-500 shadow-sm ${className}`}
      />
    </div>
  );
});

export default Input;
