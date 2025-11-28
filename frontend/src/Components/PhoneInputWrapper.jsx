import React from "react";
import PhoneInputComponent from "./PhoneInputComponent";

function PhoneInputWrapper({
  phoneValues,
  error,
  setError,
  PreferredCountryCodes,
  defaultCountryCode,
  handlePhoneChange,
  CombinedToSeperate,
}) {
  console.log("the phone values inside wrapper is", phoneValues);
  return (
    <PhoneInputComponent
      phoneValues={phoneValues}
      PreferredCountryCodes={PreferredCountryCodes}
      handlePhoneChange={handlePhoneChange}
      error={error}
      defaultCountryCode={defaultCountryCode}
      setError={setError}
      CombinedToSeperate={CombinedToSeperate}
      // containerCss="flex relative border border-gray-300 rounded-lg h-[48px]"
      // selectedFlagCss="border border-gray-300 rounded-lg flag-div flex items-center cursor-pointer px-2 bg-gray-100"
      // selectedCountryCss="flex gap-2 px-2 py-1.5 cursor-pointer items-center bg-gray-200"
      // dropdownCss="absolute top-[51px] left-0 right-0 bg-white border border-gray-400 z-30 max-h-[250px] overflow-y-auto shadow-lg rounded-md"
      // searchInputCss="px-4 py-3 border border-gray-400 rounded-lg ms-4 m-3 my-3 w-[92.5%] focus:ring-0 focus:border-0 focus:outline-[#00553E]"
      // ulCss=""
      // PreferredliCss="flex gap-2 px-2 py-1.5 cursor-pointer items-center hover:bg-[#cccccc]"
      // filteredliCss="flex gap-2 px-2 py-1.5 cursor-pointer items-center hover:bg-[#cccccc]"
      // liCss="flex gap-2 px-2 py-1.5 cursor-pointer items-center hover:bg-[#cccccc]"
      // inputCss="border-0 bg-transparent focus:outline-none focus:ring-0 focus:border-0 h-full w-full"
    />
  );
}

export default PhoneInputWrapper;
