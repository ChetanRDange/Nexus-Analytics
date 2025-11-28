import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useFetch from "../hooks/useFetch";
import useMutation from "../hooks/useMutation";
import InputComponent from "../Components/InputComponent";
import ComponentDropdown from "../Components/ComponentDropdown";
import ToggleComponent from "../Components/ToggleComponent";
import Info from "../assets/svgs/info.svg";
import responseMessagePlaceholders from "../utils/responseMessageVariables.json";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { ChromePicker } from "react-color";

const positionTypes = [
  { id: 0, showName: "Top Right", name: "top-right" },
  { id: 1, showName: "Top Left", name: "top-left" },
  { id: 2, showName: "Top Center", name: "top-center" },
  { id: 3, showName: "Bottom Right", name: "bottom-right" },
  { id: 4, showName: "Bottom Left", name: "bottom-left" },
  { id: 5, showName: "Bottom Center", name: "bottom-center" },
];

const borderStyles = [
  { id: 0, showName: "Solid", name: "solid" },
  { id: 1, showName: "Dashed", name: "dashed" },
  { id: 2, showName: "Dotted", name: "dotted" },
  { id: 3, showName: "Groove", name: "groove" },
];

const EditResponseMessage = () => {
  const { callApi } = useMutation();
  const navigate = useNavigate();
  const { key } = useParams();

  // State declarations
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState("");
  const [isDismissible, setIsDismissible] = useState(false);
  const [duration, setDuration] = useState(3000);
  const [icon, setIcon] = useState("");
  const [iconTheme, setIconTheme] = useState({ primary: "", secondary: "" });
  const [style, setStyle] = useState({
    background: "",
    color: "",
    border: "",
    padding: "",
  });
  const [borderWidth, setBorderWidth] = useState("");
  const [borderStyle, setBorderStyle] = useState({
    showName: "Solid",
    name: "solid",
  });
  const [borderColor, setBorderColor] = useState("");
  const [borderRadius, setBorderRadius] = useState("");
  const [showBorderColorPicker, setShowBorderColorPicker] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState({
    background: false,
    color: false,
    iconPrimary: false,
    iconSecondary: false,
  });
  const [positionDropdown, setPositionDropdown] = useState({
    showName: "Click to select position",
    name: "",
  });
  const [errors, setErrors] = useState({
    message: "",
    description: "",
    position: "",
    duration: "",
  });

  // Refs for click outside detection
  const emojiPickerRef = useRef(null);
  const colorPickerRefs = {
    background: useRef(null),
    color: useRef(null),
    iconPrimary: useRef(null),
    iconSecondary: useRef(null),
  };
  const borderColorPickerRef = useRef(null);

  // Data fetching
  const { data: res, loading } = useFetch(`/private/responseMessage/${key}`);
  const messageData = res?.data;

  useEffect(() => {
    if (messageData) {
      setMessage(messageData.message || "");
      setDescription(messageData.description || "");
      setIsDismissible(messageData.dismissible || false);
      setDuration(messageData.duration || 3000);
      setIcon(messageData.icon || "");
      setIconTheme(messageData.iconTheme || { primary: "", secondary: "" });
      setStyle(messageData.style || { background: "", color: "" });
      setPositionDropdown({
        showName: messageData.position || "Click to select position",
        name: messageData.position || "",
      });
      if (messageData.style?.border) {
        const [width, style, color] = messageData.style.border.split(" ");
        setBorderWidth(parseInt(width));
        setBorderStyle({
          showName: style.charAt(0).toUpperCase() + style.slice(1),
          name: style,
        });
        setBorderColor(color);
      }
      if (messageData.style?.["border-radius"]) {
        setBorderRadius(messageData.style["border-radius"].replace("px", ""));
      }
    }
  }, [messageData]);

  // Handle click outside for pickers
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close emoji picker
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }

      // Close color pickers
      Object.entries(colorPickerRefs).forEach(([key, ref]) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowColorPicker((prev) => ({ ...prev, [key]: false }));
        }
      });

      // Close border color picker
      if (
        borderColorPickerRef.current &&
        !borderColorPickerRef.current.contains(event.target)
      ) {
        setShowBorderColorPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Helper functions
  const validateField = (name, value) => {
    switch (name) {
      case "message":
        if (!value.trim()) return "Message is required";
        return "";
      case "position":
        if (!value) return "Position is required";
        return "";
      case "duration":
        if (value < 0) return "Duration cannot be negative";
        return "";
      default:
        return "";
    }
  };

  const getPreviewStyle = () => ({
    background: style.background || "",
    color: style.color || "",
    border:
      borderWidth && borderStyle.name && borderColor
        ? `${borderWidth}px ${borderStyle.name} ${borderColor}`
        : "",
    padding: style.padding ? `${style.padding}px` : "",
    borderRadius: borderRadius ? `${borderRadius}px` : "",
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate required fields
    const messageError = validateField("message", message);
    if (messageError) newErrors.message = messageError;

    const positionError = validateField("position", positionDropdown.name);
    if (positionError) newErrors.position = positionError;

    const durationError = validateField("duration", duration);
    if (durationError) newErrors.duration = durationError;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      Object.values(newErrors).forEach((error) => {
        if (error) toast.error(error);
      });
      return;
    }

    const updatedData = {
      key,
      message,
      description,
      dismissible: isDismissible,
      position: positionDropdown.name,
      duration: parseInt(duration),
      icon,
      iconTheme,
      style: getPreviewStyle(),
    };

    const res = await callApi(
      `/private/responseMessage/${key}`,
      "PUT",
      updatedData
    );
    if (res) navigate("/response-messages");
  };

  const currentPlaceholders = messageData?.key
    ? responseMessagePlaceholders[messageData.key] || []
    : [];

  const handleColorChange = (color, field) => {
    if (field === "background" || field === "color") {
      setStyle({ ...style, [field]: color.hex });
    } else {
      setIconTheme({ ...iconTheme, [field]: color.hex });
    }
  };

  const toggleColorPicker = (field) => {
    setShowColorPicker({
      ...showColorPicker,
      [field]: !showColorPicker[field],
    });
  };

  return (
    <div className="py-8 p-4 sm:p-5 overflow-x-hidden mb-20">
      {/* Header Section */}
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex justify-between items-center">
        <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark">
          Edit Response Message
        </h4>

        <div className="flex gap-2">
          <Link
            to="/success-response-message"
            className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
          >
            Cancel
          </Link>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
          >
            Update
          </button>
        </div>
      </div>

      {/* Basic Settings Section */}
      <div className="w-full border-b border-primary justify-center items-center mt-8 pb-8 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block mb-4 md:mb-0 text-primary">
              Message Details
            </span>
          </div>
          <div className="w-full">
            <div className="">
              <h4 className="text-primary mb-2">Available Placeholders</h4>
              <div className="p-4 bg-main rounded-xl border border-primary">
                {currentPlaceholders.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentPlaceholders.map((placeholder, index) => (
                      <div key={index} className="flex gap-2 mb-1">
                        <span className="font-medium text-primary">
                          {placeholder.title}:
                        </span>
                        <span className="text-secondary">{`{${placeholder.key}}`}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-secondary">
                    No placeholders available
                  </span>
                )}
              </div>
            </div>

            <div className="w-full mt-5">
              <InputComponent
                labelName="Message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                error={errors.message}
              />
            </div>

            <div className="w-full mt-5">
              <InputComponent
                labelName="Description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={errors.description}
                as="textarea"
                rows={4}
                maxLength={500}
                placeholderName="Enter description (max 500 characters)"
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {description.length}/500
              </div>
            </div>

            {/* Preview Section */}
            <div className="w-full mt-2">
              <div className="bg-main p-1 rounded-xl">
                <h4 className="font-semibold text-base mb-2 text-primary">
                  Response Preview
                </h4>
                <div className="relative h-64 w-full bg-main rounded-lg border border-gray-300 overflow-hidden flex items-center justify-center">
                  <div
                    className={`absolute ${
                      positionDropdown.name === "top-right"
                        ? "top-3 right-3"
                        : positionDropdown.name === "top-left"
                        ? "top-3 left-3"
                        : positionDropdown.name === "bottom-right"
                        ? "bottom-3 right-3"
                        : positionDropdown.name === "bottom-left"
                        ? "bottom-3 left-3"
                        : positionDropdown.name === "bottom-center"
                        ? "bottom-3 left-1/2 transform -translate-x-1/2"
                        : "top-3 left-1/2 transform -translate-x-1/2"
                    } min-w-[200px] max-w-[300px]`}
                  >
                    <div
                      className="bg-gray-900 text-white p-1.5 rounded-xl shadow-lg flex items-center space-x-1 w-full text-[10px]"
                      style={getPreviewStyle()}
                    >
                      {icon && <span className="text-sm">{icon}</span>}
                      <span className="flex-1">
                        {message || "Preview Message"}
                      </span>
                      {isDismissible && (
                        <button className="ml-0.5 text-gray-400 hover:text-white text-sm">
                          &times;
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Settings Section */}
      <div className="w-full justify-center items-center mt-8 pb-8 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block mb-4 md:mb-0 text-primary">
              Advanced Settings
            </span>
          </div>
          <div className="w-full">
            {/* Move all advanced settings here */}
            <label className="text-primary">
              Want To Show Cross Button (x){" "}
            </label>
            <ToggleComponent
              label="Dismissible"
              isIcon={true}
              icon={Info}
              isEnableState={isDismissible}
              setIsEnableState={setIsDismissible}
              tooltipMessage="Allow users to dismiss the message"
            />

            <div className="w-full mt-5">
              <label className="text-primary">
                Position<span className="text-red-500 ml-1">*</span>
              </label>
              <div className="mt-2">
                <ComponentDropdown
                  name="position"
                  SummaryChild={
                    <h5 className="p-0 m-0 text-primary">
                      {positionDropdown.showName}
                    </h5>
                  }
                  dropdownList={positionTypes}
                  commonFunction={setPositionDropdown}
                  selected={positionDropdown.name}
                />
              </div>
            </div>

            {/* Rest of the advanced settings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 mb-4 mt-4">
              <div>
                <InputComponent
                  labelName="Duration (sec)"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  error={errors.duration}
                  min={0}
                />
              </div>
              <div>
                <label className="text-primary font-medium mb-2 block">
                  Icon
                </label>
                <div className="flex gap-1 relative">
                  <input
                    type="text"
                    className="flex-1 p-2 border border-primary rounded-xl bg-main"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    placeholder="Select an emoji"
                  />
                  <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="px-1 bg-main border border-primary rounded-xl hover:bg-gray-300"
                  >
                    <span className="text-2xl">😀</span>
                  </button>
                  {showEmojiPicker && (
                    <div
                      className="absolute z-50 top-full right-0 sm:left-0 mt-1"
                      ref={emojiPickerRef}
                    >
                      <Picker
                        data={data}
                        onEmojiSelect={(emoji) => {
                          setIcon(emoji.native);
                          setShowEmojiPicker(false);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Color Pickers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 mt-4">
              <div>
                <label className="text-primary font-medium mb-2 block">
                  Icon Primary Color
                </label>
                <div className="flex gap-1 relative">
                  <input
                    type="text"
                    className="flex-1 p-2 border border-primary bg-main text-primary rounded-xl"
                    value={iconTheme.primary}
                    onChange={(e) =>
                      setIconTheme({
                        ...iconTheme,
                        primary: e.target.value,
                      })
                    }
                  />
                  <div className="relative" ref={colorPickerRefs.iconPrimary}>
                    <button
                      onClick={() => toggleColorPicker("iconPrimary")}
                      className="px-3 py-2 rounded-xl border border-primary"
                      style={{ backgroundColor: iconTheme.primary }}
                    >
                      &nbsp;
                    </button>
                    {showColorPicker.iconPrimary && (
                      <div className="absolute z-50 top-full right-0 mt-1">
                        <ChromePicker
                          color={iconTheme.primary}
                          onChangeComplete={(color) =>
                            handleColorChange(color, "primary")
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label className="text-primary font-medium mb-2 block">
                  Icon Secondary Color
                </label>
                <div className="flex gap-1 relative">
                  <input
                    type="text"
                    className="flex-1 p-2 border border-primary bg-main text-primary rounded-xl"
                    value={iconTheme.secondary}
                    onChange={(e) =>
                      setIconTheme({
                        ...iconTheme,
                        secondary: e.target.value,
                      })
                    }
                  />
                  <div className="relative" ref={colorPickerRefs.iconSecondary}>
                    <button
                      onClick={() => toggleColorPicker("iconSecondary")}
                      className="px-3 py-2 rounded-xl border border-primary"
                      style={{ backgroundColor: iconTheme.secondary }}
                    >
                      &nbsp;
                    </button>
                    {showColorPicker.iconSecondary && (
                      <div className="absolute z-50 top-full right-0 mt-1">
                        <ChromePicker
                          color={iconTheme.secondary}
                          onChangeComplete={(color) =>
                            handleColorChange(color, "secondary")
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-primary font-medium mb-2 block">
                  Border Width
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-primary bg-main text-primary rounded-xl"
                  value={borderWidth}
                  onChange={(e) => setBorderWidth(e.target.value)}
                  placeholder="Enter width"
                  min="0"
                />
              </div>
              <div>
                <label className="text-primary font-medium mb-2 block">
                  Border Style
                </label>
                <ComponentDropdown
                  name="borderStyle"
                  SummaryChild={
                    <h5 className="p-0 m-0 text-primary">
                      {borderStyle.showName}
                    </h5>
                  }
                  dropdownList={borderStyles}
                  commonFunction={setBorderStyle}
                  selected={borderStyle.name}
                  paddingY="py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-primary font-medium mb-2 block">
                  Border Color
                </label>
                <div className="flex gap-1 relative">
                  <input
                    type="text"
                    className="flex-1 p-2 border border-primary bg-main text-primary rounded-xl"
                    value={borderColor}
                    onChange={(e) => setBorderColor(e.target.value)}
                  />
                  <div className="relative" ref={borderColorPickerRef}>
                    <button
                      onClick={() =>
                        setShowBorderColorPicker(!showBorderColorPicker)
                      }
                      className="px-3 py-2 rounded-xl border border-primary"
                      style={{ backgroundColor: borderColor }}
                    >
                      &nbsp;
                    </button>
                    {showBorderColorPicker && (
                      <div className="absolute z-50 top-full right-0 mt-1">
                        <ChromePicker
                          color={borderColor}
                          onChangeComplete={(color) =>
                            setBorderColor(color.hex)
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label className="text-primary font-medium mb-2 block">
                  Padding
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-primary bg-main text-primary rounded-xl"
                  value={style.padding ? style.padding.replace("px", "") : ""}
                  onChange={(e) =>
                    setStyle({ ...style, padding: e.target.value })
                  }
                  placeholder="Enter padding value"
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-primary font-medium mb-2 block">
                  Border Radius
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-primary bg-main text-primary rounded-xl"
                  value={borderRadius}
                  onChange={(e) => setBorderRadius(e.target.value)}
                  placeholder="Enter border radius"
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="w-full flex gap-4 justify-end items-end pt-8">
        <Link
          to="/response-messages"
          className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
        >
          Cancel
        </Link>
        <button
          onClick={handleUpdate}
          className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditResponseMessage;
