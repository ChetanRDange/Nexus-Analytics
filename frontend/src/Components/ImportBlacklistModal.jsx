import React from "react";
import Close from "../assets/svgs/close.svg";

const ImportBlacklistModal = ({
  isImportBlacklistModal,
  setIsImportBlacklistModal,
  fields = [],
  title,
}) => {
  if (!isImportBlacklistModal) return null;

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity"
          onClick={() => setIsImportBlacklistModal(false)}
        ></div>
        <div className="flex items-start py-5 justify-center w-full min-h-screen px-4 text-center lg:absolute lg:top-[12%]">
          <form className="bg-[#FFFFFF] rounded-2xl text-left overflow-hidden shadow-xl transform transition-all w-[95%] sm:w-[80%] md:w-[75%] lg:w-[70%] xl:w-[664px] 2xl:w-[664px] px-6 2xl:px-8 py-6">
            <div className="w-full flex flex-col justify-between items-center border-b border-primary">
              <div className="flex justify-between items-center w-full mb-5">
                <span className="text-black font-semibold text-xl">
                  {title}
                </span>
                <button onClick={() => setIsImportBlacklistModal(false)}
                  className="flex justify-end"
                 id="button-61">
                  <img src={Close} alt="close" />
                </button>
              </div>
            </div>

            <div className="w-full">
              <div className="w-full flex flex-col gap-y-2">
                {fields.map((field, index) => (
                  <div key={index} className="w-full mt-5">
                    <label className="block font-medium text-primary">
                      {field.label}
                    </label>
                    <div className="mt-1">
                      <p className="font-normal text-secondary">
                        {field.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ImportBlacklistModal;
