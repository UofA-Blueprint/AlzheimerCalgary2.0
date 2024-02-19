import { UploadSimple, WarningCircle } from "@phosphor-icons/react";
import { useState, useEffect } from "react";

interface MediaUploadZoneProps {
  onFilesDropped: (files: File[]) => void;
}

const MediaUploadZone: React.FC<MediaUploadZoneProps> = ({
  onFilesDropped,
}) => {
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
  const [isValidFile, setIsValidFile] = useState(true);
  const UploadZoneClassName =
    "w-full h-full border-2 border-dashed flex flex-col justify-center items-center rounded-md border-primary-main mb-2";

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const validFiles = filterValidFiles(files);

    setDroppedFiles((prevFiles) => [...prevFiles, ...validFiles]);
  };

  const filterValidFiles = (files: File[]): File[] => {
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

    return files.filter((file) => {
      const extension = file.name
        .toLowerCase()
        .slice(file.name.lastIndexOf("."));
      const isValid = allowedExtensions.includes(extension);
      isValid ? setIsValidFile(true) : setIsValidFile(false);
      console.log(`File ${file.name} is ${isValid ? "valid" : "invalid"}.`);
      return isValid;
    });
  };
  //   const sizeCheckFile

  const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  //

  useEffect(() => {
    console.log("Dropped files:", droppedFiles);
  }, [droppedFiles]); // Run this effect whenever droppedFiles changes
  return (
    <div className="w-full h-full">
      <div
        className={UploadZoneClassName}
        onDrop={handleDrop}
        onDragOver={allowDrop}
      >
        <UploadSimple style={{ transform: "scale(1.5)" }} />
        Drag and Drop here
        <div> or </div>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(event) => {
            if (event.target.files) {
              const files = Array.from(event.target.files);
              const validFiles = filterValidFiles(files);
              setDroppedFiles((prevFiles) => [...prevFiles, ...validFiles]);
            }
          }}
        />
        <label htmlFor="fileInput" className="text-primary-main cursor-pointer">
          Browse file
        </label>
        {droppedFiles.length > 0 && (
          <div className="truncate w-5/6 flex flex-col items-center overflow-hidden">
            {droppedFiles.slice(0, 3).map((file, index) => (
              <div key={index} className="">
                {file.name}
              </div>
            ))}
            {droppedFiles.length > 3 && <div>...</div>}
          </div>
        )}
      </div>
      <div className="flex flex-row justify-between text-xs text-gray-500">
        <div>Accepted file types: png, jpeg</div>
        <div>Max size: 25MB</div>
      </div>

      {!isValidFile && (
        <div className="flex flex-row text-xs  text-red-500">
          <WarningCircle className="mt-0.5 mr-0.5"></WarningCircle> File type
          not supported
        </div>
      )}
    </div>
  );
};

export default MediaUploadZone;
