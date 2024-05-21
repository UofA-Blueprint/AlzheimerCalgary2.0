import { useState, ReactNode, ChangeEvent } from "react";
import { PiMountainsLight } from "react-icons/pi";
import { twMerge } from "tailwind-merge";
import { TiTick } from "react-icons/ti";
import InputField from "./InputField";
import { VscKebabVertical } from "react-icons/vsc";
import { LuCopy } from "react-icons/lu";

interface MediaCardProps {
  image?: ReactNode;
  selected?: boolean;
  textInputted?: string;
  children?: ReactNode;
  id: string;
  date: string;
}

interface CheckBoxProps {
  id: string;
  checked?: boolean;
  readOnly?: boolean;
  className?: string;
}

export const CheckBox = ({ id, className, ...props }: CheckBoxProps) => {
  const [checked, setChecked] = useState(false);
  const checkHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    setChecked(e.currentTarget.checked);
  };
  return (
    <label htmlFor={id} className={className}>
      <input
        type="checkbox"
        {...props}
        onClick={checkHandler}
        id={id}
        className="sr-only"
      />
      <span
        className={twMerge(
          "block w-4 h-4 border border-black rounded",
          checked ? "bg-primary-light" : "bg-white"
        )}
      >
        {checked && <TiTick className="text-white font-light" />}
      </span>
    </label>
  );
};

function MediaCard({
  image,
  selected,
  textInputted,
  children,
  id,
  date,
}: MediaCardProps) {
  const [text, setText] = useState(textInputted);
  const [error, setError] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Add this line
  const [isTime, setIsTime] = useState("");

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setIsTyping(true);
    if (e.target.value === "") {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center ">
      <div className="flex-grow bg-neutrals-light-400 w-full rounded-t-lg relative">
        {/* picture */}
        <div className="bg-neutrals-light-400 flex items-center justify-center h-full  rounded-t-lg ">
          {image ? image : <PiMountainsLight size="2em" />}
        </div>
        <CheckBox
          id={id}
          className="absolute top-0 right-0 m-2 transform scale-150"
          checked={selected}
          readOnly
        />
      </div>
      {isEditing ? (
        <div className="h-[70px] w-full bg-white">
          <div className="w-full h-full">
            <InputField type="text" error={false} required={false} />
          </div>
          <div className="flex flex-row justify-between px-2 text-[10px] 	text-slate-500">
            {children}
          </div>
          <div className=" flex flex-row bg-white rounded-b-lg justify-between pb-3  text-slate-500">
            <div className="text-[11px] pl-3 text-gray text-light-500">
              12 OCt, 2024
            </div>
            <div className="flex flex-row mr-3 w-[60px] justify-around ">
              <div className="text-[11px] pr-2 ">123456</div>
              <button className="text-[11px]">
                <LuCopy />
              </button>
              <button className="text-[11px]">
                <VscKebabVertical className=""></VscKebabVertical>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[70px] w-full rounded-b-lg bg-white">
          <div className="w-full">
            <div className="px-2">
              <p onDoubleClick={() => setIsEditing(true)}>{text}</p>
            </div>
          </div>
          <div className="flex flex-row justify-between px-2 text-[10px] 	text-slate-500">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default MediaCard;
