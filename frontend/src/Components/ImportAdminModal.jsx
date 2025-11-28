import React, { useState } from "react";
import toast from "react-hot-toast";
import UploadImg from "../assets/images/upload.png";
import useMutation from "../hooks/useMutation";
import useStore from "../state/store";

const ImportAdminModal = ({
  isImportAdminModalOpen,
  setIsImportAdminModalOpen,
  handleDelete,
}) => {
  const { callApi } = useMutation();
  const { admin, setAdmin } = useStore();
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [sendFile, setSendFile] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(100);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (
      file &&
      (file.name.endsWith(".jpg") ||
        file.name.endsWith(".jpeg") ||
        file.name.endsWith(".png"))
    ) {
      setSendFile(file);
      let sizeInKB = file.size / 1024;
      let sizeWithUnit;

      const filePreview = URL.createObjectURL(file);
      setAdmin((prevData) => ({ ...prevData, avatar: filePreview }));
      setSelectedFile({
        name: file.name,
        size:
          sizeInKB < 1024
            ? `${sizeInKB.toFixed(2)} KB`
            : `${(sizeInKB / 1024).toFixed(2)} MB`,
        preview: filePreview,
      });
      setError("");
    } else {
      setError("Only .jpg, .jpeg, .png files are allowed");
      setSelectedFile(null);
    }
  };

  const handleUploadButtonClick = (e) => {
    e.preventDefault();
    document.getElementById("hidden-input").click();
  };

  const handleUploadClick = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    try {
      const img = new Image();
      img.src = selectedFile.preview;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      const canvas = document.createElement("canvas");
      const outputWidth = 200;
      const outputHeight = 200;
      canvas.width = outputWidth;
      canvas.height = outputHeight;
      const ctx = canvas.getContext("2d");
      const zoomFactor = zoomLevel / 100;
      const sourceWidth = img.width / zoomFactor;
      const sourceHeight = img.height / zoomFactor;
      const sourceX = (img.width - sourceWidth) / 2;
      const sourceY = (img.height - sourceHeight) / 2;
      ctx.drawImage(
        img,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        outputWidth,
        outputHeight
      );

      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, sendFile.type || "image/jpeg", 0.9);
      });

      if (!blob) {
        throw new Error("Failed to create image blob");
      }
      const croppedFile = new File([blob], sendFile.name, {
        type: blob.type,
        lastModified: Date.now(),
      });
      const formData = new FormData();
      formData.append("avatar", croppedFile);

      // Upload the file
      // const response = await mutate({
      //   method: "post",
      //   path: "/admin/private/user/upload",
      //   options: {
      //     body: formData,
      //   },
      // });

      // const { ok, status, body } = response;

      // if (ok && status === 201 && body?.success) {
      //   toast.success(body.message);
      //   useStore.setState({
      //     admin: {
      //       ...admin,
      //       avatar: body.data,
      //     },
      //   });
      // } else {
      //   toast.error(body?.message || "Upload failed");
      // }

      const res = await callApi("/private/user/upload", "POST", formData, {
        "Content-Type": "multipart/form-data",
      });
      if (res) {
        useStore.setState({
          admin: {
            ...admin,
            avatar: res.data,
          },
        });
      }

      setIsImportAdminModalOpen(false);
      setSelectedFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to process and upload image");
    }
  };

  const handleZoomChange = (e) => {
    setZoomLevel(e.target.value);
  };

  if (!isImportAdminModalOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-10">
        <div
          className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity"
          onClick={() => {
            setIsImportAdminModalOpen(false);
            setSelectedFile(null);
          }}
        />
        <div className="flex items-start justify-center min-h-screen p-4">
          <form
            onClick={(e) => e.stopPropagation()}
            className="relative z-20 bg-main rounded-2xl text-left overflow-hidden shadow-xl transform transition-all w-[95%] sm:w-[80%] md:w-[75%] lg:w-[70%] xl:w-[664px] 2xl:w-[664px] px-6 2xl:px-8 py-10 mt-[12vh]"
          >
            <div className="w-full flex justify-between items-center">
              {selectedFile ? (
                <span className="text-primary font-semibold text-xl">
                  <button onclick="history.back()" id="button-52">
                    {" "}
                    <span className="text-3xl mr-2">&#8249;</span> Change
                    Profile Photo
                  </button>
                </span>
              ) : (
                <span className="text-primary font-semibold text-xl">
                  <button onclick="history.back()" id="button-53">
                    {" "}
                    <span className="text-3xl mr-2">&#8249;</span>
                    Upload Photo
                  </button>
                </span>
              )}
              <button
                onClick={() => setIsImportAdminModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-hover"
                id="button-54"
              >
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="#667085"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="w-full mt-8">
              <div className="mt-2">
                <header className="items-center m-auto flex flex-col">
                  {!selectedFile ? (
                    <>
                      <div className="rounded-full border-dashed border border-primary bg-main flex flex-col w-60 h-60 justify-center m-auto items-center cursor-pointer p-6">
                        <input
                          id="hidden-input"
                          type="file"
                          className="hidden"
                          accept=".jpg, .jpeg, .png"
                          onChange={handleFileChange}
                        />
                        <label
                          htmlFor="hidden-input"
                          className="flex flex-col gap-6 justify-center items-center cursor-pointer"
                        >
                          <img
                            src={selectedFile?.preview || UploadImg}
                            style={{width:'fit-content'}}
                            alt="Upload Image"
                          />
                          <p className="text-lg text-secondary text-center">
                            Drag and drop your image here.
                          </p>
                        </label>
                      </div>

                      <p className="text-secondary text-center my-3 font-light">
                        Or
                      </p>

                      <div className="w-full flex flex-col gap-y-4 mt-4">
                        <div className="w-full flex gap-3 items-center justify-center">
                          <button
                            className="w-auto flex gap-1.5 sm:gap-2 items-center justify-center py-2.5 px-4 shadow-sm rounded-xl border border-primary"
                            onClick={handleUploadButtonClick}
                            id="button-55"
                          >
                            <span className="whitespace-nowrap text-primary text-sm sm:text-base">
                              Upload a Photo
                            </span>
                          </button>
                          {admin?.avatar && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleDelete();
                                setIsImportAdminModalOpen(false);
                              }}
                              className="w-auto flex gap-1.5 sm:gap-2 items-center justify-center py-2.5 px-4 shadow-sm rounded-xl border border-red-500"
                              id="button-56"
                            >
                              <span className="whitespace-nowrap text-red-500 text-sm sm:text-base">
                                Delete Photo
                              </span>
                            </button>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-48 h-48 overflow-hidden rounded-md border border-primary">
                        <img
                          src={selectedFile.preview}
                          alt="Uploaded file"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transform: `scale(${zoomLevel / 100})`,
                            transformOrigin: "center center",
                            transition: "transform 0.2s ease-in-out",
                          }}
                        />
                      </div>
                      <div className="mt-4 w-full flex flex-col items-center">
                        <div className="flex items-center gap-2 w-full">
                          <span className="text-sm text-secondary">-</span>
                          <input
                            type="range"
                            min="100"
                            max="200"
                            value={zoomLevel}
                            onChange={handleZoomChange}
                            className="w-full h-1 bg-darkgray rounded-full appearance-none cursor-pointer"
                            style={{
                              background: "#D0D5DD",
                              borderRadius: "9999px",
                            }}
                          />
                          <span className="text-sm text-secondary">+</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {error && (
                    <p className="mt-2 text-red-400 font-medium">{error}</p>
                  )}
                </header>
              </div>

              <hr className="h-0.5 px-0 bg-darkgray my-5" />
              <div className="w-full mt-6 flex gap-4 justify-end">
                <button
                  onClick={() => {
                    setIsImportAdminModalOpen(false);
                    setSelectedFile(null);
                  }}
                  className="px-4 py-2 text-primary font-medium bg-main rounded-xl border border-primary whitespace-nowrap"
                  id="button-57"
                >
                  Cancel
                </button>

                <button
                  onClick={(e) => handleUploadClick(e)}
                  className={`px-4 py-2  text-white font-medium rounded-xl whitespace-nowrap ${
                    !selectedFile ? "bg-[#C7D7FE]" : "bg-primary hover:bg-primarydark"
                  }`}
                  disabled={!selectedFile}
                  style={!selectedFile ? { cursor: "not-allowed" } : {}}
                  id="button-58"
                >
                  Upload
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ImportAdminModal;
