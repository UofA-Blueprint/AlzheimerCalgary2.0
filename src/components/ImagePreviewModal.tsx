// ImagePreviewModal.tsx
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

interface ImagePreviewModalProps {
  images: Media[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function ImagePreviewModal({ 
  images, 
  currentIndex, 
  onClose, 
  onNext, 
  onPrevious 
}: ImagePreviewModalProps) {
  const [isOpening, setIsOpening] = useState(false);
  
  useEffect(() => {
    // Trigger animation on mount
    setIsOpening(true);
  }, []);

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div 
      className={`fixed inset-0 bg-black transition-opacity duration-300 flex items-center justify-center z-50
        ${isOpening ? 'bg-opacity-75' : 'bg-opacity-0'}`}
    >
      <div className={`relative w-full h-full flex items-center justify-center 
        transition-all duration-300 transform
        ${isOpening ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-50
            transition-transform duration-200 hover:scale-110"
        >
          <X size={24} weight="bold" />
        </button>

        {currentIndex > 0 && (
          <button
            onClick={onPrevious}
            className="absolute left-4 text-white hover:text-gray-300
              transition-transform duration-200 hover:scale-110"
          >
            <CaretLeft size={48} weight="bold" />
          </button>
        )}
        
        {currentIndex < images.length - 1 && (
          <button
            onClick={onNext}
            className="absolute right-4 text-white hover:text-gray-300
              transition-transform duration-200 hover:scale-110"
          >
            <CaretRight size={48} weight="bold" />
          </button>
        )}

        <div className={`relative max-w-5xl max-h-[90vh] mx-4 
          transition-all duration-300 transform
          ${isOpening ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        >
          <img
            src={currentImage.src}
            alt="Preview"
            className="object-contain max-h-[90vh] rounded-lg"
          />
          {currentImage.caption && (
            <div className={`absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4
              transition-all duration-300
              ${isOpening ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            >
              {currentImage.caption}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}