import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import ComponentDropdown from "../Components/ComponentDropdown";
import ToggleComponent from "../Components/ToggleComponent";
import Info from "../assets/svgs/info.svg";
import useFetch from "../hooks/useFetch";
import useMutation from "../hooks/useMutation";

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

const EditNotices = () => {
  const { callApi } = useMutation();
  const navigate = useNavigate();
  const { noticeId } = useParams();
  const [isActivate, setIsActivate] = useState();
  const [content, setContent] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  const [noticeTypesDropdown, setNoticeTypesDropDown] = useState({
    showName: "",
    name: "",
  });

  const [statusDropdown, setStatusDropdown] = useState({
    showName: "Click to select status",
    name: "inactive",
  });

  const [errors, setErrors] = useState({
    content: "",
    type: "",
    status: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  });

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

  const stripHtml = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html || "";
    return tmp.textContent || tmp.innerText || "";
  };

  const validateField = (name, value) => {
    switch (name) {
      case "content":
        const textContent = stripHtml(value).trim();
        if (!textContent) return "Notice content is required";
        if (textContent.length < 10)
          return "Notice content must be at least 10 characters";
        if (textContent.length > 500)
          return "Notice content cannot exceed 500 characters";
        return "";
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

    const textContent = stripHtml(content).trim();
    const contentError = validateField("content", textContent);
    if (contentError) {
      newErrors.content = contentError;
      isValid = false;
    }

    const typeError = validateField("type", noticeTypesDropdown.name);
    if (typeError) {
      newErrors.type = typeError;
      isValid = false;
    }

    const statusError = validateField("status", statusDropdown.name);
    if (statusError) {
      newErrors.status = statusError;
      isValid = false;
    }

    const startDateError = validateField("startDate", startDate);
    if (startDateError) {
      newErrors.startDate = startDateError;
      isValid = false;
    }

    const endDateError = validateField("endDate", endDate);
    if (endDateError) {
      newErrors.endDate = endDateError;
      isValid = false;
    }

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

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (start > end) {
        newErrors.endDate = "End date cannot be earlier than start date";
        isValid = false;
      }
    }

    setErrors(newErrors);
    if (!isValid) {
      Object.values(newErrors).forEach((error) => {
        if (error) toast.error(error);
      });
    }
    return isValid;
  };

  const { data: res, loading } = useFetch(`/private/notices/${noticeId}`);

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
      setStartDate(noticeDetail?.startDate?.split("T")[0] || "");
      setStartTime(noticeDetail?.startTime || "");
      setEndDate(noticeDetail?.endDate?.split("T")[0] || "");
      setEndTime(noticeDetail?.endTime || "");
    }
  }, [noticeDetail]);

  const handleContentChange = (htmlContent) => {
    const textContent = stripHtml(htmlContent).trim();
    const currentLength = textContent.length;

    if (currentLength <= 500) {
      setContent(htmlContent);
      setCharCount(currentLength);
      setErrors((prev) => ({ ...prev, content: "" }));
    } else {
      let truncatedHtml = htmlContent;
      let count = 0;

      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlContent;

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

  const handleEditNotice = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const updatedNoticeData = {
      _id: noticeId,
      content,
      type: noticeTypesDropdown?.name,
      startDate: new Date(startDate).toISOString().split("T")[0],
      endDate: new Date(endDate).toISOString().split("T")[0],
      startTime,
      endTime,
      status: statusDropdown.name,
      isActivated: isActivate,
    };
    const res = await callApi("/private/notices", "PUT", updatedNoticeData);
    if (res) navigate("/notices");
  };

  return (
    <>
      <div className="py-8 p-4 sm:p-5 overflow-x-hidden mb-20">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex justify-between items-center   ">
          <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
            Edit Notice
          </h4>
          <div className="flex gap-2">
            <Link
              id="cancel"
              to="/notices"
              className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
            >
              Cancel
            </Link>
            <button
              onClick={handleEditNotice}
              className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
              id="button-194"
            >
              Update
            </button>
          </div>
        </div>

        <div className="w-full border-b border-primary justify-center items-center mt-8 pb-8 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className="block mb-4 md:mb-0 text-primary">
                Notice Details
              </span>
            </div>
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
                    style={{
                      wordBreak: "break-word",
                    }}
                    modules={modules}
                    formats={formats}
                    placeholder="Enter your notice content here..."
                  />
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

              <div className="w-full mt-5">
                <label className="text-primary">
                  Notice Type<span className="text-red-500 ml-1">*</span>
                </label>
                <div className="dropdown-container relative w-full mt-2">
                  <ComponentDropdown
                    name="type"
                    SummaryChild={
                      <h5 className="p-0 m-0 text-primary">
                        {noticeTypesDropdown.showName}
                      </h5>
                    }
                    dropdownList={noticeTypes}
                    search={true}
                    commonFunction={setNoticeTypesDropDown}
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
                        {statusDropdown.showName}
                      </h5>
                    }
                    dropdownList={statusTypes}
                    search={false}
                    commonFunction={setStatusDropdown}
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
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                        setErrors((prev) => ({ ...prev, startDate: "" }));
                      }}
                      className="w-full rounded-lg border border-primary focus:outline-none focus:ring-0 px-4 py-2.5 text-primary bg-transparent"
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
                      className="w-full mt-2 rounded-lg border border-primary focus:outline-none focus:ring-0 px-4 py-2.5 text-primary bg-transparent"
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
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => {
                        setEndDate(e.target.value);
                        setErrors((prev) => ({ ...prev, endDate: "" }));
                      }}
                      className="w-full rounded-lg border border-primary focus:outline-none focus:ring-0 px-4 py-2.5 text-primary bg-transparent"
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

        {/* <div className="w-full justify-center border-b border-primary items-center mt-8 pb-8 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
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

        <div className="w-full flex gap-4 justify-end items-end pt-8">
          <Link
            id="cancel-1"
            to="/notices"
            className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
          >
            Cancel
          </Link>
          <button
            onClick={handleEditNotice}
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
            id="button-195"
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default EditNotices;
