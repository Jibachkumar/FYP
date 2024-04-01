import React from "react";
import { v4 as uuidv4 } from "uuid"; // Import uuid function from the uuid library

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = uuidv4();
  return (
    <div>
      {label && (
        <label htmlFor={id} className="text-[17px] font-medium font-serif pr-2">
          {label}
        </label>
      )}

      <input
        type={type}
        ref={ref}
        id={id}
        {...props}
        className={` text-[13px] p-[4px] w-[15rem] md:w-[20rem] focus:outline-none border rounded-md border-black opacity-[0.5] bg-slate-300 placeholder-gray-900 ${className}`}
      />
    </div>
  );
});

export default Input;
