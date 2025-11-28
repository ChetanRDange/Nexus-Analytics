import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import InputComponent from "../Components/InputComponent";
import useFetch from "../hooks/useFetch";
import useMutation from "../hooks/useMutation";
import templatePlaceholders from "../utils/emailTemplateJSON.json";
import ComponentDropdown from "../Components/ComponentDropdown";

const EditTemplate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { callApi } = useMutation();
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    body: "",
    module: id,
    type: "org", // Add default type
  });

  const { data: res, loading } = useFetch(`/private/emailTemplates/${id}`);

  useEffect(() => {
    if (res?.data?.[0]) {
      setFormData(res.data[0]);
    }
  }, [res]);

  const [errors, setErrors] = useState({
    name: "",
    subject: "",
    body: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: "",
      subject: "",
      body: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Title is required";
      valid = false;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
      valid = false;
    }

    if (!formData.body.trim() || formData.body === "<p><br></p>") {
      newErrors.body = "Email body is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    const res = await callApi("/private/emailTemplates", "PUT", formData);
    if (res) navigate("/email-template");
  };

  const currentPlaceholders = id ? templatePlaceholders[id] || [] : [];

  const typeOptions = [
    { name: "org", showName: "Organization" },
    { name: "admin", showName: "Admin" },
  ];

  return (
    <div className="min-h-screen py-8 p-4 sm:p-5">
       <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex justify-between items-center   ">
        <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
          Edit Template
        </h4>

        <div className="flex gap-2">
          <Link
            to="/email-template"
            className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary"
          >
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl"
          >
            Update
          </button>
        </div>
      </div>

      <div className="mt-8 text-primary">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <InputComponent
            inputType="text"
            name="name"
            labelName="Title"
            value={formData.name}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, name: e.target.value }));
              if (errors.name) {
                setErrors((prev) => ({ ...prev, name: "" }));
              }
            }}
            required
            error={!!errors.name}
            errorMessage={errors.name}
          />
          <InputComponent
            inputType="text"
            name="subject"
            labelName="Subject"
            value={formData.subject}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, subject: e.target.value }));
              if (errors.subject) {
                setErrors((prev) => ({ ...prev, subject: "" }));
              }
            }}
            required
            error={!!errors.subject}
            errorMessage={errors.subject}
          />
          <div className="w-full mb-8">
            <label className="block mb-2">
              Type <span className="text-red-500">*</span>
            </label>
            <ComponentDropdown
              name="type"
              dropdownList={typeOptions}
              selected={formData.type}
              commonFunction={(item) =>
                setFormData((prev) => ({ ...prev, type: item.name }))
              }
            />
          </div>
        </div>
        <div className="mb-6">
          <h3 className="mb-2">Placeholder Values</h3>
          {currentPlaceholders.length > 0 && (
            <div className="border border-primary rounded-lg p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentPlaceholders.map((placeholder, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium">
                      {placeholder.title}:{" "}
                      <span className="text-grey-500">{`{${placeholder.name}}`}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-20 items-stretch">
          <div className="h-full">
            <label className="text-primary block mb-2">
              Email Body <span className="text-red-500">*</span>
            </label>
            <ReactQuill
              theme="snow"
              value={formData.body}
              onChange={(content) => {
                setFormData((prev) => ({ ...prev, body: content }));
                if (
                  errors.body &&
                  content.trim() &&
                  content !== "<p><br></p>"
                ) {
                  setErrors((prev) => ({ ...prev, body: "" }));
                }
              }}
              // className="h-64"
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                  ],
                  ["link", "image"],
                  ["clean"],
                ],
              }}
            />
            {errors.body && (
              <p className="text-fadered text-sm mt-1">{errors.body}</p>
            )}
          </div>

          <div className="h-full">
            <h3 className="font-semibold mb-2">Email Preview</h3>
            <div className="border border-primary rounded-lg p-4 overflow-x-auto h-full">
              <div className="mb-4">
                {/* <h4 className="font-medium">Subject:</h4> */}
                <p>
                  <span className="font-medium">Subject: </span>{" "}
                  {formData.subject}
                </p>
              </div>
              <h4 className="font-medium">Body:</h4>
              <div
                className="email-preview prose max-w-full break-words"
                dangerouslySetInnerHTML={{ __html: formData.body }}
              />
            </div>
            <div className="sm:hidden flex justify-end gap-2 mt-8">
              <Link
                to="/email-template"
                className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary"
              >
                Cancel
              </Link>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-end gap-2 mb-20">
        <Link
          to="/email-template"
          className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary"
        >
          Cancel
        </Link>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditTemplate;
