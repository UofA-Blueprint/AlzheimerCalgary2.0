import MediaCard from "@/components/MediaCard";
import { VscKebabVertical } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";
import { useState, ReactNode, ChangeEvent } from "react";

function MediaCardTest() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-[#CBD0DA]">
      <div className="flex flex-row">
        <div className="w-64 h-[240px]  m-6">
          <MediaCard id="1" textInputted={"something"} date="test"></MediaCard>
        </div>
        <div className="w-32 h-64  m-6">
          <MediaCard id="2" date=""></MediaCard>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="w-32 h-32  m-6">
          <MediaCard id="3" date=""></MediaCard>
        </div>
        <div className="w-32 h-32  m-6">
          <MediaCard id="4" date=""></MediaCard>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="w-32 h-32  m-6">
          <MediaCard id="5" date=""></MediaCard>
        </div>
        <div className="w-32 h-32  m-6">
          <MediaCard id="6" date=""></MediaCard>
        </div>
      </div>
    </div>
  );
}

export default MediaCardTest;
