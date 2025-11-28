import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import formatDateTime from "../utils/DateFormat";
import useFetch from "../hooks/useFetch";

const EmailStatusDetails = () => {
  const { emailId } = useParams();
  const { data: res } = useFetch(`/private/logs/email/${emailId}`);
  const row = res?.data;
  return (
    <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex justify-between items-center   ">
        <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
          Email Logs Details
        </h4>

        <div className="flex gap-2">
          <Link
            id="back"
            to="/email-logs"
            className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
          >
            Back
          </Link>
        </div>
      </div>

      <div className="mt-8 mb-5 pb-8">
        <div className="w-full  flex flex-col gap-y-6 lg:pr-40 md:pr-5 md:flex-row justify-evenly">
          <div className="w-full md:w-7/12">
            <h3 className="text-primary mb-2">Email Log Details</h3>
          </div>
          <div className="w-full flex flex-col gap-y-5">
            <DetailRow label="From" value={row?.from} />
            <DetailRow label="To">
              <a
                href={`mailto:${row?.to}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {row?.to}
              </a>
            </DetailRow>
            <DetailRow label="Subject" value={row?.subject} />
            <DetailRow label="Error" value={row?.error} />
            <DetailRow
              label="Created Date"
              value={formatDateTime(row?.createdAt)}
            />
            <DetailRow
              label="Updated Date"
              value={formatDateTime(row?.updatedAt)}
            />

            <div className="w-fit flex flex-col gap-y-1">
              <label className="text-primary font-bold">Status</label>
              <div
                className={`flex gap-2 items-center py-1 px-2 ${
                  row?.statusCode === 200
                    ? "bg-green-100 text-green-800"
                    : row?.statusCode === 400
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                } rounded-xl`}
              >
                <span
                  className="w-[12px] h-[12px] rounded-full"
                  style={{
                    backgroundColor:
                      row?.statusCode === 200
                        ? "green"
                        : row?.statusCode === 400
                        ? "red"
                        : "gray",
                  }}
                ></span>
                <span>{row?.statusCode}</span>
              </div>
            </div>
          </div>
          <div className="w-full">
            <h3 className="text-primary mb-4">Email Preview</h3>
            {row?.htmlTemplate ? (
              <div className="border border-gray-300 rounded-lg overflow-hidden m-4">
                <iframe
                  srcDoc={row.htmlTemplate}
                  title="Email Preview"
                  className="w-full h-[600px] border-0"
                  sandbox="allow-same-origin"
                />
              </div>
            ) : (
              <div className="text-gray-500 italic">
                No HTML template available
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 mb-20">
          <Link
            id="back"
            to="/email-logs"
            className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
          >
            Back
          </Link>
        </div>
    </div>
  );
};

const DetailRow = ({ label, value, children }) => (
  <div className="w-full flex flex-col gap-y-1">
    <label className="text-primary font-bold">{label}</label>
    <span className="text-primary font-medium">{children || value}</span>
  </div>
);

export default EmailStatusDetails;
