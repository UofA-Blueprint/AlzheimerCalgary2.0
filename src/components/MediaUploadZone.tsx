import { UploadSimple, WarningCircle } from "@phosphor-icons/react";
import { useState, useEffect, useRef } from "react";

interface MediaUploadZoneProps {
  onFilesDropped: (files: File[]) => void;
}

const MediaUploadZone: React.FC<MediaUploadZoneProps> = ({
  onFilesDropped,
}) => {
  // parent ref
  const parentRef = useRef<HTMLDivElement>(null);

  // handling sizing
  const [margin, setMargin] = useState("1em");
  const [fontSize, setFontSize] = useState("1em");
  // handling drop in file
  const [isDragOver, setIsDragOver] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
  const [isValidFile, setIsValidFile] = useState(true);

  const UploadZoneClassName =
    "w-full h-full border-2 border-dashed flex flex-col justify-center items-center rounded-md border-primary-main " +
    (isDragOver
      ? " transform transition-transform duration-300 border-primary-dark ease-in-out scale-95"
      : "");

  // adjust font size according to parent ref
  useEffect(() => {
    if (parentRef.current) {
      const { width, height } = parentRef.current.getBoundingClientRect();
      const newSize = Math.min(width, height) / 15;
      setFontSize(`${newSize}px`);
      setMargin(`${newSize / 10}px  `);
      width > 700
        ? setMargin(`${newSize / 10}px`)
        : setMargin(`${-newSize / 2}px`);
      console.log(width);
    }
  }, []);

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
    <div className="w-full h-full" style={{ fontSize }} ref={parentRef}>
      <div
        className={UploadZoneClassName}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <UploadSimple className="mb-2" style={{ transform: "scale(2)" }} />

        <div style={{ margin }} className="">
          Drag and Drop here
        </div>
        <div style={{ margin }}> or </div>
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
          style={{ margin }}
          htmlFor="fileInput"
          className="text-primary-main cursor-pointer"
        >
          Browse file
        </label>
        {droppedFiles.length > 0 && (
          <div
            className="truncate w-5/6 flex flex-col items-center overflow-hidden"
            style={{ margin }}
          >
            {droppedFiles.slice(0, 3).map((file, index) => (
              <div
                style={{ margin }}
                key={index}
                className="truncate w-full text-center"
              >
                {file.name}
              </div>
            ))}
            {droppedFiles.length > 3 && <div style={{ margin }}>...</div>}
          </div>
        )}
      </div>
      <div
        className="flex flex-row justify-between text-xs text-gray-500 mt-0.5"
        style={{ fontSize }}
      >
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
