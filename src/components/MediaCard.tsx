import Button from "./Button";
import { useState, useRef } from "react";

function MediaCard({ image, selecting }) {
  return (
    <div className="w-ful h-full flex flex-col">
      {/* picture */}
      <div className="bg-primary-light">
        {image}
        {selecting && <input type="checkbox" checked={selected} readOnly />}
      </div>

      {/* text -comment */}
      <input type="text" />
      <div className=" flex flex-row"></div>
    </div>
  );
}

export default MediaCard;
