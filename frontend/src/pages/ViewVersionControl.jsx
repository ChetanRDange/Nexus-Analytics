import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import formatDateTime from "../utils/DateFormat";

const ViewVersionControl = () => {
  const { id } = useParams();
  const { data: res } = useFetch(`/private/versionControl/${id}`);
  const versionData = res?.data;
  console.log(versionData);

  return (
    <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex justify-between items-center   ">
        <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
          View Version Control
        </h4>

        <div className="flex gap-2">
          <Link
            id="back"
            to="/version-control"
            className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-darkgray whitespace-nowrap"
          >
            Back
          </Link>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="w-full align-middle">
            <div className="flex flex-col gap-y-2 md:flex-row md:justify-between items-center gap-2 pt-3 pb-6 "></div>

            <div>
              <div className="w-full justify-center items-center gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
                <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
                  <div className="sm:w-7/12 w-full flex flex-col">
                    <span className="block  text-primary">Version Details</span>
                  </div>
                  <form className="w-full">
                    <div className="w-full sm:flex flex-row">
                      <div className="w-full ">
                        <label className="text-primary font-bold">
                          Version
                        </label>
                        <p className="mt-1 text-primary font-medium">
                          {versionData?.version || "N/A"}
                        </p>
                      </div>
                      <div className="w-full ">
                        <label className="text-primary font-bold">
                          Created By
                        </label>
                        <p className="mt-1 text-primary font-medium">
                          {versionData?.createdBy?.email || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="w-full sm:flex flex-row mt-2">
                      <div className="w-full ">
                        <label className="text-primary font-bold">
                          Breaking Change?
                        </label>
                        <p className="mt-1 text-primary font-medium">
                          {versionData?.isBreakingChange ? "True" : "False"}
                        </p>
                      </div>
                      <div className="w-full ">
                        <label className="text-primary font-bold">
                          Breaking Message
                        </label>
                        <p className="mt-1 text-primary font-medium">
                          {versionData?.breakingMessage || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="w-full mt-5 flex justify-between">
                      <div>
                        <label className="text-primary font-bold">
                          Created Date
                        </label>
                        <p className="mt-1 text-primary font-medium">
                          {formatDateTime(versionData?.createdAt)}
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:hidden flex w-full justify-end mt-8 gap-2">
          <Link
            id="back"
            to="/version-control"
            className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-darkgray whitespace-nowrap"
          >
            Back
          </Link>
        </div>
    </div>
  );
};

export default ViewVersionControl;
