import React from "react";
import { Link, useParams } from "react-router-dom";
import "../App.css";
import useFetch from "../hooks/useFetch";
import formatDateTime from "../utils/DateFormat";
import StatusIndicator from "../Components/StatusIndicator";

const ViewDocument = () => {
  const { documentId } = useParams();
  const { data: res, reFetch } = useFetch(
    `/private/documentation/${documentId}`
  );
  const row = res?.data;

  return (
    <div className="min-h-screen py-8 p-4 sm:p-5 overflow-x-hidden overflow-y-hidden mb-16">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-wrap justify-between items-center   ">
        <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
          Documentation Details
        </h4>

        <div className="flex gap-2">
          <Link
            id="back"
            to="/documentation"
            className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
          >
            Back
          </Link>
          <Link
            id="edit"
            to={`/documentation/edit/${documentId}`}
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
          >
            Edit
          </Link>
        </div>
      </div>

      <div className="w-full h-full justify-center items-center mt-8 pb-8 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary flex items-center">
              Documentation Details:
            </span>
          </div>
          <form className="w-full">
            <div className="w-full">
              <label className="text-primary font-bold">Module Name</label>
              <p className="mt-1 text-primary  font-medium">{row?.module || "NA"}</p>
            </div>

            <div className="w-full mt-5">
              <label className="text-primary font-bold">Title</label>
              <p className="mt-1 text-primary  font-medium">{row?.title || "NA"}</p>
            </div>

            <div className="w-full mt-5">
              <label className="text-primary font-bold">Content</label>
              {row?.content?.length > 0 ? (
                <div className="mt-4 space-y-6">
                  {row.content.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-200 rounded-lg"
                    >
                      <h3 className="font-medium text-lg text-primary mb-2">
                        {item.linkTitle}
                      </h3>
                      <p className="text-primary  font-medium">{item.description}</p>
                      {item.link && (
                        <div className="mt-2 text-primary">
                          <span className="text-primary font-bold ">Link:</span>
                          <div className="mt-1  font-medium">
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline break-all"
                            >
                              {item.link}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-1 text-primary">No content available</p>
              )}
            </div>
            <div className="w-full mt-5">
              <label className="text-primary font-bold">Status</label>
              <StatusIndicator status={row?.status} />

            </div>

            <div className="w-full mt-5  flex flex-col gap-5 sm:flex-row justify-between">
              <div>
                <label className="text-primary font-bold">Created Date</label>
                <p className="mt-1 text-primary  font-medium">
                  {formatDateTime(row?.createdAt)}
                </p>
              </div>
              <div className="">
                <label className="text-primary font-bold">Updated Date</label>
                <p className="mt-1 text-primary  font-medium">
                  {formatDateTime(row?.updatedAt)}
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="sm:hidden flex justify-end gap-2 pt-4">
          <Link
            id="back"
            to="/documentation"
            className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
          >
            Back
          </Link>
          <Link
            id="edit"
            to={`/documentation/edit/${documentId}`}
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
          >
            Edit
          </Link>
        </div>
    </div>
  );
};

export default ViewDocument;
