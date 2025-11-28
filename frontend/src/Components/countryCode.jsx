import React from "react";
import Flag from "react-world-flags";
import countries from "country-data";

const CountryDisplay = ({ phoneCode }) => {
  if (!phoneCode || phoneCode === "undefined") return "-";

  // Always ensure the phone code starts with '+'
  const normalizedPhoneCode = phoneCode.startsWith("+")
    ? phoneCode
    : `+${phoneCode}`;

  const getCountryByPhoneCode = (code) => {
    return Object.values(countries.countries).find(
      (c) => c.countryCallingCodes && c.countryCallingCodes.includes(code)
    );
  };

  const country = getCountryByPhoneCode(normalizedPhoneCode);

  return country ? (
    <div className="flex items-center gap-2">
      <Flag code={country.alpha2} style={{ width: "20px", height: "15px" }} />
      {country.name}
    </div>
  ) : (
    normalizedPhoneCode
  );
};

const PhoneWithFlag = ({ phoneCode, phone }) => {
  console.log("number is", phoneCode, phone);

  if (!phone) return "-";

  const normalizePhoneCode = (code) => {
    console.log("code is a ", code)
    if (!code || code == 'undefined') return null;
    const codeStr = String(code).trim(); // Always convert to string and remove extra spaces
    return codeStr.startsWith("+") ? codeStr : `+${codeStr}`;
  };

  const getCountryByPhoneCode = (code) => {
    const normalizedCode = normalizePhoneCode(code);
    return Object.values(countries.countries).find(
      (c) =>
        c.countryCallingCodes && c.countryCallingCodes.includes(normalizedCode)
    );
  };

  const normalizedPhoneCode = phoneCode ? normalizePhoneCode(phoneCode) : null;
  const country = normalizedPhoneCode ? getCountryByPhoneCode(phoneCode) : null;

  return (
    <div className="flex items-center gap-2">
      {country && (
        <Flag code={country.alpha2} style={{ width: "20px", height: "15px" }} />
      )}
      {normalizedPhoneCode ? `${normalizedPhoneCode} ${phone}` : `- ${phone}`}
    </div>
  );
};

export { CountryDisplay, PhoneWithFlag };
