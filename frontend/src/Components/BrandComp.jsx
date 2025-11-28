import React, { useState, useRef, useEffect } from "react";
import DownloadImg from "../assets/svgs/settings/download.svg";
import Logo from "../assets/images/app-logo.png";
import DeleteImg from "../assets/svgs/settings/deletee.svg";
import EditLogo from "../assets/svgs/settings/edit.svg";
import CloseIcon from "../assets/svgs/close-black.svg";
import { FilePenLine, Icon } from "lucide-react";

const BrandComp = ({
  compLogo: CompLogo,
  title,
  imagePreviewUrl: externalImagePreviewUrl,
  setIcon = () => {},
  bg,
  textColor,
  onCancel,
  setOnCancel
}) => {
  console.log("cancel clicked", onCancel)
  const [selectedFile, setSelectedFile] = useState(null);
  console.log("selected files is ", selectedFile)
  const [imagePreview, setImagePreview] = useState(externalImagePreviewUrl);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (onCancel) {
      setSelectedFile(null);
      setOnCancel(false)
    }
  }, [onCancel]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];

    if (
      file &&
      (file.name.endsWith(".jpg") ||
        file.name.endsWith(".jpeg") ||
        file.name.endsWith(".png")) &&
      allowedTypes.includes(file.type)
    ) {
      setSelectedFile(file);
      setError(null);
      setShowPopup(true); // Only show the popup after selecting a file
      event.target.value = "";
    } else {
      setError("Accepted file types: .png, .jpeg, .pdf");
      setSelectedFile(null);
    }
  };

  const formatFileSize = (size) => {
    return (size / 1024 / 1024).toFixed(2) + " MB";
  };

  const handleDownload = () => {
    if (selectedFile) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(selectedFile);
      link.download = selectedFile.name;
      link.click();
    }
  };

  const handleDelete = () => {
    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    setSelectedFile(null);
    setShowPopup(false);
  };

  const handleConfirm = () => {
    // After confirmation, update the preview and set the icon
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setImagePreview(objectUrl);
      setIcon(selectedFile); // Set the icon after confirmation
    }
    setShowPopup(false); // Close the popup
  };

  useEffect(() => {
    // Set initial image preview from external URL or from selected file
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setImagePreview(objectUrl);
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    } else if (externalImagePreviewUrl) {
      setImagePreview(externalImagePreviewUrl); // Use the provided image preview URL on initial render
    } else {
      setImagePreview(null);
    }
  }, [selectedFile, externalImagePreviewUrl]);

  return (
    <>
      <div className="w-full border border-primary rounded-xl p-6 shadow-sm ">
        {/* <h1 className="text-primary text-lg mb-3 text-left flex items-center gap-2">
          <Icon src={compLogo} alt="Company Logo" />
          {title}
        </h1> */}
        <h1 className="text-primary text-lg mb-3 text-left flex items-center gap-2">
          {CompLogo && <CompLogo className="w-5 h-5 text-primary" />}{" "}
          {/* Render the icon */}
          {title}
        </h1>
        <div className={`border-2 border-primary rounded-xl text-center border-dashed p-3 w-auto ${bg}`}>
          {imagePreview ? (
            <div className="flex gap-1 justify-between relative p-2 ">
              <img
                src={
                  imagePreview instanceof File
                    ? URL.createObjectURL(imagePreview)
                    : imagePreview
                }
                alt={selectedFile?.name || "Image Preview"}
                className="rounded-xl flex justify-center m-auto w-3/5 h-32 object-contain"
              />
              <div className="px-1">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".png, .jpeg, .pdf"
                  ref={fileInputRef}
                />
                <button
                  onClick={() => fileInputRef.current.click()}
                  id="button-9"
                >
                  {/* <img src={EditLogo} alt="Edit" /> */}
                  <FilePenLine color={textColor ? "white" : undefined} />
                  </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="font-normal text-sm text-primary w-5/12 text-center m-auto">
                Choose a file or drag and drop here to upload
              </p>

              <div className="flex items-center m-auto justify-center my-4">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".png, .jpeg, .pdf, .jpg"
                  ref={fileInputRef}
                />
                <div className="w-full flex justify-center">
                  <button
                    className="text-primary font-medium cursor-pointer inline-block px-4 py-2 border hover:bg-gray-50 border-primary rounded-xl shadow-sm"
                    onClick={() => fileInputRef.current.click()}
                    id="button-10"
                  >
                    Browse
                  </button>
                </div>
              </div>

              <p className="font-normal text-xs text-primary text-center m-auto">
                Accepted file types: .png, .jpeg, .pdf
              </p>
            </div>
          )}
        </div>

        {showPopup && selectedFile && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 w-full z-10">
            <div className="bg-main  rounded-2xl text-left overflow-hidden shadow-xl transform transition-all w-[95%] sm:w-[80%] md:w-[580px] px-6 2xl:px-8 py-8">
              <div className="w-full flex justify-between items-center mb-4">
                <h4 className="text-dark font-semibold text-xl">
                  Uploaded Logo File
                </h4>
                <button onClick={handleDelete} id="button-11">
                  <img src={CloseIcon} alt="Close" width={24} height={24} />
                </button>
              </div>

              <div className="flex items-center justify-between border border-primary rounded-xl py-2 px-4 mb-4">
                <div className="flex flex-col">
                  <span className="text-primary text-sm font-normal">
                    {selectedFile.name}
                  </span>
                  <span className="text-secondary text-xs font-normal">
                    {formatFileSize(selectedFile.size)}
                  </span>
                </div>
                <button onClick={handleDelete} id="button-12">
                  <img src={DeleteImg} alt="Delete" />
                </button>
              </div>

              <p className="text-primary text-sm mb-4">
                File uploaded successfully.
              </p>

              <div className="flex justify-end">
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 bg-primary text-white font-medium rounded-xl shadow-sm hover:bg-hover"
                  id="button-13"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </>
  );
};

export default BrandComp;
