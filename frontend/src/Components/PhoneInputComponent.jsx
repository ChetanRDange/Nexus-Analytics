import React, { useRef } from "react";
import { useEffect, useState } from "react";
import jsonPhoneData from "../utils/PhoneInputNewProcessed.json"; // Ensure this has country data
import "../flag.css";
const arrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="#5f6368"
  >
    <path d="M480-360 280-560h400L480-360Z" />
  </svg>
);
const PhoneInputComponent = ({
  phoneValues,
  handlePhoneChange = () => {},
  PreferredCountryCodes = [],
  defaultCountryCode,
  setError = () => {},
  error,
  CombinedToSeperate = false,
  dropdownArrow = arrow,
  containerCss = "containerCss",
  selectedFlagCss = "selectedFlagCss",
  selectedCountryCss = "selectedCountryCss",
  dropdownCss = "dropdownCss",
  searchInputCss = "searchInputCss ",
  ulCss = "ulCss",
  PreferredliCss = "",
  filteredliCss = "",
  liCss = "liCss",
  inputCss = "inputCss",
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    if (CombinedToSeperate) {
      handleInputChange({ target: { value: phoneValues?.number } });
    }
  }, [CombinedToSeperate]);
  const defSelectedCountry = (defaultCountryCode &&
    jsonPhoneData?.find(
      (data) => data?.dialingCode === defaultCountryCode
    )) || {
    name: "India",
    regions: ["asia"],
    code: "in",
    dialingCode: "91",
    phoneNumberFormat: "0##########",
  };

  const [selectedCountry, setSelectedCountry] = useState(defSelectedCountry);

  const [phoneData, setPhoneData] = useState({
    countryCode: selectedCountry?.dialingCode,
    number: phoneValues?.number || "",
    tempCountryCode: selectedCountry?.dialingCode,
    FormattedNumber: phoneValues?.number
      ? formatPhoneNumber(phoneValues?.number, selectedCountry)
      : "",
    countryCodeAndNumber: selectedCountry?.dialingCode + "",
    countryCodeAndFormattedNumber: selectedCountry?.dialingCode + "",
    selectedCountry: selectedCountry,
    editCode: false,
  });
  useEffect(() => {
    if (!phoneValues?.editNumber) return;
    const selCountry = jsonPhoneData?.find(
      (data) => data?.dialingCode === phoneValues?.editCode
    );
    const cCode = phoneValues?.editCode
      ? selCountry?.dialingCode
      : selectedCountry?.dialingCode;
    setPhoneData({
      countryCode: cCode,
      number: phoneValues?.editNumber || "",
      tempCountryCode: cCode,
      FormattedNumber: phoneValues?.editNumber
        ? formatPhoneNumber(phoneValues?.editNumber, selectedCountry)
        : "",
      countryCodeAndNumber: cCode + "",
      countryCodeAndFormattedNumber: cCode + "",
      selectedCountry: selectedCountry,
    });
    selCountry && setSelectedCountry(selCountry);
  }, [phoneValues?.editNumber, phoneValues?.editCode]);

  const getCountryCode = async () => {
    try {
      const res = await fetch(`https://ipapi.co/json/`);
      const data = await res.json();

      if (res.ok) {
        const countryCode = data.country_code;
        const temp = jsonPhoneData.find(
          (entry) => entry.code === countryCode.toLowerCase()
        );
        if (temp) {
          setSelectedCountry(temp);
          setPhoneData({
            ...phoneData,
            countryCode: temp.dialingCode,
            tempCountryCode: temp.dialingCode,
            countryCodeAndNumber: temp?.dialingCode + "",
            countryCodeAndFormattedNumber: temp?.dialingCode + "",
            selectedCountry: temp,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    !defaultCountryCode && getCountryCode();
  }, []);
  const filteredCountries = jsonPhoneData
    .filter((country) => !PreferredCountryCodes.includes(country.dialingCode))
    .filter(
      (country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.dialingCode.includes(searchTerm)
    );
  const PreferredCountries = jsonPhoneData
    .filter((country) => PreferredCountryCodes.includes(country.dialingCode))
    .sort((a, b) => a.order - b.order);
  const handleDropdownToggle = () => setDropdownOpen(!dropdownOpen);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (!dropdownRef?.current?.contains(event.target)) {
      setDropdownOpen(false);
      setSearchTerm("");
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    handlePhoneChange(phoneData);
  }, [phoneData]);
  function formatPhoneNumber(number, matchedCode) {
    const matched =
      matchedCode?.phoneNumberFormat || selectedCountry.phoneNumberFormat;
    const format = Array.isArray(matched)
      ? matched[matched?.length - 1]
      : matched;

    let formattedNumber = "";
    let numIndex = 0;
    if (!number) return;
    // Replace # placeholders with actual digits
    for (let char of format) {
      if (char === "#") {
        if (numIndex < number.length) {
          formattedNumber += number[numIndex++];
        } else {
          formattedNumber += ""; // Fallback if number is shorter
        }
      } else if (char === "0") {
        formattedNumber += ""; // Fallback if number is shorter
      } else if (Number.isInteger(Number(char))) {
        formattedNumber += "";
      } else {
        formattedNumber += char;
      }
    }
    return formattedNumber.replace(/\D+$/, "");
  }

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    const matchedCode = jsonPhoneData
      ?.filter((data) => value.startsWith(data?.dialingCode))
      .sort((a, b) => b.dialingCode.length - a.dialingCode.length)
      .sort((a, b) => a.order - b.order)[0];
    if (matchedCode) {
      setSelectedCountry(matchedCode);
      const phoneCode = matchedCode?.dialingCode;
      let number = value.slice(phoneCode?.length);
      if (Array.isArray(matchedCode?.phoneNumberFormat)) {
        const phoneFormatLengths = matchedCode?.phoneNumberFormat?.map(
          (format) => format?.split("#").length - 1
        );
        number = number.slice(0, Math.max(...phoneFormatLengths));

        if (number?.length < Math.min(...phoneFormatLengths)) {
          setError(
            `Invalid Number Format. Number Should Have ${
              Math.min(...phoneFormatLengths) +
              " - " +
              Math.max(...phoneFormatLengths)
            } Digit`
          );
        } else {
          setError();
        }

        if (number.length > Math.max(...phoneFormatLengths)) {
          return;
        }
        const formattedNumber = formatPhoneNumber(number, matchedCode)
          ?.slice(-1)
          ?.match(/\d/)
          ? formatPhoneNumber(number, matchedCode)
          : formatPhoneNumber(number, matchedCode)?.slice(0, -1);
        setPhoneData({
          countryCode: phoneCode,
          number: number,
          tempCountryCode: phoneCode,
          FormattedNumber: formattedNumber,
          countryCodeAndNumber: phoneCode + number,
          countryCodeAndFormattedNumber: phoneCode + " " + formattedNumber,
          selectedCountry: matchedCode,
        });
      } else {
        const phoneFormatLength =
          matchedCode?.phoneNumberFormat?.split("#").length - 1;
        number = number.slice(0, phoneFormatLength);
        if (number?.length < phoneFormatLength) {
          setError(
            `Invalid Number Format. Number Should Have ${phoneFormatLength} Digit`
          );
        } else {
          setError();
        }
        if (number.length > phoneFormatLength) {
          return;
        }
        const formattedNumber = formatPhoneNumber(number, matchedCode)
          ?.slice(-1)
          ?.match(/\d/)
          ? formatPhoneNumber(number, matchedCode)
          : formatPhoneNumber(number, matchedCode)?.slice(0, -1);
        setPhoneData({
          countryCode: phoneCode,
          number: number,
          tempCountryCode: phoneCode,
          FormattedNumber: formattedNumber,
          countryCodeAndNumber: phoneCode + number,
          countryCodeAndFormattedNumber: phoneCode + " " + formattedNumber,
          selectedCountry: matchedCode,
        });
      }
    } else {
      const number = value.slice(selectedCountry?.dialingCode?.length);
      const formattedNumber = formatPhoneNumber(number)?.slice(-1)?.match(/\d/)
        ? formatPhoneNumber(number)
        : formatPhoneNumber(number)?.slice(0, -1);
      setPhoneData((prev) => ({
        ...prev,
        number: number,
        tempCountryCode: value.slice(0, selectedCountry?.dialingCode?.length),
        FormattedNumber: formattedNumber,
        countryCodeAndNumber: prev.countryCode + number,
        countryCodeAndFormattedNumber: prev.countryCode + " " + formattedNumber,
        selectedCountry: matchedCode,
      }));
    }
    setDropdownOpen(false);
  };
  if (CombinedToSeperate) return;
  return (
    <>
      <style>
        {`
        .containerCss
        
        {
        display: flex; 
position: relative; 
border:1px solid #D1D5DB;
border-radius: 0.5rem;
height: 3rem; 
        }
.selectedFlagCss{
display: flex; 
padding-left: 0.5rem;
padding-right: 0.5rem; 
align-items: center; 
border-radius: 0.5rem; 
border-width: 1px; 
border-color: #D1D5DB; 
background-color: #F3F4F6; 
cursor: pointer; 
}
.selectedCountryCss{
background-color: transparent;
border:none;
width:100%;
display: flex; 
padding-top: 0.375rem;
padding-bottom: 0.375rem; 
padding-left: 0.5rem;
padding-right: 0.5rem; 
gap: 0.5rem; 
align-items: center; 
background-color: #E5E7EB; 
cursor: pointer; 
}
.dropdownCss{
overflow-y: auto; 
position: absolute; 
right: 0; 
left: 0; 
top:48px;
z-index: 30; 
border-radius: 0.375rem; 
border-width: 1px; 
border-color: #9CA3AF; 
max-height: 16rem; 
background-color: #ffffff; 
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); 
}
.searchInputCss{
padding-top: 0.75rem;
padding-bottom: 0.75rem; 
padding-left: 1rem;
padding-right: 1rem; 
margin: 0.75rem; 
margin-top: 0.75rem;
margin-bottom: 0.75rem; 
border-radius: 0.5rem; 
border-width: 1px; 
border-color: #9CA3AF; 
width: 91.666667%; 
}
.ulCss{
margin:0px;
padding:0px;
}
.liCss{
background-color: transparent;
border:none;
width:100%;
display: flex; 
padding-top: 0.375rem;
padding-bottom: 0.375rem; 
padding-left: 0.5rem;
padding-right: 0.5rem; 
gap: 0.5rem; 
align-items: center; 
cursor: pointer; 

}
.liCss:hover {
 background-color: #D1D5DB; 
 }
 .inputCss{
 border-width: 0; 
width: 100%; 
height: 100%; 
background-color: transparent;
border 
 }
.inputCss:focus{

outline: none;
}
        
      `}
      </style>
      <div
        className={` px-2 mt-2 flex rounded-[10px] border-[1px] w-full h-[40px] items-center relative 
    ${error ? "border-error" : "border-border"} 
    text-[#64748B] bg-main focus:outline-none placeholder:text-[#64748B] focus:border-[#2563eb]`}
      >
        <div
          onClick={handleDropdownToggle}
          className="bg-main border-border flex rounded-[10px] justify-center items-center cursor-pointer"
        >
          <div
            className={`selected-country-flag flag ${selectedCountry?.code?.toLowerCase()}`}
          />
          <span>{dropdownArrow}</span>
        </div>

        {dropdownOpen && (
          <div
            className={`absolute ${dropdownCss}`} // Keep your existing dropdownCss class
            ref={dropdownRef}
          >
            <input
              className={`w-full h-[40px] gap-2 py-4 px-2.5 mr-2 rounded-[10px] border-[1px] ${searchInputCss} focus:border-[#2563eb] `}
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by country name or code"
              onClick={(e) => e.stopPropagation()}
            />
            <ul className={ulCss}>
              {PreferredCountries.map((country) => (
                <button
                  className={`w-full py-2 px-3 font-bold text-left bg-main ${
                    selectedCountry.code === country.code
                      ? selectedCountryCss
                      : PreferredliCss || liCss
                  }`}
                  key={country.code}
                  onClick={() => {
                    handleInputChange({
                      target: {
                        value: country.dialingCode + phoneData?.number,
                      },
                    });
                  }}
                >
                  {country.code && (
                    <div
                      title={`${country.name} flag`}
                      className={`country-flag flag ${country.code}`}
                    />
                  )}
                  {country.name} ({country.dialingCode})
                </button>
              ))}
              <hr className="my-2 border-border " />
              {filteredCountries.map((country) => (
                <button
                  className={`w-full py-2 px-3 text-left  ${
                    selectedCountry.code === country.code
                      ? selectedCountryCss
                      : filteredliCss || liCss
                  }`}
                  key={country.code}
                  onClick={() => {
                    handleInputChange({
                      target: {
                        value: country.dialingCode + phoneData?.number,
                      },
                    });
                  }}
                >
                  {country.code && (
                    <div
                      title={`${country.name} flag`}
                      className={`country-flag flag ${country.code}`}
                    />
                  )}
                  {country.name} ({country.dialingCode})
                </button>
              ))}
            </ul>
          </div>
        )}

        <input
          type="tel"
          value={
            phoneData?.FormattedNumber || phoneData?.number
              ? "+ " +
                phoneData?.tempCountryCode +
                " " +
                (phoneData?.FormattedNumber || phoneData?.number)
              : "+ " + phoneData?.tempCountryCode
          }
          className={`w-full py-2.5 px-2.5 mr-2  mt-0.8 rounded-[10px] border-[1px] ${inputCss} focus:outline-none focus:border-[#2563eb] text-secondary `}
          onChange={handleInputChange}
        />
      </div>
    </>
  );
};

export default PhoneInputComponent;
