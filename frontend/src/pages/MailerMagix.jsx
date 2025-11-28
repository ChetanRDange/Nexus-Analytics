import React, { useEffect, useState } from "react";
import Add from "../assets/svgs/add.svg";
import useFetch from "../hooks/useFetch";
import useMutation from "../hooks/useMutation";
import InputComponent from "./../Components/InputComponent";

const MailerMagix = () => {
  const [magixDetails, setMagixDetails] = useState({ list_uid: "", token: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [loading, setLoading] = useState(true); // true by default

  const { data: settingData, loading: MailerMagixLoading } = useFetch(
    `/private/mailerMagix`
  );

  useEffect(() => {
    if (settingData && settingData.data?.uid) {
      setMagixDetails({
        list_uid: settingData.data.uid,
        token: settingData.data.key,
      });
      setHasData(true);
    } else {
      setHasData(false);
    }
  }, [settingData]);

  const { callApi } = useMutation();

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    const res = await callApi("/private/mailerMagix", "POST", magixDetails);
    if (res) {
      setHasData(true);
      setIsEditing(false);
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    if (hasData) {
      setIsEditing(false);
      // Reset to original values
      fetchSettings();
    } else {
      setIsCreating(false);
      setMagixDetails({ list_uid: "", token: "" });
    }
  };

  if (!hasData && !isCreating) {
    return (
      <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden">
        <div className="w-full pb-8 border-b border-border gap-y-4 gap-2 flex flex-col items-start md:flex-row xl:flex-row justify-between">
          <div>
            <span className="text-3xl font-semibold text-dark">
              Mailer Magix
            </span>
          </div>
        </div>

        {!loading && ( // <-- hide until loading is false
          <div className="w-full flex justify-center items-center mt-12">
            <button
              onClick={() => setIsCreating(true)}
              className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-primarydark text-white"
              id="button-241"
            >
              <img src={Add} alt="Add" />
              <span className="hidden md:block">
                Create Mailer Magix Configuration
              </span>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden">
         <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex justify-between items-center   ">
          <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
           Mailer Magix
          </h4>

        <div className="flex gap-2">
          {(isEditing || isCreating) && (
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
              id="button-242"
            >
              Cancel
            </button>
          )}
          {hasData && !isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex gap-2 h-fit items-center px-3 md:px-3 sm:px-4 rounded-xl py-2 bg-primary hover:bg-primarydark text-white"
              id="button-243"
            >
              Edit
            </button>
          ) : (
            (isEditing || isCreating) && (
              <button
                onClick={handleCreateOrUpdate}
                className="flex gap-2 h-fit items-center px-2 md:px-2 sm:px-4 rounded-xl py-2 bg-primary hover:bg-primarydark text-white"
                id="button-244"
              >
                {hasData ? "Update" : "Create"}
              </button>
            )
          )}
        </div>
      </div>

      <div className="w-full justify-center items-center mt-8 pb-8 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="text-primary flex items-center gap-1">
              Mailer Magix Settings
            </span>
            <span className="text-secondary font-normal">
              {hasData
                ? "Edit Mailer Magix Key & List UID"
                : "Add Mailer Magix Key & List UID"}
            </span>
          </div>

          <form className="w-full" method="post">
            <div className="relative w-full">
              <InputComponent
                inputType="text"
                name="list_uid"
                id="list_uid"
                labelName="List UID"
                labelColor="primary"
                placeholderName="List UID"
                placeholderColor="secondary"
                textColor="text-secondary"
                borderRadius="xl"
                activeBorderColor="blue"
                disabled={!isEditing && !isCreating}
                value={magixDetails?.list_uid || ""}
                onChange={(e) =>
                  setMagixDetails((prev) => ({
                    ...prev,
                    list_uid: e.target.value,
                  }))
                }
                onDoubleClick={() =>
                  !isEditing && hasData && setIsEditing(true)
                }
                required
              />
            </div>
            <div className="relative w-full mt-5 mb-5">
              <InputComponent
                inputType="text"
                name="token"
                id="token"
                labelName="Mailer Magix Key"
                labelColor="primary"
                placeholderName="Mailer Magix Key"
                placeholderColor="secondary"
                textColor="text-secondary"
                borderRadius="xl"
                activeBorderColor="blue"
                disabled={!isEditing && !isCreating}
                value={magixDetails?.token || ""}
                onChange={(e) =>
                  setMagixDetails((prev) => ({
                    ...prev,
                    token: e.target.value,
                  }))
                }
                onDoubleClick={() =>
                  !isEditing && hasData && setIsEditing(true)
                }
                required
              />
            </div>
          </form>
        </div>
      </div>

      <div className="flex w-full justify-end gap-2">
        {(isEditing || isCreating) && (
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
            id="button-242"
          >
            Cancel
          </button>
        )}
        {hasData && !isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex gap-2 h-fit items-center px-3 md:px-3 sm:px-4 rounded-xl py-2 bg-primary hover:bg-primarydark text-white"
            id="button-243"
          >
            Edit
          </button>
        ) : (
          (isEditing || isCreating) && (
            <button
              onClick={handleCreateOrUpdate}
              className="flex gap-2 h-fit items-center px-2 md:px-2 sm:px-4 rounded-xl py-2 bg-primary hover:bg-primarydark text-white"
              id="button-244"
            >
              {hasData ? "Update" : "Create"}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default MailerMagix;
