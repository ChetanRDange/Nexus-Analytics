import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "react-quill/dist/quill.snow.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Info from "../assets/svgs/info.svg";
import {
  document_module_required_error,
  document_title_required_error,
} from "../Components/AllError";
import ComponentDropdown from "../Components/ComponentDropdown";
import InputComponent from "../Components/InputComponent";
import ToggleComponent from "../Components/ToggleComponent";
import useFetch from "../hooks/useFetch";
import useMutation from "../hooks/useMutation";

const module = [
  { id: 0, showName: "Bulk Upload", name: "bulk-upload" },
  { id: 1, showName: "GMB", name: "gmb" },
  { id: 2, showName: "Site Crawl", name: "site-crawl" },
  { id: 3, showName: "Email Campaign", name: "email-campaign" },
  { id: 4, showName: "All Data", name: "all-data" },
  { id: 5, showName: "Messages", name: "messages" },
  { id: 6, showName: "Thoughts", name: "thoughts" },
  { id: 7, showName: "Web Scraping", name: "web-scraping" },
  { id: 8, showName: "Tags", name: "tags" },
  { id: 9, showName: "Custom Fields", name: "custom-fields" },
  { id: 10, showName: "Roles", name: "roles" },
  { id: 11, showName: "Users", name: "users" },
  { id: 12, showName: "SMTP Settings", name: "smtp-settings" },
  { id: 13, showName: "AWS Settings", name: "aws-settings" },
  { id: 14, showName: "DND", name: "dnd" },
  { id: 15, showName: "WhatsApp Settings", name: "whatsapp-settings" },
];

