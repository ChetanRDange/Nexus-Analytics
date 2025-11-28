import React, { useEffect } from "react";
import { Link, useMatch, useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import formatDateTime from "../utils/DateFormat";
import responseMessagePlaceholders from "../utils/responseMessageVariables.json";
import { IoMdRefresh } from "react-icons/io";
import useMutation from "../hooks/useMutation";
import StatusIndicator from "../Components/StatusIndicator";

const ViewResponseMessage = () => {
  const { key } = useParams();
  const { data: res, loading } = useFetch(`/private/responseMessage/${key}`);
  const { callApi } = useMutation();
  const navigate = useNavigate();
  const message = res?.data;

  if (loading) return <div>Loading...</div>;
  if (!message) return <div>No message found</div>;

  const handleReset = async () => {
    const result = await callApi(
      `/private/responseMessage/refresh/${key}`,
      "GET"
    );
    if (result) {
      navigate(`/response-messages`);
    }
  };

  return (
    <div className="h-full py-8 px-4 sm:px-6 overflow-x-hidden">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex justify-between items-center   ">
        <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
          View Response Message
        </h4>

        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-primarydark text-white"
          >
            <IoMdRefresh size={22} />
            <span>Reset</span>
          </button>
          <Link
            to="/success-response-message"
            className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap w-full sm:w-auto text-center"
          >
            Back
          </Link>
          <Link
            to={`/response-message/edit/${key}`} // Fixed the double slash here
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap w-full sm:w-auto text-center"
          >
            Edit
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <MessageDetailCard message={message} />
      </div>

      <div className="flex gap-2 w-full justify-end mb-20">
        <Link
          to="/success-response-message"
          className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap w-full sm:w-auto text-center"
        >
          Back
        </Link>
        <Link
          to={`/response-message/edit/${key}`} // Fixed the double slash here
          className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap w-full sm:w-auto text-center"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

const MessageDetailCard = ({ message }) => {
  const currentPlaceholders = message?.key
    ? responseMessagePlaceholders[message.key] || []
    : [];

  return (
    <div className="rounded-lg p-6 bg-main shadow-sm">
      {/* Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 border-b border-primary ">
        <div className="md:col-span-3">
          <h3 className="text-lg font-semibold text-primary">Details</h3>
        </div>
        <div className="md:col-span-9 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Details */}
            <div className="space-y-4">
              <DetailItem label="Key" value={message.key} />
              <DetailItem label="Module" value={message.module} />
              <DetailItem
                label="Panel"
                value={
                  message.panel?.charAt(0).toUpperCase() +
                  message.panel?.slice(1)
                }
              />
              <DetailItem
                label="Type"
                value={
                  <StatusIndicator status={message?.type} />                }
                type="badge"
              />
              <DetailItem
                label="Created At"
                value={formatDateTime(message.createdAt)}
              />
              <DetailItem
                label="Updated At"
                value={formatDateTime(message.updatedAt)}
              />
            </div>
            {/* Preview Section */}
            <div className="bg-main text-primary ">
              {message.style && (
                <div>
                  <h4 className="font-semibold text-lg mb-2">
                    Response Preview
                  </h4>
                  <div className="relative h-[240px] w-full bg-main rounded-md border border-gray-200 overflow-hidden flex items-center justify-center">
                    <div
                      className={`absolute ${
                        message.position === "top-right"
                          ? "top-3 right-3"
                          : message.position === "top-left"
                          ? "top-3 left-3"
                          : message.position === "bottom-right"
                          ? "bottom-3 right-3"
                          : message.position === "bottom-left"
                          ? "bottom-3 left-3"
                          : message.position === "bottom-center"
                          ? "bottom-3 left-1/2 transform -translate-x-1/2"
                          : "top-3 left-1/2 transform -translate-x-1/2"
                      } min-w-[200px] max-w-[300px]`}
                    >
                      <div
                        className="bg-main text-main p-1.5 rounded-md shadow-lg flex items-center space-x-1 w-full text-[10px]"
                        style={message.style}
                      >
                        {message.icon && (
                          <span className="text-sm">{message.icon}</span>
                        )}
                        <span className="flex-1">{message.message}</span>
                        {message.dismissible && (
                          <button className="ml-0.5 text-gray-400 hover:text-primary text-sm">
                            &times;
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section with updated layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 border-b border-primary">
        <div className="md:col-span-3">
          <h3 className="text-lg font-semibold text-primary">Content</h3>
        </div>
        <div className="md:col-span-9 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left side - Message and Description */}
            <div className="space-y-4 ">
              <div>
                <h4 className="font-semibold mb-2 text-primary">Message</h4>
                <div className="p-4 bg-main text-primary rounded-md border border-gray-200 min-h-[100px] font-medium">
                  {message.message}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-primary">Description</h4>
                <div className="p-4 bg-main text-primary rounded-md border border-gray-200 min-h-[100px] font-medium">
                  {message.description || "-"}
                </div>
              </div>
            </div>

            {/* Right side - Placeholders */}
            <div>
              <h4 className="font-semibold mb-2 text-primary">Placeholders</h4>
              <div className="p-4 bg-main text-primary rounded-md border border-gray-200 min-h-[208px] font-medium">
                {currentPlaceholders.length > 0 ? (
                  <div className="space-y-2">
                    {currentPlaceholders.map((placeholder, index) => (
                      <div key={index} className="flex gap-2">
                        <span className="font-medium">
                          {placeholder.title}:
                        </span>
                        <span className="text-gray-400">{`{${placeholder.key}}`}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  "No placeholders available"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-20">
        <div className="md:col-span-3">
          <h3 className="text-lg font-semibold text-primary">Advanced </h3>
        </div>
        <div className="md:col-span-9 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <DetailItem
                label="Dismissible"
                value={message.dismissible ? "Yes" : "No"}
                // status={message.dismissible}
              />
              <DetailItem label="Position" value={message.position || "-"} />

              <div>
                <h4 className="font-semibold mb-2 text-primary">Icon Theme</h4>
                <div className="p-4 bg-main text-primary rounded-md border border-gray-200 text-sm space-y-1">
                  {message.iconTheme
                    ? Object.entries(message.iconTheme).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="font-medium">{key}:</span>
                          <span className="text-gray-400">{value}</span>
                        </div>
                      ))
                    : "-"}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <DetailItem label="Icon" value={message.icon || "-"} />
              <DetailItem
                label="Duration"
                value={message.duration ? `${message.duration} sec` : "-"}
              />

              <div>
                <h4 className="font-semibold mb-2 text-primary">Style</h4>
                <div className="p-4 bg-main text-primary rounded-md border border-gray-200 text-sm space-y-1">
                  {message.style
                    ? Object.entries(message.style).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="font-medium">{key}:</span>
                          <span className="text-gray-400">{value}</span>
                        </div>
                      ))
                    : "-"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value, type, status }) => {
  const typeColors = {
    Success: "bg-green-100 text-green-800 ",
    Error: "bg-red-100 text-red-800 w-[60px]",
    Warning: "bg-yellow-100 text-yellow-800 w-[80px]",
    Info: "bg-blue-100 text-blue-800 w-[60px]",
  };

  const statusColors = {
    true: "bg-green-100 text-green-800",
    false: "bg-red-100 text-red-800",
  };

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 sm:items-center ">
      <span className="font-bold text-primary min-w-[120px]">{label}:</span>
      {type === "badge" ? (
        <span
          className={`  rounded-xl  font-medium ${
            typeColors[value] || "bg-gray-100 text-primary "
          }`}
        >
          {value}
        </span>
      ) : status !== undefined ? (
        <span
          className={`px-2 py-1 rounded-md  font-medium ${
            statusColors[status] || "bg-gray-100 text-primary "
          }`}
        >
          {value}
        </span>
      ) : (
        <span className="text-primary font-medium  break-words">
          {value || "-"}
        </span>
      )}
    </div>
  );
};

export default ViewResponseMessage;
