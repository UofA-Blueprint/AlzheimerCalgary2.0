import React from "react";
import MediaUploadZone from "@/components/MediaUploadZone";

const MediaUploadZonetestRoute: React.FC = () => {
  const handleFilesDropped = (files: File[]) => {
    // handle file
    console.log("Dropped files:", files);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="grid place-items-center h-screen ">
        {/* renember to put it in a parent div that is large enough */}
        <div className="w-9/12 h-64 mb-4 ">
          <MediaUploadZone onFilesDropped={handleFilesDropped} />
        </div>
      </div>
    </div>
  );
};

export default MediaUploadZonetestRoute;
