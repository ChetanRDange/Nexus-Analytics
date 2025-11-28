import React from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import formatDateTime from "../utils/DateFormat";
import StatusIndicator from "../Components/StatusIndicator";

const NoticeDetails = () => {
  const { noticeId } = useParams();

  const { data: res, loading } = useFetch(`/private/notices/${noticeId}`);
  const row = res?.data;

  return (
    <div className="min-h-screen py-8 p-4 sm:p-5 overflow-x-hidden">
  <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex justify-between items-center   ">
          <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
            View Notice Details
          </h4>
          <div className="flex gap-2">
          <Link
            to="/notices"
            id="back"
            className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
          >
            Back
          </Link>
          <Link
            id="edit"
            to={`/notices/edit/${noticeId}`}
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
          >
            Edit
          </Link>
        </div>
      </div>

      <div className="pb-14">
        <div className="w-full justify-center items-center mt-8 mb-5 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="w-full md:w-1/4">
              <h2 className=" text-primary mb-2 whitespace-nowrap md:whitespace-wrap">
                Notice Details
              </h2>
            </div>
            <div className="w-full md:w-3/4">
              <div className="flex flex-col gap-y-1">
                <label className="text-primary font-bold">
                  Notice Description
                </label>
                {row?.content && (
                  <div className="mt-1 text-primary overflow-auto max-w-full break-words">
                    <div
                      className="prose max-w-full break-words"
                      dangerouslySetInnerHTML={{ __html: row?.content }}
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-4 flex-col gap-y-3 lg:flex-row md:items-center mt-5">
                <div className="w-full flex flex-col gap-y-1 md:w-1/2 ">
                  <label className="text-primary font-bold">Notice Type</label>
                  <span className="text-primary font-medium">{row?.type}</span>
                </div>
                <div className="flex flex-col gap-y-1 md:w-1/2 justify-start">
                  <label className="text-primary"> Status </label>
                  <StatusIndicator status={row?.status} />
                </div>
              </div>
              <div className="flex gap-4 flex-col gap-y-3 lg:flex-row items-center mt-5">
                <div className="w-full flex flex-col gap-y-1 md:w-1/2">
                  <label className="text-primary font-bold"> Start Date </label>
                  <span className="text-primary font-medium">
                    {formatDateTime(row?.startDate)}
                  </span>
                </div>

                <div className="w-full flex flex-col gap-y-1 md:w-1/2">
                  <label className="text-primary font-bold"> End Date </label>
                  <span className="text-primary font-medium">
                    {formatDateTime(row?.endDate)}
                  </span>
                </div>
              </div>
              <div className="flex gap-4 flex-col gap-y-3 lg:flex-row items-center mt-5">
                <div className="w-full flex flex-col gap-y-1 md:w-1/2">
                  <label className="text-primary font-bold">Created Date</label>
                  <span className="text-primary font-medium">
                    {formatDateTime(row?.createdAt)}
                  </span>
                </div>

                <div className="w-full flex flex-col gap-y-1 md:w-1/2">
                  <label className="text-primary font-bold">Updated Date</label>
                  <span className="text-primary font-medium">
                    {formatDateTime(row?.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetails;
