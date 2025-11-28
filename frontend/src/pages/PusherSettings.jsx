import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputComponent from "../Components/InputComponent";
import Info from "../assets/svgs/info.svg";
import ToggleComponent from "../Components/ToggleComponent";
import Brand from "../assets/svgs/settings/brand.svg";

const PusherSettings = () => {
  const [isEnableTrial, setIsEnableTrial] = useState(false);

  return (
    <div className="min-h-screen mb-10 py-8 p-4 sm:p-5 overflow-x-hidden">
      <div className="w-full flex flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
        <div className="">
          <h4 className="text-3xl text-dark">Pusher Settings</h4>
        </div>
        <div className="w-full flex justify-end sm:w-fit gap-4">
          <button
            className="flex gap-2 items-center px-2 sm:px-4 rounded-xl py-2 bg-primary hover:bg-primarydark text-white"
            id="button-263"
          >
            <Link id="save-changes">Save Changes</Link>
          </button>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary flex items-center gap-1">
              Pusher Settings <img src={Brand} alt="brand" />
            </span>
          </div>

          <form className="w-full">
            <InputComponent
              mt="0"
              inputType="text"
              name="apiKey"
              id="apiKey"
              labelName="Pusher API Key"
              labelColor="primary"
              placeholderName="Pusher API Key"
              placeholderColor="secondary"
              textColor="text-dark"
              borderRadius="xl"
              activeBorderColor="blue"
              // {...(error? && { error: error })}
              // {...(typeof error !== "undefined" ? { error } : {})}
            />
            {/* {error && (
                    <div className="mt-2 text-[#F04438] text-sm font-normal">
                      {error}
                      // {pusher_api_key_empty_error,pusher_api_key_format_error}
                    </div>
                  )} */}

            <InputComponent
              mt="5"
              inputType="text"
              name="apiId"
              id="apiId"
              labelName="Pusher APP ID"
              labelColor="primary"
              placeholderName="Pusher APP ID"
              placeholderColor="secondary"
              textColor="text-dark"
              borderRadius="xl"
              activeBorderColor="blue"
              // {...(error? && { error: error })}
              // {...(typeof error !== "undefined" ? { error } : {})}
            />
            {/* {error && (
                    <div className="mt-2 text-[#F04438] text-sm font-normal">
                      {error}
                      // {pusher_app_id_empty_error,pusher_app_id_format_error}
                    </div>
                  )} */}

            <InputComponent
              mt="5"
              inputType="text"
              name="apiSecret"
              id="apiSecret"
              labelName="Pusher App Secret"
              labelColor="primary"
              placeholderName="Pusher App Secret"
              placeholderColor="secondary"
              textColor="text-dark"
              borderRadius="xl"
              activeBorderColor="blue"

              // {...(error? && { error: error })}
              // {...(typeof error !== "undefined" ? { error } : {})}
            />
            {/* {error && (
                  <div className="mt-2 text-[#F04438] text-sm font-normal">
                    {error}
                    // {app_secret_empty_error,app_secret_format_error,app_secret_length_error,app_secret_leading_trailing_format_error,app_secret_secure_error}
                  </div>
                )} */}

            <InputComponent
              mt="5"
              inputType="text"
              name="cluster"
              id="cluster"
              labelName="Pusher Cluster"
              labelColor="primary"
              placeholderName="Pusher Cluster"
              placeholderColor="secondary"
              textColor="text-dark"
              borderRadius="xl"
              activeBorderColor="blue"
              // {...(error? && { error: error })}
              // {...(typeof error !== "undefined" ? { error } : {})}
            />
            {/* {error && (
                    <div className="mt-2 text-[#F04438] text-sm font-normal">
                      {error}
                      // {cluster_empty_error,invalid_cluster_error}
                    </div>
                  )} */}

            <ToggleComponent
              mt="6"
              label="Enable Encryption"
              isIcon={true}
              icon={Info}
              isEnableState={isEnableTrial}
              setIsEnableState={setIsEnableTrial}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default PusherSettings;
