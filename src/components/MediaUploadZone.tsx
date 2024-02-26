import { UploadSimple, WarningCircle } from "@phosphor-icons/react";
import { useState, useEffect, useRef } from "react";

interface MediaUploadZoneProps {
  onFilesDropped: (files: File[]) => void;
  fontSize?: string;
}

const MediaUploadZone: React.FC<MediaUploadZoneProps> = ({
  onFilesDropped,
}) => {
  // parent ref
  const parentRef = useRef<HTMLDivElement>(null);

  // handling sizing
  // handling drop in file
  const [isDragOver, setIsDragOver] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
  const [isValidFile, setIsValidFile] = useState(true);

  const UploadZoneClassName =
    "w-full h-full border-2 border-dashed flex flex-col justify-center items-center rounded-md border-primary-main text-base" +
    (isDragOver
      ? " transform transition-transform duration-300 border-primary-dark ease-in-out scale-95"
      : "");

  // handle drop events, drop the PNG, JPEG and GIF type of file
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const validFiles = filterValidFiles(files);

    setDroppedFiles((prevFiles) => [...prevFiles, ...validFiles]);
    setIsDragOver(false);
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

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  useEffect(() => {
    console.log("Dropped files:", droppedFiles);
  }, [droppedFiles]);

  return (
    <div className="w-full h-full ">
      <div
        className={UploadZoneClassName}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="flex flex-col  justify-center items-center flex-grow text-body-reg sm:text-body-sm  ">
          <UploadSimple className="mb-3 leading-normal scale-[2]" />
          <div className="leading-normal ">Drag and Drop here</div>
          <div className="leading-normal"> or </div>
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
          <label
            htmlFor="fileInput"
            className="text-primary-main cursor-pointer leading-normal"
          >
            Browse file
          </label>
        </div>
        {droppedFiles.length > 0 && (
          <div className="truncate w-5/6 flex flex-col items-center overflow-hidden">
            {droppedFiles.slice(0, 3).map((file, index) => (
              <div key={index} className="truncate w-full text-center">
                {file.name}
              </div>
            ))}
            {droppedFiles.length > 3 && <div>...</div>}
          </div>
        )}
      </div>
      <div className="flex flex-row justify-between text-xs text-gray-500 mt-0.5">
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
