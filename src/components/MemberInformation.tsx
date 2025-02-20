//#region Imports
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  WarningCircle,
  Copy,
  ArrowsCounterClockwise,
} from "@phosphor-icons/react";
import { memberData } from "./MemberTable";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useParams } from "react-router-dom";
//#endregion

const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

//#region Interfaces
interface MemberInformationProps {
  member: memberData;
  className?: string;
  isStateUpdate: boolean;
  setIsStateUpdate: Dispatch<SetStateAction<boolean>>;
}
//#endregion

/**
 * Renders a member information component.
 * @param errorText - The error text to be displayed.
 * @returns
 */
const MemberInformation = ({ member, className, isStateUpdate, setIsStateUpdate }: MemberInformationProps) => {
  const { id } = useParams();

  const [copied, setCopied] = useState<boolean>(false);
  const fields = [
    { label: "Member Link", value: window.location.href },
    { label: "Member Last Name", value: member.lastName },
    { label: "Member Password", value: member.passcode },
  ];

  const updatePassword = async (newPass: string) => {
    await updateDoc(doc(database, "users", id!), {
      passcode: newPass,
    })
  }



  /**
   * Handles the generate password event.
   */
  const handleGeneratePassword = async () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    await updatePassword(result);
    setIsStateUpdate(!isStateUpdate);
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGeneratePassword();
                  }}
                />
              ) : null}
              <Copy
                size={28}
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(field.value)
                }}
              />
            </div>
          </div>
        </div>
      ))}
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
