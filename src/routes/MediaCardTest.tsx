import MediaCard from "@/components/MediaCard";
import { VscKebabVertical } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";
import { useState, ReactNode, ChangeEvent } from "react";

function MediaCardTest() {
  const [editText, setEditText] = useState("Edit text");

  const handleDoubleClick = () => {
    setEditText("");
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-[#CBD0DA]">
      <div className="flex flex-row">
        <div className="w-64 h-[240px]  m-6">
          <MediaCard
            id="1"
            textInputted={editText}
            onDoubleClick={handleDoubleClick}
          >
            <div>Oct. 2, 2023</div>
            <VscKebabVertical className="h-[2em]" />
          </MediaCard>
        </div>
        <div className="w-32 h-64  m-6">
          <MediaCard id="2"></MediaCard>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="w-32 h-32  m-6">
          <MediaCard id="3"></MediaCard>
        </div>
        <div className="w-32 h-32  m-6">
          <MediaCard id="4"></MediaCard>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="w-32 h-32  m-6">
          <MediaCard id="5"></MediaCard>
        </div>
        <div className="w-32 h-32  m-6">
          <MediaCard id="6"></MediaCard>
        </div>
      </div>
    </div>
  );
}

export default MediaCardTest;