const EditDocument = () => {
  const { documentId } = useParams();
  const { callApi } = useMutation();
  const navigate = useNavigate();
  const [isActivate, setIsActivate] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState([]);

  const [documentDetails, setDocumentDetails] = useState({
    title: "",
    content: [{ linkTitle: "", link: "", description: "" }],
  });

  const [moduleDropdown, setModuleDropDown] = useState({
    showName: "Click to select an option",
    name: "",
  });

  const [errors, setErrors] = useState({
    module: "",
    title: "",
    content: [],
  });

  const handleContentChange = (index, field, value) => {
    const updatedContent = [...documentDetails.content];
    updatedContent[index][field] = value;
    setDocumentDetails({ ...documentDetails, content: updatedContent });

    const updatedErrors = { ...errors };
    if (updatedErrors.content[index]) {
      updatedErrors.content[index][field] = "";
    }
    setErrors(updatedErrors);
  };

  const addContentField = () => {
    setDocumentDetails({
      ...documentDetails,
      content: [
        ...documentDetails.content,
        { linkTitle: "", link: "", description: "" },
      ],
    });
  };

  const removeContentField = (index) => {
    if (documentDetails.content.length > 1) {
      const updatedContent = documentDetails.content.filter(
        (_, i) => i !== index
      );
      setDocumentDetails({ ...documentDetails, content: updatedContent });
    } else {
      toast.error("At least one content section is required");
    }
  };

  const toggleCollapse = (index) => {
    setCollapsedSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleContentClick = (contentIndex, event) => {
    if (event.target === event.currentTarget) {
      setCollapsedSections((prev) =>
        prev.includes(contentIndex)
          ? prev.filter((i) => i !== contentIndex)
          : prev
      );
    }
  };

  const validate = () => {
    let newErrors = {
      module: "",
      title: "",
      content: documentDetails.content.map(() => ({
        linkTitle: "",
        link: "",
        description: "",
      })),
    };
    let hasErrors = false;

    if (!moduleDropdown?.name.trim()) {
      newErrors.module = document_module_required_error;
      hasErrors = true;
    }

    if (!documentDetails?.title.trim()) {
      newErrors.title = document_title_required_error;
      hasErrors = true;
    }

    const urlRegex =
      /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

    documentDetails.content.forEach((contentItem, index) => {
      if (!contentItem.linkTitle?.trim()) {
        newErrors.content[index].linkTitle = "Link title is required";
        hasErrors = true;
      }

      if (!contentItem.link?.trim()) {
        newErrors.content[index].link = "Link URL is required";
        hasErrors = true;
      } else if (!urlRegex.test(contentItem.link?.trim())) {
        newErrors.content[index].link = "Invalid URL format";
        hasErrors = true;
      }

      if (!contentItem.description?.trim()) {
        newErrors.content[index].description = "Description is required";
        hasErrors = true;
      } else if (contentItem.description.trim().length < 10) {
        newErrors.content[index].description = "Minimum 10 characters required";
        hasErrors = true;
      } else if (contentItem.description.trim().length > 500) {
        newErrors.content[index].description = "Maximum 500 characters allowed";
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    return !hasErrors;
  };

  const { data: res } = useFetch(`/private/documentation/${documentId}`);
  const fetchedDocument = res?.data;

  useEffect(() => {
    if (fetchedDocument) {
      const formattedContent = fetchedDocument.content.map((item) => ({
        linkTitle: item.linkTitle || "",
        link: item.link || "",
        description: item.description || "",
      }));

      setDocumentDetails({
        title: fetchedDocument.title || "",
        content:
          formattedContent.length > 0
            ? formattedContent
            : [{ linkTitle: "", link: "", description: "" }],
      });

      setModuleDropDown({
        showName:
          module.find((m) => m.name === fetchedDocument.module)?.showName ||
          "Click to select an option",
        name: fetchedDocument.module || "",
      });

      setIsActivate(fetchedDocument.status === "Published");
    }
  }, [fetchedDocument]);

  const handleDocumentUpdate = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const apiFormattedContent = documentDetails.content.map((item) => ({
      linkTitle: item.linkTitle,
      link: item.link.trim(),
      description: item.description,
    }));

    const documentationDataWithModule = {
      _id: documentId,
      module: moduleDropdown?.name || "",
      status: isActivate ? "Published" : "Draft",
      title: documentDetails.title,
      content: apiFormattedContent,
    };
    const res = await callApi(
      "/private/documentation",
      "PUT",
      documentationDataWithModule
    );
    if (res) navigate("/documentation");
  };

  return (
    <div className="py-8 p-4 sm:p-5 overflow-x-hidden mb-20">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex justify-between items-center   ">
        <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
          Edit Documentation
        </h4>
        <div className="flex gap-2">
          <Link
            id="cancel"
            to="/documentation"
            className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
          >
            Cancel
          </Link>
          <button
            onClick={handleDocumentUpdate}
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
            id="button-186"
          >
            Update
          </button>
        </div>
      </div>

      <div className="w-full justify-center items-center mt-8 pb-8 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block mb-4 md:mb-0 text-primary">
              Documentation Details
            </span>
          </div>
          <div className="w-full">
            <div className="w-full">
              <label className="text-primary">
                Select Module<span className="text-red-500 ml-1">*</span>
              </label>
              <div className="dropdown-container relative w-full mt-2">
                <ComponentDropdown
                  name="company"
                  SummaryChild={
                    <h5 className="p-0 m-0 text-primary">
                      {moduleDropdown.showName}
                    </h5>
                  }
                  dropdownList={module}
                  search={true}
                  commonFunction={(value) => {
                    setModuleDropDown(value);
                    setErrors((prev) => ({ ...prev, module: "" }));
                  }}
                  selected={moduleDropdown.name}
                />
                {errors.module && (
                  <p className="text-red-500 text-sm mt-1">{errors.module}</p>
                )}
              </div>
            </div>
            <div className="w-full mt-5">
              <InputComponent
                inputType="text"
                value={documentDetails?.title}
                name="title"
                id="title"
                labelName="Title"
                labelColor="primary"
                placeholderName="Title"
                placeholderColor="secondary"
                textColor="text-dark"
                borderRadius="xl"
                activeBorderColor="blue"
                required
                error={errors.title}
                errorMessage={errors.title}
                onChange={(e) => {
                  setDocumentDetails({
                    ...documentDetails,
                    title: e.target.value,
                  });
                  setErrors((prev) => ({ ...prev, title: "" }));
                }}
              />
            </div>
            <div className="w-full mt-5">
              <label className="text-primary">Content</label>
              {documentDetails.content.map((content, contentIndex) => (
                <div
                  key={contentIndex}
                  className="w-full mt-4 border border-primary p-3 rounded-xl cursor-pointer"
                  onClick={(e) => handleContentClick(contentIndex, e)}
                >
                  <div className="flex justify-between items-center pointer-events-none">
                    <div className="flex-1">
                      {collapsedSections.includes(contentIndex) ? (
                        <div className="flex items-center justify-between pr-4">
                          <div className="flex flex-col">
                            <span className="text-primary font-medium">
                              Content {contentIndex + 1}
                            </span>
                            {content.linkTitle && (
                              <span className="text-secondary text-sm mt-1">
                                {content.linkTitle}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 pointer-events-auto">
                            <button
                              type="button"
                              className="text-primary hover:text-hover"
                              onClick={() => toggleCollapse(contentIndex)}
                              id="button-187"
                            >
                              ▼
                            </button>
                            {documentDetails.content.length > 1 && (
                              <button
                                type="button"
                                className="text-red-500 hover:text-red-700 font-bold"
                                onClick={() => removeContentField(contentIndex)}
                                id="button-188"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center pr-4 pointer-events-auto">
                          <span className="text-primary font-medium">
                            Content {contentIndex + 1}
                          </span>
                          <button
                            type="button"
                            className="text-primary hover:text-hover"
                            onClick={() => toggleCollapse(contentIndex)}
                            id="button-189"
                          >
                            ▲
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {!collapsedSections.includes(contentIndex) && (
                    <>
                      <div className="w-full mt-2">
                        <InputComponent
                          inputType="text"
                          value={content.linkTitle}
                          name={`linkTitle-${contentIndex}`}
                          id={`linkTitle-${contentIndex}`}
                          labelName="Link Title"
                          labelColor="primary"
                          placeholderName="Enter Link Title"
                          placeholderColor="secondary"
                          textColor="text-dark"
                          borderRadius="xl"
                          activeBorderColor="blue"
                          required
                          error={errors.content[contentIndex]?.linkTitle}
                          errorMessage={errors.content[contentIndex]?.linkTitle}
                          onChange={(e) =>
                            handleContentChange(
                              contentIndex,
                              "linkTitle",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <div className="w-full mt-2">
                        <InputComponent
                          inputType="text"
                          value={content.link}
                          name={`link-${contentIndex}`}
                          id={`link-${contentIndex}`}
                          labelName="Link"
                          labelColor="primary"
                          placeholderName="Enter Link"
                          placeholderColor="secondary"
                          textColor="text-dark"
                          borderRadius="xl"
                          activeBorderColor="blue"
                          required
                          error={errors.content[contentIndex]?.link}
                          errorMessage={errors.content[contentIndex]?.link}
                          onChange={(e) =>
                            handleContentChange(
                              contentIndex,
                              "link",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <div className="w-full mt-5">
                        <label className="text-primary">
                          Description
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <textarea
                          className={`w-full mt-2 rounded-xl border ${
                            errors.content[contentIndex]?.description
                              ? "border-red-500"
                              : "border-primary"
                          } font-normal focus:outline-none focus:ring-0 px-4 py-2.5 focus:border placeholder:text-gray-400 text-dark bg-transparent`}
                          rows={4}
                          placeholder="Enter Description (10-500 characters)"
                          value={content.description}
                          onChange={(e) =>
                            handleContentChange(
                              contentIndex,
                              "description",
                              e.target.value
                            )
                          }
                        />
                        {errors.content[contentIndex]?.description && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.content[contentIndex].description}
                          </p>
                        )}
                      </div>

                      {documentDetails.content.length > 1 && (
                        <div className="w-full mt-2 flex justify-end">
                          <button
                            type="button"
                            className="text-red-500 hover:underline"
                            onClick={() => removeContentField(contentIndex)}
                            id="button-190"
                          >
                            Remove Content
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}

              <div className="w-full mt-4">
                <button
                  type="button"
                  className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl"
                  onClick={addContentField}
                  id="button-191"
                >
                  Add More Content
                </button>
              </div>
            </div>

            <div className="w-full mt-5">
              <ToggleComponent
                label="Publish"
                isIcon={true}
                icon={Info}
                isEnableState={isActivate}
                setIsEnableState={() =>
                  setIsActivate((prevState) => !prevState)
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" flex justify-end gap-2 mt-8">
        <Link
          id="cancel"
          to="/documentation"
          className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
        >
          Cancel
        </Link>
        <button
          onClick={handleDocumentUpdate}
          className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
          id="button-186"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditDocument;
