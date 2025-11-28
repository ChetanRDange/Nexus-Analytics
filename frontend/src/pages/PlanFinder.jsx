import React from "react";
import PlanFeatureTableComp from "../Components/PlanFeatureTableComp";
import PricingPlans from "../Components/PricingPlans";
import FAQComp from "../Components/FAQComp";

const PlanFinder = () => {
  return (
    <>
      <div className="h-full py-8 p-4 sm:p-5">
        <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
          <div>
            <span className="text-3xl font-semibold text-dark">
              Plan Finder
            </span>
          </div>
          <div className=" w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
            <button
              className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
              id="button-260"
            >
              Save Changes
            </button>
          </div>
        </div>
        <div className="w-full justify-center items-center mt-8 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end border-b border-primary">
          <PricingPlans />
          <PlanFeatureTableComp />
          <FAQComp />
        </div>
      </div>
    </>
  );
};

export default PlanFinder;
