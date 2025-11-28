import React, { useState, forwardRef } from "react";

const FolderInputComp = forwardRef((props, ref) => {
  const {
    Icon,
    mt,
    inputType,
    name,
    webkitdirectory,
    id,
    labelName,
    labelColor,
    placeholderName,
    textColor,
    activeBorderColor,
    borderRadius = "xl",
    handleInputChange,
  } = props;

  const [folderPath, setFolderPath] = useState("");

  const handleFolderChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const fullPath = files[0].webkitRelativePath;

      const path = fullPath.substring(0, fullPath.lastIndexOf("/"));
      setFolderPath(path);
    }
    if (handleInputChange) {
      handleInputChange(e);
    }
  };

  return (
    <div className={`relative w-full mt-${mt}`}>
      <label
        className={`text-${labelColor}`}
        style={{ display: "flex", alignItems: "center" }}
      >
        {labelName}
        {Icon && (
          <span className="ml-1 inline-flex items-center justify-center">
            <img src={Icon} className="align-middle" alt="icon" />
          </span>
        )}
      </label>

      <div
        className={`w-full mt-2 rounded-${borderRadius} border border-primary font-normal focus:outline-none focus:ring-0 px-4 py-2.5 placeholder:text-gray-400 text-${textColor} bg-transparent`}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <span className="text-primary">{folderPath || placeholderName}</span>
      </div>

      <input
        type="file"
        webkitdirectory="true"
        id={`${id}-hidden`}
        name={`${name}-hidden`}
        onChange={handleFolderChange}
        className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
      />
    </div>
  );
});

export default FolderInputComp;
