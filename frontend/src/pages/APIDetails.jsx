import React from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import formatDateTime from "../utils/DateFormat";
import StatusIndicator from "../Components/StatusIndicator";

const APIDetails = () => {
  const { id } = useParams();
  const { data: res, loading } = useFetch(`/private/logs/api/${id}`);
  const row = res?.data;

  if (!row) return <div>Loading...</div>;

  return (
    <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex justify-between items-center   ">
        <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
          Logs Details
        </h4>

        <div className="flex gap-2">
          <Link
            id="back"
            to="/api-logs"
            className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
          >
            Back
          </Link>
        </div>
      </div>

      <div>
        <div className="w-full justify-center items-center mt-8 mb-5 pb-8 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="w-full md:w-7/12">
              <span className=" text-primary whitespace-nowrap md:whitespace-wrap">
                Log Details
              </span>
            </div>
            <div className="w-full flex gap-4 flex-col md:flex-row justify-evenly mt-[-20px]">
              {/* <DetailItem label="Log ID" value={row?._id} /> */}
              <div className="">
                <DetailItem label="IP Address" value={row?.ipAddress} />
                <DetailItem label="Country" value={row?.country} />
                <DetailItem label="City" value={row?.city} />
                <DetailItem label="Device" value={row?.device} />
                <DetailItem label="Endpoint" value={row?.endPoint} />
                {/* <DetailItem label="Method" value={row?.method} method /> */}
                <DetailItem
                  label="Method"
                  value={<StatusIndicator status={row?.method} />}
                />
              </div>
              <div className="">
                <DetailItem label="Status" value={row?.status} />
                <DetailItem label="Response Time" value={row?.responseTime} />
                <DetailItem
                  label="Created At"
                  value={formatDateTime(row?.createdAt)}
                />
                <DetailItem
                  label="Updated At"
                  value={formatDateTime(row?.updatedAt)}
                />
                <DetailItem label="User Name" value={row?.user?.name} />
                <DetailItem
                  label="Company Name"
                  value={row?.company?.companyName}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Link
          id="back"
          to="/api-logs"
          className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value, status, method }) => {
  const statusStyles = {
    Success: "bg-[#E6F8EF] text-[#027747]",
    Failed: "bg-[#FEF3F2] text-[#B32318]",
  };
  const statusColors = {
    Success: "#12B368",
    Failed: "#F04438",
  };

  const methodStyles = {
    GET: "bg-[#E6F8EF] text-[#027747]",
    POST: "bg-[#E6F2FF] text-[#0056B3]",
    PUT: "bg-[#FFF5E6] text-[#B36B00]",
    DELETE: "bg-[#FEF3F2] text-[#B32318]",
    PATCH: "bg-[#F8E6FF] text-[#6B0277]",
  };

  return (
    <div className="w-full flex flex-col gap-y-1 mt-5">
      <label className="text-primary font-bold">{label}</label>
      {status ? (
        <div
          className={`w-[10%] flex gap-2 items-center py-1 px-2 rounded-xl ${statusStyles[value]}`}
        >
          <span
            className="w-[12px] h-[12px] rounded-full"
            style={{ backgroundColor: statusColors[value] }}
          ></span>
          <span>{value || "N/A"}</span>
        </div>
      ) : method ? (
        <span
          className={`w-fit px-3 py-1 rounded-xl justify-center ${methodStyles[value]}`}
        >
          {value || "N/A"}
        </span>
      ) : (
        <span className="text-primary font-medium">{value || "N/A"}</span>
      )}
    </div>
  );
};

export default APIDetails;
