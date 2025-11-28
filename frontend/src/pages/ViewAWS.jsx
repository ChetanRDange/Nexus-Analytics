import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const ViewAws = () => {
  const [isScrollable, setIsScrollable] = useState(false);
  const { awsId } = useParams();

  const { data: res, reFetch } = useFetch(`/private/aws/${awsId}`);
  const awsRecord = res?.data;

  return (
    <>
      <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden">
        <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex items-start md:flex-row xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
          <div>
            <span className="text-3xl font-semibold text-dark">
              AWS Details
            </span>
          </div>
          <div className=" w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
            <Link
              id="back"
              to="/aws-settings"
              className="px-4 py-2 text-primary hover:bg-hover  font-medium bg-main rounded-xl border border-primary whitespace-nowrap"
            >
              Back
            </Link>
          </div>
        </div>

        <div className="w-full justify-center items-center mt-6 pb-4 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end border-b border-primary">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className=" text-primary flex items-center gap-1">
                AWS Account Information
              </span>
              <span className="text-secondary font-normal ">
                AWS Overview and Details
              </span>
            </div>

            <form className="w-full " method="post">
              <div className="w-full">
                <label className="block  font-bold text-primary">
                  AWS Name
                </label>
                <div className="mt-1">
                  <p className="font-medium text-dark ">
                    {awsRecord?.name || "N/A"}
                  </p>
                </div>
              </div>

              <div className="w-full mt-5 ">
                <label className="block  font-bold text-primary">
                  AWS Region
                </label>
                <div className="mt-1">
                  <p className="font-medium text-dark ">
                    {awsRecord?.awsRegion || "N/A"}
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* AWS S3 Bucket Information */}
        <div className="w-full justify-center items-center mt-6 pb-4 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end border-b border-primary">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className=" text-primary flex items-center gap-1">
                AWS S3 Bucket Information
              </span>
            </div>

            <form className="w-full " method="post">
              <div className="w-full">
                <label className="block  font-bold text-primary">
                  AWS Bucket
                </label>
                <div className="mt-1">
                  <p className="font-medium text-dark ">
                    {awsRecord?.awsBucket || "N/A"}
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="w-full justify-center items-center mt-8 pb-8 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className=" text-primary flex items-center gap-1">
                AWS Security Credentials
              </span>
            </div>

            <form className="w-full " method="post">
              <div className="w-full">
                <label className="block  font-bold text-primary">
                  AWS Access Key
                </label>
                <div className="mt-1">
                  <p className="font-medium text-dark ">
                    {awsRecord?.awsAccess || "N/A"}
                  </p>
                </div>
              </div>
              <div className="w-full mt-5">
                <label className="block  font-bold text-primary">
                  AWS Secret Key
                </label>
                <div className="mt-1">
                  <p className="font-medium text-dark ">
                    {awsRecord?.awsSecret || "N/A"}
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

          <div className="sm:hidden w-full flex justify-end items-center gap-4 pt-8">
            <Link
              id="back-1"
              to="/aws-settings"
              className="px-4 py-2 text-primary font-medium hover:bg-hover bg-main rounded-xl border border-primary whitespace-nowrap"
            >
              Back
            </Link>
          </div>
      </div>
    </>
  );
};

export default ViewAws;
