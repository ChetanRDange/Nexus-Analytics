import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { Link, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import ComponentDropdown from "../Components/ComponentDropdown";
import DatePicker from "../Components/DatePicker";
import EndDatePicker from "../Components/EndDatePicker";
import ToggleComponent from "../Components/ToggleComponent";
import Info from "../assets/svgs/info.svg";
import useMutation from "../hooks/useMutation";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const noticeTypes = [
  {
    id: 0,
    showName: "Info",
    name: "info",
  },
  {
    id: 1,
    showName: "Success",
    name: "success",
  },
  {
    id: 2,
    showName: "Danger",
    name: "danger",
  },
];

const statusTypes = [
  {
    id: 0,
    showName: "Active",
    name: "Active",
  },
  {
    id: 1,
    showName: "Inactive",
    name: "Inactive",
  },
];
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [
      {
        color: [
          "#B91E35",
          "#F79C01",
          "#01712B",
          "#024EA8",
          "#6D1D82",
          "#DE2835",
        ],
      },
    ],
    ["link"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "color",
  "link",
];

const AddNotice = () => {
  const { callApi } = useMutation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [isActivate, setIsActivate] = useState(false);

  const [noticeTypesDropdown, setNoticeTypesDropDown] = useState({
    showName: "Click to select an option",
    name: "",
  });
  const [statusDropdown, setStatusDropdown] = useState({
    showName: "Click to select status",
    name: "Inactive",
  });
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [errors, setErrors] = useState({
    content: "",
    type: "",
    status: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  });

  if (id) {
    const { data: res, loading } = useFetch(`/private/notices/${id}`);

    const noticeDetail = res?.data;

    useEffect(() => {
      if (noticeDetail) {
        setNoticeTypesDropDown({
          showName: noticeDetail?.type,
          name: noticeDetail?.type,
        });
        setStatusDropdown({
          showName: noticeDetail?.status === "Active" ? "Active" : "Inactive",
          name: noticeDetail?.status,
        });
        setIsActivate(noticeDetail?.isActivated);
        setContent(noticeDetail?.content || "");
        setCharCount(stripHtml(noticeDetail?.content || "").trim().length);
        setSelectedStartDate(noticeDetail?.startDate?.split("T")[0] || "");
        setStartTime(noticeDetail?.startTime || "");
        setSelectedEndDate(noticeDetail?.endDate?.split("T")[0] || "");
        setEndTime(noticeDetail?.endTime || "");
      }
    }, [noticeDetail]);
  }

  const handleNoticeTypeChange = (value) => {
    setNoticeTypesDropDown(value);
    setErrors((prev) => ({ ...prev, type: "" }));
  };

  const handleStatusChange = (value) => {
    setStatusDropdown(value);
    setErrors((prev) => ({ ...prev, status: "" }));
  };

  const stripHtml = (html) => {
    if (!html) return "";
    try {
      const tmp = document.createElement("div");
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || "";
    } catch {
      // Fallback for non-HTML content
      return html.replace(/<[^>]*>?/gm, "");
    }
  };

  const validateContent = (htmlContent) => {
    const textContent = stripHtml(htmlContent).trim();

    if (!textContent) {
      return "Notice content is required";
    }
    if (textContent.length < 10) {
      return "Notice content must be at least 10 characters";
    }
    if (textContent.length > 500) {
      return "Notice content cannot exceed 500 characters";
    }
    return "";
  };

  const handleContentChange = (htmlContent) => {
    const textContent = stripHtml(htmlContent).trim();
    const currentLength = textContent.length;

    if (currentLength <= 500) {
      setContent(htmlContent);
      setCharCount(currentLength);
      setErrors((prev) => ({ ...prev, content: "" }));
    } else {
      // Truncate the content to 500 characters while preserving HTML
      let truncatedHtml = htmlContent;
      let count = 0;

      // Create a temporary div to parse HTML
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlContent;

      // Recursive function to traverse nodes and find cutoff point
      const traverseNodes = (node) => {
        if (count >= 500) return true;

        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent;
          const remainingChars = 500 - count;

          if (count + text.length > 500) {
            node.textContent = text.slice(0, remainingChars);
            return true;
          }

          count += text.length;
        }

        if (node.childNodes) {
          for (const child of node.childNodes) {
            if (traverseNodes(child)) return true;
          }
        }

        return false;
      };

      traverseNodes(tempDiv);
      truncatedHtml = tempDiv.innerHTML;

      setContent(truncatedHtml);
      setCharCount(500);
      setErrors((prev) => ({
        ...prev,
        content: "Notice Content has been truncated to 500 characters",
      }));
      toast.warning("Notice Content has been truncated to 500 characters");
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case "type":
        if (!value) return "Notice type is required";
        return "";
      case "status":
        if (!value) return "Status is required";
        return "";
      case "startDate":
        if (!value) return "Start date is required";
        return "";
      case "endDate":
        if (!value) return "End date is required";
        return "";
      case "startTime":
        if (!value) return "Start time is required";
        return "";
      case "endTime":
        if (!value) return "End time is required";
        return "";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate content
    const contentError = validateContent(content);
    if (contentError) {
      newErrors.content = contentError;
      isValid = false;
      toast.error(contentError);
    }

    // Validate type
    if (!noticeTypesDropdown.name) {
      newErrors.type = "Please select a notice type";
      isValid = false;
    }

    // Validate status
    if (!statusDropdown.name || statusDropdown.name === "") {
      newErrors.status = "Please select a status";
      isValid = false;
    }

    // Validate dates
    const startDateError = validateField("startDate", selectedStartDate);
    if (startDateError) {
      newErrors.startDate = startDateError;
      isValid = false;
    }

    const endDateError = validateField("endDate", selectedEndDate);
    if (endDateError) {
      newErrors.endDate = endDateError;
      isValid = false;
    }

    // Validate times
    const startTimeError = validateField("startTime", startTime);
    if (startTimeError) {
      newErrors.startTime = startTimeError;
      isValid = false;
    }

    const endTimeError = validateField("endTime", endTime);
    if (endTimeError) {
      newErrors.endTime = endTimeError;
      isValid = false;
    }

    // Validate date range
    if (selectedStartDate && selectedEndDate) {
      const start = new Date(selectedStartDate);
      const end = new Date(selectedEndDate);
      if (start > end) {
        newErrors.endDate = "End date cannot be earlier than start date";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAddNotice = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const noticeData = {
      content,
      type: noticeTypesDropdown?.name,
      startDate: new Date(selectedStartDate).toISOString().split("T")[0],
      endDate: new Date(selectedEndDate).toISOString().split("T")[0],
      startTime,
      endTime,
      status: statusDropdown.name,
      isActivated: isActivate,
    };
    const res = await callApi("/private/notices", "POST", noticeData);
    if (res) navigate("/notices");
  };

  return (
    <>
      <div className="py-8 p-4 sm:p-5 overflow-x-hidden mb-20">
        <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex justify-between items-center   ">
          <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
            Add Notice
          </h4>
          <div className="flex gap-2">
            <Link
              to="/notices"
              className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
            >
              Cancel
            </Link>
            <button
              onClick={handleAddNotice}
              className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
              id="button-135"
            >
              Add
            </button>
          </div>
        </div>

        <div className="w-full justify-center items-center mt-8 pb-8 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className="block mb-4 md:mb-0 text-primary">
                Notice Details
              </span>
            </div>
            <div className="w-full">
              <div className="w-full">
                <div className="w-full">
                  <label className="text-primary">
                    Notice Content<span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="mt-2">
                    <ReactQuill
                      theme="snow"
                      value={content}
                      onChange={handleContentChange}
                      style={{ wordBreak: "break-word" }}
                      modules={modules}
                      formats={formats}
                      placeholder="Enter your notice content here..."
                    />
                    <div className="flex justify-between items-center mt-1">
                      {errors.content && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.content}
                        </p>
                      )}
                      <p
                        className={`text-xs ${
                          charCount > 500 ? "text-red-500" : "text-gray-500"
                        }`}
                      >
                        {charCount}/500 characters
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full mt-5">
                <label className="text-primary">
                  Notice Type<span className="text-red-500 ml-1">*</span>
                </label>
                <div className="dropdown-container relative w-full mt-2">
                  <ComponentDropdown
                    name="company"
                    SummaryChild={
                      <h5 className="p-0 m-0">
                        {noticeTypesDropdown.showName}
                      </h5>
                    }
                    dropdownList={noticeTypes}
                    search={true}
                    commonFunction={handleNoticeTypeChange}
                    selected={noticeTypesDropdown.name}
                  />
                  {errors.type && (
                    <p className="text-red-500 text-sm mt-1">{errors.type}</p>
                  )}
                </div>
              </div>

              <div className="w-full mt-5">
                <label className="text-primary">
                  Status<span className="text-red-500 ml-1">*</span>
                </label>
                <div className="dropdown-container relative w-full mt-2">
                  <ComponentDropdown
                    name="status"
                    SummaryChild={
                      <h5 className="p-0 m-0 text-primary">
                        {statusDropdown.name}
                      </h5>
                    }
                    dropdownList={statusTypes}
                    search={false}
                    commonFunction={handleStatusChange}
                    selected={statusDropdown.name}
                  />
                  {errors.status && (
                    <p className="text-red-500 text-sm mt-1">{errors.status}</p>
                  )}
                </div>
              </div>

              <div className="w-full mt-5 flex flex-col md:flex-row gap-y-4 gap-4 md:justify-between">
                <div className="w-full">
                  <label className="text-primary">
                    Start Date<span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="mt-2">
                    <DatePicker
                      selectedDate={
                        selectedStartDate
                          ? new Date(selectedStartDate)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      setSelectedDate={(date) => {
                        setSelectedStartDate(new Date(date).toISOString());
                        setErrors((prev) => ({ ...prev, startDate: "" }));
                      }}
                      placeholder="Select Start Date"
                    />
                    {errors.startDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.startDate}
                      </p>
                    )}
                  </div>

                  <div className="mt-2">
                    <label className="text-primary">
                      Start Time<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => {
                        setStartTime(e.target.value);
                        setErrors((prev) => ({ ...prev, startTime: "" }));  
                      }}
                      className="w-full mt-2 rounded-lg border border-primary focus:outline-none focus:ring-0 px-4 py-2.5 text-primary"
                    />
                    {errors.startTime && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.startTime}
                      </p>
                    )}
                  </div>
                </div>

                <div className="w-full">
                  <label className="text-primary">
                    End Date<span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="mt-2">
                    <EndDatePicker
                      selectedEndDate={
                        selectedEndDate
                          ? new Date(selectedEndDate)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      setSelectedEndDate={(date) => {
                        setSelectedEndDate(new Date(date).toISOString());
                        setErrors((prev) => ({ ...prev, endDate: "" }));
                      }}
                      selectedStartDate={
                        selectedStartDate
                          ? new Date(selectedStartDate)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                    />
                    {errors.endDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.endDate}
                      </p>
                    )}
                  </div>

                  <div className="mt-2">
                    <label className="text-primary">
                      End Time<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => {
                        setEndTime(e.target.value);
                        setErrors((prev) => ({ ...prev, endTime: "" }));
                      }}
                      className="w-full mt-2 rounded-lg border border-primary focus:outline-none focus:ring-0 px-4 py-2.5 text-primary bg-transparent"
                    />
                    {errors.endTime && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.endTime}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="w-full justify-center border-b border-primary items-center mt-8 pb-8 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className="block mb-4 md:mb-0 text-primary">
                Activate Notice
              </span>
            </div>
            <div className="w-full">
              <ToggleComponent
                label="Activate"
                isIcon={true}
                icon={Info}
                isEnableState={isActivate}
                setIsEnableState={() => setIsActivate(!isActivate)}
              />
            </div>
          </div>
        </div> */}

        <div className="w-full flex gap-4 justify-end items-end pt-2 ">
          <Link
            to="/notices"
            className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
          >
            Cancel
          </Link>
          <button
            onClick={handleAddNotice}
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
            id="button-136"
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default AddNotice;
