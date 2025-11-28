import React, { useEffect, useState } from "react";
import InputComponent from "../Components/InputComponent";
import PhoneInput from "react-phone-input-2";
import ComponentDropdown from "../Components/ComponentDropdown";
import {
  global_business_name_empty_error,
  global_city_empty_error,
  global_email_addr_empty_error,
  global_flat_unit_empty_error,
  global_phone_empty_error,
  global_postcode_empty_error,
  global_street_empty_error,
  invalid_global_email_addr_error,
  invalid_global_phone_length_error,
} from "../Components/AllError";

import useFetch from "../hooks/useFetch";
import useMutation from "../hooks/useMutation";

const GlobalSettings = () => {
  const { callApi } = useMutation();

  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    phone: "",
    phoneCode: "",
    flatUnit: "",
    street: "",
    postCode: "",
  });

  const [countryDropdown, setCountryDropdown] = useState({
    showName: "Click to select an option",
    name: "",
  });

  const [stateDropdown, setStateDropdown] = useState({
    showName: "Click to select an option",
    name: "",
  });

  const [cityDropdown, setCityDropdown] = useState({
    showName: "Click to select an option",
    name: "",
  });

  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [errors, setErrors] = useState({});
  const [isFocused, setIsFocused] = useState(false);

  const getAddressCountries = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_LOCATION_API}/countries`);
      const { data } = await res.json();
      if (res.ok) {
        setCountry(data.countries);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAddressStates = async (country) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_LOCATION_API}/states?country=${country}`
      );
      const { data } = await res.json();
      if (res.ok) {
        setState(data.states);
      } else {
        setState([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAddressCities = async (state) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_LOCATION_API}/cities?state=${state}`
      );
      const { data } = await res.json();
      if (res.ok) {
        setCity(data.cities);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddressCountries();
  }, []);

  const { data: settingData } = useFetch(
    "/private/settings/global",
    {},
    country?.length
  );

  const validateForm = () => {
    const newErrors = {};

    if (!formData.businessName.trim()) {
      newErrors.businessName = global_business_name_empty_error;
    }

    if (!formData.email.trim()) {
      newErrors.email = global_email_addr_empty_error;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = invalid_global_email_addr_error;
    }

    if (!formData.phone) {
      newErrors.phone = global_phone_empty_error;
    } else if (formData.phone.length < 10) {
      newErrors.phone = invalid_global_phone_length_error;
    }

    if (!formData.flatUnit.trim()) {
      newErrors.flatUnit = global_flat_unit_empty_error;
    }

    if (!formData.street.trim()) {
      newErrors.street = global_street_empty_error;
    }

    if (!formData.postCode.trim()) {
      newErrors.postCode = global_postcode_empty_error;
    }

    if (!countryDropdown.name) {
      newErrors.country = "Please select a country";
    }

    if (!cityDropdown.name) {
      newErrors.city = global_city_empty_error;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (countryDropdown._id) {
      setStateDropdown({
        showName: "Click to select an option",
        name: "",
        _id: null,
      });
      setCityDropdown({
        showName: "Click to select an option",
        name: "",
        _id: null,
      });
      setCity([]); // Clear city list
      getAddressStates(countryDropdown._id);
    }
  }, [countryDropdown._id]);

  useEffect(() => {
    if (stateDropdown._id) {
      setCityDropdown({
        showName: "Click to select an option",
        name: "",
        _id: null,
      });
      getAddressCities(stateDropdown._id);
    }
  }, [stateDropdown._id]);

  const handleSaveSettings = async () => {
    if (!validateForm()) return;
    const data = {
      businessName: formData.businessName,
      email: formData.email,
      phone: formData.phone,
      phoneCode: formData.phoneCode,
      flat: formData.flatUnit,
      street: formData.street,
      zipCode: formData.postCode,
      country: countryDropdown.name,
      city: cityDropdown.name,
      state: stateDropdown.name,
    };
    const methodType = isEditMode ? "PUT" : "POST";
    const res = await callApi("/private/settings/global", methodType, data);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePhoneChange = (phone) => {
    const countryCode = phone.substring(0, phone.length - 10);
    const phoneNumber = phone.substring(phone.length - 10);
    setFormData((prev) => ({
      ...prev,
      phone: phoneNumber,
      phoneCode: countryCode,
    }));

    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (settingData && settingData?.data) {
        const settings = settingData.data;
        setIsEditMode(true);
        setFormData({
          businessName: settings.businessName || "",
          email: settings.email || "",
          phone: settings.phone.number || "",
          phoneCode: settings.phone.code || "",
          flatUnit: settings.flat || "",
          street: settings.street || "",
          postCode: settings.zipCode || "",
        });

        const selectedCountry = country.find(
          (c) => c.name === settings.country
        );
        if (selectedCountry) {
          const countryId = selectedCountry._id;

          setCountryDropdown({
            showName: selectedCountry.name,
            name: selectedCountry.name,
            _id: countryId,
          });

          try {
            const statesRes = await fetch(
              `${import.meta.env.VITE_LOCATION_API}/states?country=${countryId}`
            );
            const statesData = await statesRes.json();
            const states = statesData?.data?.states || [];
            setState(states);

            const selectedState = states.find((s) => s.name === settings.state);
            if (selectedState) {
              const stateId = selectedState._id;

              setStateDropdown({
                showName: selectedState.name,
                name: selectedState.name,
                _id: stateId,
              });

              try {
                const citiesRes = await fetch(
                  `${import.meta.env.VITE_LOCATION_API}/cities?state=${stateId}`
                );
                const citiesData = await citiesRes.json();
                const cities = citiesData?.data?.cities || [];
                setCity(cities);

                const selectedCity = cities.find(
                  (c) => c.name === settings.city
                );
                if (selectedCity) {
                  setCityDropdown({
                    showName: selectedCity.name,
                    name: selectedCity.name,
                    _id: selectedCity._id,
                  });
                }
              } catch (error) {
                console.log(error);
              }
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    };
    fetchData();
  }, [settingData]);

  return (
    <div className="min-h-screen mb-10 py-8 p-4 sm:p-5 overflow-x-hidden ">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex justify-between items-center   ">
          <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
           Global Setting
          </h4>

          <div className="flex gap-2">
          <button
            onClick={handleSaveSettings}
            className="flex gap-2 items-center px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-primarydark text-white hover:text-primarydark"
            id="button-222"
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">Business Details</span>
          </div>

          <form className="w-full" onSubmit={(e) => e.preventDefault()}>
            <div>
              <InputComponent
                inputType="text"
                name="businessName"
                id="businessName"
                labelName="Business Name"
                labelColor="primary"
                placeholderName="Business Name"
                placeholderColor="secondary"
                textColor="text-dark"
                value={formData.businessName}
                onChange={handleOnChange}
                borderRadius="xl"
                activeBorderColor="blue"
                error={errors.businessName}
                required
              />
              {errors.businessName && (
                <div className="mt-2 text-[#F04438] text-sm font-normal">
                  {errors.businessName}
                </div>
              )}
            </div>

            <div className="w-full mt-5">
              <InputComponent
                inputType="email"
                name="email"
                id="email"
                labelName="Email Address"
                labelColor="primary"
                placeholderName="Email Address"
                placeholderColor="secondary"
                textColor="text-dark"
                value={formData.email}
                onChange={handleOnChange}
                borderRadius="xl"
                activeBorderColor="blue"
                error={errors.email}
              />
              {errors.email && (
                <div className="mt-2 text-[#F04438] text-sm font-normal">
                  {errors.email}
                </div>
              )}
            </div>
            <div className="w-full mt-5">
              <label htmlFor="phone" className="text-primary">
                Contact Number
              </label>
              <div
                className={`relative mt-2 rounded-xl ${
                  isFocused ? "border border-fadedblue" : ""
                }`}
              >
                <PhoneInput
                  id={"number"}
                  value={`${formData.phoneCode}${formData.phone}`}
                  className="focus:outline-none"
                  preferredCountries={["in"]}
                  placeholder="+91 12345-67890"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  buttonStyle={{
                    borderTop: isFocused ? "none" : "1px solid #D1D5DB",
                    borderBottom: isFocused ? "none" : "1px solid #D1D5DB",
                    borderLeft: isFocused ? "none" : "1px solid #D1D5DB",
                    borderRight: isFocused
                      ? "1px solid #D1D5DB"
                      : "1px solid #D1D5DB",
                    borderTopRightRadius: "0px",
                    borderBottomRightRadius: "0px",
                    borderTopLeftRadius: "12px",
                    borderBottomLeftRadius: "12px",
                    width: isFocused ? "51px" : "52px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white",
                  }}
                  dropdownStyle={{
                    top: "50px",
                    left: "0px",
                  }}
                  inputStyle={{
                    borderRadius: "12px",
                    fontSize: "16px",
                    border: isFocused ? "none" : "1px solid #D1D5DB",
                    marginLeft: "15px",
                    color: "#374151",
                    width: "97.1%",
                    height: isFocused ? "46px" : "48px",
                    outline: "none",
                    boxShadow: "none",
                  }}
                  country={"in"}
                  onChange={handlePhoneChange}
                />
                {errors.phone && (
                  <div className="mt-2 text-[#F04438] text-sm font-normal">
                    {errors.phone}
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full justify-center items-center mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="block text-primary">Address</span>
          </div>

          <form className="w-full" onSubmit={(e) => e.preventDefault()}>
            <div className="w-full">
              <InputComponent
                inputType="text"
                name="flatUnit"
                id="flatUnit"
                labelName="Flat/Unit"
                labelColor="primary"
                placeholderName="Flat/Unit"
                placeholderColor="secondary"
                textColor="text-dark"
                value={formData.flatUnit}
                onChange={handleOnChange}
                borderRadius="xl"
                activeBorderColor="blue"
                error={errors.flatUnit}
              />
              {errors.flatUnit && (
                <div className="mt-2 text-[#F04438] text-sm font-normal">
                  {errors.flatUnit}
                </div>
              )}
            </div>

            <div className="w-full mt-5">
              <InputComponent
                inputType="text"
                name="street"
                id="street"
                labelName="Street"
                labelColor="primary"
                placeholderName="Street"
                placeholderColor="secondary"
                textColor="text-dark"
                value={formData.street}
                onChange={handleOnChange}
                borderRadius="xl"
                activeBorderColor="blue"
                error={errors.street}
              />
              {errors.street && (
                <div className="mt-2 text-[#F04438] text-sm font-normal">
                  {errors.street}
                </div>
              )}
            </div>

            <div className="w-full mt-5">
              <label className="text-primary">Country</label>

              <div className="dropdown-container mt-1 relative w-full ">
                <ComponentDropdown
                  name="country"
                  SummaryChild={
                    <h5 className="p-0 m-0">{countryDropdown.showName}</h5>
                  }
                  dropdownList={country.map((item) => ({
                    ...item,
                    showName: item.name,
                  }))}
                  search={true}
                  commonFunction={setCountryDropdown}
                  selected={countryDropdown.name}
                />
                {errors.country && (
                  <div className="mt-2 text-[#F04438] text-sm font-normal">
                    {errors.country}
                  </div>
                )}
              </div>
            </div>
            <div className="w-full mt-5 ">
              <label className="text-primary">State</label>

              <div className="dropdown-container mt-1 relative w-full ">
                <ComponentDropdown
                  name="state"
                  SummaryChild={
                    <h5 className="p-0 m-0">{stateDropdown.showName}</h5>
                  }
                  dropdownList={state.map((item) => ({
                    ...item,
                    showName: item.name,
                  }))}
                  search={true}
                  commonFunction={setStateDropdown}
                  selected={stateDropdown.name}
                />
              </div>
            </div>

            <div className="w-full mt-5">
              <label className="text-primary">City</label>

              <div className="dropdown-container mt-1 relative w-full ">
                <ComponentDropdown
                  name="city"
                  SummaryChild={
                    <h5 className="p-0 m-0">{cityDropdown.showName}</h5>
                  }
                  dropdownList={city.map((item) => ({
                    ...item,
                    showName: item.name,
                  }))}
                  search={true}
                  commonFunction={setCityDropdown}
                  selected={cityDropdown.name}
                />
                {errors.city && (
                  <div className="mt-2 text-[#F04438] text-sm font-normal">
                    {errors.city}
                  </div>
                )}
              </div>
            </div>

            <div className="w-full mt-5 mb-10">
              <InputComponent
                inputType="text"
                name="postCode"
                id="postCode"
                labelName="Post Code"
                labelColor="primary"
                placeholderName="Post Code"
                placeholderColor="secondary"
                textColor="text-dark"
                value={formData.postCode}
                onChange={handleOnChange}
                borderRadius="xl"
                activeBorderColor="blue"
                error={errors.postCode}
              />
              {errors.postCode && (
                <div className="mt-2 text-[#F04438] text-sm font-normal">
                  {errors.postCode}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="flex w-full justify-end gap-2 mb-8">
          <button
            onClick={handleSaveSettings}
            className="flex gap-2 items-center px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-primarydark text-white"
            id="button-222"
          >
            Save Changes
          </button>
        </div>
    </div>
  );
};

export default GlobalSettings;
