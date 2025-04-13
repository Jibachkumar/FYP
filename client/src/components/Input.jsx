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
        className={` text-[13px]  text-center focus:outline-none  rounded-md bg-slate-50 placeholder-slate-300 shadow-sm ${className}`}
        onFocus={(e) => (e.target.placeholder = "")} // Hide placeholder on focus
        //onBlur={(e) => (e.target.placeholder = placeholder || "")} // Show placeholder back on blur
      />
    </div>
  );
});

export default Input;
