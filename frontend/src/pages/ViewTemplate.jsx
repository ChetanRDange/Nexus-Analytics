import React from "react";
import {
  Link,
  useInRouterContext,
  useNavigate,
  useParams,
} from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { IoMdRefresh } from "react-icons/io";
import useMutation from "../hooks/useMutation";

const ViewTemplate = () => {
  const { id } = useParams();
  const { callApi } = useMutation();
  const { data: res } = useFetch(`/private/emailTemplates/${id}`);
  const template = res?.data?.[0];
  const navigate = useNavigate();

  const handleReset = async () => {
    const result = await callApi(`/private/emailTemplates/reset/${id}`, "GET");
    if (result) {
      navigate("/email-template");
    }
  };

  return (
    <div className="min-h-screen py-8 p-4 sm:p-5 overflow-x-hidden">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex justify-between items-center   ">
        <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
          View Template
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
            to="/email-template"
            className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
          >
            Back
          </Link>
          <Link
            to={`/email-template/edit/${id}`}
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
          >
            Edit
          </Link>
        </div>
      </div>

      <div className="pb-8">
        <div className="w-full justify-center items-center mt-8 mb-5 pb-8 gap-y-4 gap-2">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="w-full">
              <div className="w-full flex flex-col gap-y-4">
                <div>
                  <label className="text-primary font-bold">
                    Template Name
                  </label>
                  <p className="text-primary font-medium mt-1">
                    {template?.name || "N/A"}
                  </p>
                </div>

                <div>
                  <label className="text-primary font-bold">Subject</label>
                  <p className="text-primary mt-1 font-medium">
                    {template?.subject}
                  </p>
                </div>

                <div>
                  <label className="text-primary font-bold">Module</label>
                  <p className="text-primary mt-1 font-medium">
                    {template?.module}
                  </p>
                </div>

                <div>
                  <label className="text-primary font-bold pb-2">
                    Email Body
                  </label>
                  <div
                    className="email-preview p-4 border border-gray-300 rounded bg-main text-primary mt-1 prose max-w-full break-words "
                    dangerouslySetInnerHTML={{ __html: template?.body }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 w-full justify-end">
        <Link
          to="/email-template"
          className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
        >
          Back
        </Link>
        <Link
          to={`/email-template/edit/${id}`}
          className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default ViewTemplate;
