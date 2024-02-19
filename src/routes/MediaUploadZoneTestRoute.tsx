import React from "react";
import MediaUploadZone from "@/components/MediaUploadZone";

const MediaUploadZonetestRoute: React.FC = () => {
  const handleFilesDropped = (files: File[]) => {
    // handle file
    console.log("Dropped files:", files);
  };

  return (
    <div className="grid place-items-center h-screen ">
      <div className="w-96 h-64 text-base">
        <MediaUploadZone onFilesDropped={handleFilesDropped} />
      </div>
    </div>
  );
};

export default MediaUploadZonetestRoute;
