import React, { useState, useEffect } from "react";
import ColorPaletComp from "../Components/ColorPaletComp";
import ToggleComponent from "../Components/ToggleComponent";

const PersonalizationSettings = () => {
  const [isEnableAMsg, setIsEnableAMsg] = useState(false);
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

  return (
    <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">
            Personalization Settings
          </span>
        </div>
        <div className="w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
          <button
            className="px-4 py-2 text-primary font-medium bg-white hover:bg-gray-50  rounded-xl border border-primary whitespace-nowrap"
            id="button-250"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
            id="button-251"
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="w-full justify-center items-center mt-8 mb-5 pb-8 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end border-b border-primary">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="text-primary flex  items-center gap-1">
              Theme Customizer
            </span>
          </div>
          <div className="w-full flex flex-col gap-6">
            <ColorPaletComp title="Primary Color Settings" />
            <div className="w-full">
              <ToggleComponent
                label={isEnableAMsg ? "Disable Dark Mode" : "Enable Dark Mode"}
                isEnableState={isEnableAMsg}
                setIsEnableState={setIsEnableAMsg}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center mt-8 mb-5 pb-8 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end border-b border-primary">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="text-primary flex  items-center gap-1">
              Chatbot Customization Section
            </span>
          </div>
          <div className="w-full flex flex-col gap-6">
            <ColorPaletComp title="Chatbot Icon Color" />
          </div>
        </div>
      </div>

      <div className="w-full justify-center items-center mt-8 mb-8 pb-40 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end border-b border-primary">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="text-primary flex  items-center gap-1">
              Email Template Customization Section
            </span>
          </div>
          <div className="w-full flex flex-col gap-6">
            <ColorPaletComp title="Email Template Color" />
          </div>
        </div>
      </div>

      <div className="w-full flex justify-end items-center gap-4 pb-20 ">
        <button
          className="px-4 py-2 text-primary font-medium bg-white hover:bg-gray-50  rounded-xl border border-primary whitespace-nowrap"
          id="button-252"
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
          id="button-253"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default PersonalizationSettings;
