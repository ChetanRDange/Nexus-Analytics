import React from "react";

const ImagePreviewModal = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity"
        onClick={onClose}
      />
      <div className="flex items-center justify-center min-h-screen p-2">
        <div className="relative z-50 w-fit">
          <button onClick={onClose}
            className="absolute -top-8 right-0 p-1 text-white hover:bg-gray-700 rounded-full"
           id="button-51">
            <svg
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <img
            src={imageUrl}
            alt="Preview"
            className="w-auto rounded-lg"
            style={{objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewModal;
