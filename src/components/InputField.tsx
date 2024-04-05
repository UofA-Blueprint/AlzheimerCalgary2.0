import { WarningCircle } from "@phosphor-icons/react";
import { useRef, useState } from "react";

export interface InputFieldProps {
  type: string;
  error: boolean;
  label?: string; // Optional; Default to none.
  required: boolean;
}

function InputField({ type, error, label, required }: InputFieldProps) {
  // todo: functionality
  const inputRef = useRef<HTMLInputElement>(null);

  function checkLen(event: { preventDefault: () => void }) {
    event.preventDefault();
    if (inputRef.current) {
      if (inputRef.current.value.trim() === "" && required === true) {
        console.log("Required Input is empty");
      }
    }
  }

  return (
    <div className="w-[30em]">
      {required === false ? (
        <label className="font-extrabold block mb-1 ml-1 text-sm text-light-500">
          {label}
        </label>
      ) : (
        <label className="font-extrabold block mb-1 ml-1 text-sm text-light-500">
          {label} <span className="text-red-500"> * </span>
        </label>
      )}

      {error !== true ? (
        <input
          placeholder={"Enter " + type + "..."}
          type={type}
          ref={inputRef}
          onSelect={checkLen}
          className="bg-gray-50 border  border-gray-300 text-sm rounded-lg focus:outline-none focus:drop-shadow-[0_0px_5px_rgba(0,0,0,0.25)] hover:outline-none hover:drop-shadow-[0_0px_5px_rgba(0,0,0,0.25)] block w-full p-2.5  dark:text-black"
        ></input>
      ) : (
        <div>
          <input
            placeholder={"Enter " + type + "..."}
            type={type}
            ref={inputRef}
            onSelect={checkLen}
            className="bg-gray-50 border  border-red-500 text-light-500 text-sm rounded-lg focus:outline-none focus:drop-shadow-[0_0px_5px_rgba(0,0,0,0.25)] hover:outline-none hover:drop-shadow-[0_0px_5px_rgba(0,0,0,0.25)] block w-full p-2.5  dark:text-black"
          ></input>

          <div className="flex mt-1 align-middle">
            <WarningCircle
              color="red"
              className="mr-1"
              size={"1.1em"}
            />
            <span className="text-red-500 text-xs "> Error {type} </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default InputField;
