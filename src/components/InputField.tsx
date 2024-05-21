import { WarningCircle } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { PiMountainsLight } from "react-icons/pi";
import { twMerge } from "tailwind-merge";

export interface InputFieldProps {
  type: string;
  error: boolean;
  label?: string; // Optional; Default to none.
  required: boolean;
}

function InputField({ type, error, label, required }: InputFieldProps) {
  // todo: functionality
  const inputRef = useRef<HTMLTextAreaElement>(null);

  function checkLen(event: { preventDefault: () => void }) {
    event.preventDefault();
    if (inputRef.current) {
      if (inputRef.current.value.trim() === "" && required === true) {
        console.log("Required Input is empty");
      }
    }
  }

  return (
    <div className={twMerge(" w-full h-full flex flex-col")}>
      {required === false ? (
        ""
      ) : (
        <label className="h-[24] font-extrabold block mb-1 ml-1 text-sm text-light-500 dark:text-white">
          {label} <span className="text-red-500"> * </span>
        </label>
      )}
      <div className=" flex-grow">
        {error !== true ? (
          <textarea
            placeholder={"Enter " + type + "..."}
            ref={inputRef}
            onSelect={checkLen}
            // first-line:bg-gray-50
            className="bg-white resize-none h-full text-left  text-sm rounded-lg focus:outline-none  block w-full p-2.5  dark:text-black"
          ></textarea>
        ) : (
          <div>
            <textarea
              placeholder={"Enter " + type + "..."}
              ref={inputRef}
              onSelect={checkLen}
              // first-line:bg-gray-50
              className=" bg-white resize-none	h-full text-left  text-sm rounded-lg focus:outline-none   block w-full p-2.5  dark:text-black"
            ></textarea>

            <div className="flex mt-1 align-middle">
              <WarningCircle color="red" className="mr-1" size={"1.1em"} />
              <span className="text-red-500 text-xs "> Error {type} </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InputField;
