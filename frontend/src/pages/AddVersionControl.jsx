import { useState } from "react";
import useMutation from "../hooks/useMutation";
import { Link, useNavigate } from "react-router-dom";
import InputComponent from "../Components/InputComponent";
import toast from "react-hot-toast";
import { FolderCheck, FolderUp } from "lucide-react";

const AddVersionControl = () => {
  const { callApi } = useMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    version: "",
    isBreakingChange: false,
    breakingMessage: "",
    isNotice: false,
    noticeContent: "",
    file: null,
  });

  const [errors, setErrors] = useState({
    version: "",
    breakingMessage: "",
    noticeContent: "",
  });

  const validateField = (name, value) => {
    switch (name) {
      case "version":
        if (!value?.trim()) return "Version is required";
        return "";
      case "breakingMessage":
        if (formData.isBreakingChange && !value?.trim())
          return "Breaking Message is required";
        if (value.length > 100) return "Maximum 100 characters are allowed";
        return "";
      case "noticeContent":
        if (formData.isNotice && !value?.trim()) return "Content is required";
        if (value.length > 100) return "Maximum 100 characters are allowed";
        return "";
      default:
        return "";
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    Object.keys(formData).forEach((key) => {
      if (key !== "phone") {
        const error = validateField(key, formData[key]);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
        if (formData[key].length > 0 && formData[key].length < 2) {
          newErrors[key] = "Minimum 1 characters required";
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleFieldChange = (name, value) => {
    if (name === "file" && value) {
      const file = value;
      const fileType = file.type;
      const validFileType = ["application/zip", "application/x-zip-compressed"];
      if (!validFileType.includes(fileType)) {
        setErrors((prev) => ({
          ...prev,
          file: "Please upload a zip file only.",
        }));
        return;
      }

      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > 2) {
        setErrors((prev) => ({
          ...prev,
          file: "File size should be less than 2MB.",
        }));
        return;
      }
    }

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log("the form data", formData);

  async function handleAddVersion(e) {
    e.preventDefault();
    const hasExistingErrors = Object.values(errors).some(
      (error) => error !== ""
    );
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      return;
    }
    if (hasExistingErrors) {
      toast.error("Please fill the required fields.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("zipFile", formData.file); // Append file
    formDataToSend.append(
      "jsonData",
      JSON.stringify({
        version: formData.version,
        isBreakingChange: formData.isBreakingChange,
        isNotice: formData.isNotice,
        breakingMessage: formData.breakingMessage,
        noticeContent: formData.noticeContent,
      })
    );

    try {
      const res = await callApi(
        "/private/versionControl",
        "POST",
        formDataToSend
      );
      if (res) {
        navigate("/version-control");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex justify-between items-center   ">
        <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
          Add version Control
        </h4>

        <div className="flex gap-2">
          <Link
            id="vergion-control"
            to="/version-control"
            className="px-4 py-2 text-primary font-medium bg-main rounded-xl border hover:bg-hover border-primary whitespace-nowrap"
          >
            Cancel
          </Link>
          <button
            onClick={handleAddVersion}
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
            id="button-125"
          >
            Add
          </button>
        </div>
      </div>

      <div className="w-full justify-center items-center mt-8 pb-8 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block mb-4 md:mb-0 text-primary">
              Extension File
            </span>
          </div>
          <div className="flex items-center justify-center w-full mb-4">
            <label
              htmlFor="extension"
              className={`flex flex-col items-center justify-center w-full h-64 border-2  border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 ${
                errors.file ? "border-red-500" : "border-gray-300"
              }`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {formData.file ? (
                  <FolderCheck size={40} color="green" />
                ) : (
                  <FolderUp size={40} />
                )}
                {formData.file ? (
                  <p className="text-lg text-green-500 dark:text-green-400">
                    {formData?.file.name}
                  </p>
                ) : errors.file ? (
                  <p className="text-red-500">{errors.file}</p>
                ) : (
                  <>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Only .zip files are accepted
                    </p>
                  </>
                )}
              </div>

              <input
                className="hidden"
                type="file"
                accept="application/zip"
                name="zipFile"
                id="extension"
                onChange={(e) => handleFieldChange("file", e.target.files[0])}
              />
            </label>
          </div>
        </div>
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block mb-4 md:mb-0 text-primary">
              Extension Version Details
            </span>
          </div>
          <form className="w-full">
            <div className="w-full">
              <InputComponent
                inputType="text"
                name="version"
                id="version"
                labelName="Version Number"
                labelColor="primary"
                placeholderName="Version Number"
                placeholderColor="secondary"
                textColor="text-dark"
                value={formData.version}
                onChange={(e) => handleFieldChange("version", e.target.value)}
                error={errors.version}
                errorMessage={errors.version}
                maxLength={99}
                minLength={2}
                required
                borderRadius="xl"
                activeBorderColor="blue"
              />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                id="isBreakingChange"
                name="isBreakingChange"
                checked={formData.isBreakingChange}
                onChange={(e) =>
                  handleFieldChange("isBreakingChange", e.target.checked)
                }
                className="w-4 h-4"
              />
              <label htmlFor="isBreakingChange" className="text-dark">
                Breaking Change?
              </label>
            </div>
            {formData.isBreakingChange && (
              <div className="w-full">
                <InputComponent
                  inputType="text"
                  name="breakingMessage"
                  id="breakingMessage"
                  labelName="Breaking Message"
                  labelColor="primary"
                  placeholderName="Breaking Message"
                  placeholderColor="secondary"
                  textColor="text-dark"
                  value={formData.breakingMessage}
                  onChange={(e) =>
                    handleFieldChange("breakingMessage", e.target.value)
                  }
                  error={errors.breakingMessage}
                  errorMessage={errors.breakingMessage}
                  maxLength={99}
                  minLength={2}
                  required
                  borderRadius="xl"
                  activeBorderColor="blue"
                />
              </div>
            )}
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                id="isNotice"
                name="isNotice"
                checked={formData.isNotice}
                onChange={(e) =>
                  handleFieldChange("isNotice", e.target.checked)
                }
                className="w-4 h-4"
              />
              <label htmlFor="isNotice" className="text-dark">
                Notice?
              </label>
            </div>
            {formData.isNotice && (
              <div className="w-full">
                <InputComponent
                  inputType="text"
                  name="noticeContent"
                  id="noticeContent"
                  labelName="Notice Message"
                  labelColor="primary"
                  placeholderName="Notice Message"
                  placeholderColor="secondary"
                  textColor="text-dark"
                  value={formData.noticeContent}
                  onChange={(e) =>
                    handleFieldChange("noticeContent", e.target.value)
                  }
                  error={errors.noticeContent}
                  errorMessage={errors.noticeContent}
                  maxLength={99}
                  minLength={2}
                  required
                  borderRadius="xl"
                  activeBorderColor="blue"
                />
              </div>
            )}
          </form>
        </div>
        <div className="w-full flex justify-end gap-2 mt-8">
          <Link
            id="vergion-control"
            to="/version-control"
            className="px-4 py-2 text-primary font-medium bg-main rounded-xl border hover:bg-hover border-primary whitespace-nowrap"
          >
            Cancel
          </Link>
          <button
            onClick={handleAddVersion}
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
            id="button-125-mobile"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddVersionControl;
