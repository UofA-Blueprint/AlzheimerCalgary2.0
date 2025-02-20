//#region Imports
import { useEffect, useState } from "react";
import {
  WarningCircle,
  Copy,
  ArrowsCounterClockwise,
} from "@phosphor-icons/react";
import { memberData } from "./MemberTable";
//#endregion

//#region Interfaces
interface MemberInformationProps {
  member: memberData;
  className?: string;
}
//#endregion

/**
 * Renders a member information component.
 * @param errorText - The error text to be displayed.
 * @returns
 */
const MemberInformation = ({ member, className }: MemberInformationProps) => {
  const [lastName, setLastName] = useState<string>(member.name);
  const [link, setLink] = useState<string>(window.location.href);
  const [errorText, setErrorText] = useState<string>("");

  const [password, setPassword] = useState<string>();
  const [copied, setCopied] = useState<boolean>(false);
  const fields = [
    { label: "Member Link", value: link },
    { label: "Member Last Name", value: lastName },
    { label: "Member Password", value: password || "" },
  ];

  //#region functions
  useEffect(() => {
    handleGeneratePassword();
  }, []);

  /**
   * Handles the generate password event.
   */
  const handleGeneratePassword = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setPassword(result);
  };

  /**
   * Handles the copy event for the text.
   *
   * @param {string} text - The text to be copied.
   */
  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
  };
  //#endregion

  setTimeout(() => {
    setCopied(false);
  }, 2500);

  return (
    <div
      className={`flex flex-col gap-y-4 w-[90vw] md:w-[50vw] max-w-2xl text-sm md:text-base bg-neutrals-light-100 p-8 rounded-lg font-display ${className}`}
    >
      {/* title */}
      <div className="flex items-center text-xl md:text-2xl gap-x-2 font-semibold">
        <WarningCircle size={28} />
        <p>Member Information</p>
      </div>

      {fields.map((field, index) => (
        <div
          key={index}
          className="flex items-center justify-between"
        >
          {/* Label */}
          <p className="capitalize font-semibold">{field.label}</p>

          {/* Value */}
          <div className="flex gap-x-2 items-center">
            <p className="opacity-50">{field.value}</p>
            <div className="flex gap-x-2 items-center justify-center text-primary-main">
              {field.label.toLowerCase() === "member password" ? (
                <ArrowsCounterClockwise
                  size={28}
                  className="cursor-pointer"
                  onClick={handleGeneratePassword}
                />
              ) : null}
              <Copy
                size={28}
                className="cursor-pointer"
                onClick={() => handleCopy(field.value)}
              />
            </div>
          </div>
        </div>
      ))}
      {/* Error */}
      {errorText && (
        <div className="flex items-center gap-x-2 text-status-red-main">
          <WarningCircle size={20} />
          <p>{errorText}</p>
        </div>
      )}

      {/* Copied Alert*/}
      <p
        className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white py-2 px-3 rounded-lg transition ease-in-out ${copied ? "opacity-100" : "opacity-0"
          }`}
      >
        Copied
      </p>
    </div>
  );
};

export { MemberInformation };
