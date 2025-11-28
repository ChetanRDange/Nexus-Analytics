import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import formatDateTime from "../utils/DateFormat";
import { PhoneWithFlag } from "../Components/countryCode";

const ViewCompanyUser = () => {
  const { id } = useParams();
  const [isScrollable, setIsScrollable] = useState(false);

  const checkScrollability = () => {
    const contentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    setIsScrollable(contentHeight > windowHeight);
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener("resize", checkScrollability);
    return () => {
      window.removeEventListener("resize", checkScrollability);
    };
  }, []);

  const { data: res } = useFetch(`/private/companies/getCompanyUser/${id}`);
  const row = res?.data;

  return (
    <div className="min-h-screen py-8 p-4 sm:p-5 overflow-x-hidden">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex justify-between items-center   ">
        <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
          Company User Details
        </h4>

        <div className="flex gap-2">
          <Link
            id="back"
            to="/company-users"
            className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
          >
            Back
          </Link>
          <Link
            id="edit"
            to={`/edit-company-user/${id}`}
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
          >
            Edit
          </Link>
        </div>
      </div>

      <div className="pb-0">
        <div className="w-full justify-center items-center mt-8 mb-5 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="w-full md:w-7/12">
              <span className=" text-primary mb-2 whitespace-nowrap md:whitespace-wrap">
                Company User Details
              </span>
            </div>
            <div className="w-full">
              <div className="w-full flex flex-col gap-y-1">
                <label className="text-primary font-bold"> Full Name </label>
                <span className="text-primary font-medium">
                  {row?.name.charAt(0).toUpperCase() + row?.name.slice(1)}
                </span>
              </div>
              <div className="w-full flex flex-col gap-y-1 mt-5">
                <label className="text-primary font-bold"> Email ID </label>
                <span className="text-primary font-medium">{row?.email}</span>
              </div>
              <div className="w-full flex flex-col gap-y-1 mt-5">
                <label className="text-primary"> Contact Number </label>
                {/* <span className="flex gap-1 items-center">
                  <span className="text-primary font-medium">
                    +{row?.phoneCode}
                  </span>
                  <span className="text-primary font-medium">{row?.phone}</span>
                </span> */}
               <span className="flex gap-1 items-center">
               <span className="text-primary font-medium">

                  {row ? (
                    <PhoneWithFlag
                      phoneCode={row?.phoneCode}
                      phone={row?.phone}
                    />
                  ) : (
                    "NA"
                  )}

                </span>
                </span>
              </div>
              <div className="w-full flex flex-col gap-y-1 mt-5">
                <label className="text-primary font-bold"> Is Verified </label>
                <span className="text-primary font-medium">
                  {row?.isVerified ? "Yes" : "No"}
                </span>
              </div>
              <div className="w-full flex flex-col gap-y-1 mt-5">
                <label className="text-primary font-bold">
                  {" "}
                  Is SuperAdmin{" "}
                </label>
                <span className="text-primary font-medium">
                  {row?.isSuperAdmin ? "Yes" : "No"}
                </span>
              </div>
              <div className="w-full flex flex-col gap-y-1 mt-5">
                <label className="text-primary font-bold"> Is Blocked? </label>
                <span className="text-primary font-medium">
                  {row?.passwordBlockedTill
                    ? `Blocked till ${formatDateTime(row?.passwordBlockedTill)}`
                    : "No"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

        <div className="w-full flex gap-4 justify-end items-end">
           <div className="flex gap-2">
          <Link
            id="back"
            to="/company-users"
            className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
          >
            Back
          </Link>
          <Link
            id="edit"
            to={`/edit-company-user/${id}`}
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
          >
            Edit
          </Link>
        </div>
        </div>
    </div>
  );
};

export default ViewCompanyUser;
