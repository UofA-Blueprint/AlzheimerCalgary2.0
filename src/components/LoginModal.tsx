//#region Imports
import logoUrl from "@/assets/images/asc_logo.svg";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

import Button from "./Button";
import InputField from "./InputField";
import { InputCode } from "./InputCode";
//#endregion

//#region Interface
interface LoginModalProps {
  className?: string;
  title: string;
  type: "admin" | "member";
}
//#endregion

/**
 * Represents the login modal component.
 * @param {string} title - The title of the login modal.
 * @param {string} className - Additional TailwindCSS.
 * @returns
 */
const LoginModal = ({ className, title, type }: LoginModalProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passcode, setPasscode] = useState<Record<number, string>>({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
  });

  return (
    <div
      className={twMerge(
        "flex flex-col items-center justify-center gap-y-8 font-display bg-white py-8 px-6 rounded-2xl shadow-lg w-[90%] sm:w-[70%] md:w-[50%] max-w-[30rem]",
        className
      )}
    >
      {/* Logo  */}
      <img
        src={logoUrl}
        alt="ASC Logo"
      />

      {/* Title */}
      <h1 className="text-h3 text-center font-normal">{title}</h1>

      {/*Username field */}
      <InputField
        label={"Username"}
        error={username.length === 0}
        required={true}
        placeholder={"Username"}
        type={"text"}
        setInput={setUsername}
      />

      {type === "admin" ? (
        <InputField
          label={"Username"}
          error={username.length === 0}
          required={true}
          placeholder={"Username"}
          type={"text"}
          setInput={setUsername}
        />
      ) : (
        <InputCode
          input={passcode}
          required={true}
          label={"Verification Code"}
          setInput={setPasscode}
        />
      )}

      {/* Login Button */}
      <Button
        text="Login"
        disabled={username.length === 0 || password.length === 0 ? true : false}
      />
    </div>
  );
};

export { LoginModal };
