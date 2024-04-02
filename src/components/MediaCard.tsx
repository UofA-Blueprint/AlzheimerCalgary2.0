import { useState, ReactNode, ChangeEvent } from "react";
import { PiMountainsLight } from "react-icons/pi";
import { twMerge } from "tailwind-merge";
import { TiTick } from "react-icons/ti";

interface MediaCardProps {
  image?: ReactNode;
  selected?: boolean;
  textInputted?: string;
  children?: ReactNode;
  id: string;
}

interface CheckBoxProps {
  id: string;
  checked?: boolean;
  readOnly?: boolean;
  className?: string;
}

export const CheckBox = ({ id, className, ...props }: CheckBoxProps) => {
  const [checked, setChecked] = useState(false);
  const checkHandler = (e: ChangeEvent<HTMLInputElement>) => {
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
}: MediaCardProps) {
  const [text, setText] = useState(textInputted);
  const [error, setError] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Add this line

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setIsTyping(true);
    if (e.target.value === "") {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleBlur = () => {
    setIsTyping(false);
    setIsEditing(false); // Add this line
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center ">
      <div className="h-3/4 bg-neutrals-light-400 w-full rounded-t-lg relative">
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
      <div className="h-1/4 w-full rounded-b-lg bg-white">
        {/* text -comment */}
        <div className="w-full">
          <div className="px-2">
            {isEditing ? ( // Add this block
              <input
                className=" "
                type="text"
                value={text}
                onChange={handleTextChange}
                onBlur={handleBlur}
                onClick={() => setError(false)}
              />
            ) : (
              <p onDoubleClick={() => setIsEditing(true)}>{text}</p>
            )}
            {error && (
              <p className="text-red-500">Error: Text cannot be empty</p>
            )}
            {isTyping && <div className="flex flex-row"></div>}
          </div>
        </div>
        <div className="flex flex-row justify-between px-2 text-[10px] 	text-slate-500">
          {children}
        </div>
      </div>
    </div>
  );
}

export default MediaCard;
