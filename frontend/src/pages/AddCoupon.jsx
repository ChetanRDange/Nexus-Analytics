import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Link, useNavigate } from "react-router-dom";
import { CircleAlert, Percent, Plus, Minus } from "lucide-react";
import ComponentDropdown from "../Components/ComponentDropdown";
import DatePicker from "../Components/DatePicker";
import EndDatePicker from "../Components/EndDatePicker";
import InputComponent from "../Components/InputComponent";
import useFetch from "../hooks/useFetch";
import useMutation from "../hooks/useMutation";
import MultiselectDropdown from "../Components/MultiselectDropdown";
import ToggleComponent from "../Components/ToggleComponent";

const discountTypes = [
  {
    id: 0,
    showName: "Percentage",
    name: "percentage",
  },
  {
    id: 1,
    showName: "Fixed Amount",
    name: "amount",
  },
];

const currencyOptions = [
  { id: 1, name: "INR" },
  { id: 2, name: "USD" },
  { id: 3, name: "AED" },
];

const AddCoupon = () => {
  const navigate = useNavigate();
  const { callApi } = useMutation();
  const [companies, setCompanies] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState([]);
  const [locationAccess, setLocationAccess] = useState(false);
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [locations, setLocations] = useState([
    {
      isEnableCountry: true,
      isEnableState: false,
      isEnableCity: false,
      countryDropdown: { showName: "Click to select an option", name: "", _id: null },
      stateDropdown: { showName: "Click to select an option", name: "", _id: null },
      cityDropdown: { showName: "Click to select an option", name: "", _id: null },
    },
  ]);
  const [couponData, setCouponData] = useState({
    name: "",
    description: "",
    code: "",
    discountType: "",
    discountValue: "",
    upto: "",
    startDate: "",
    applicableCompanies: [],
    applicableCurrencies: selectedCurrency,
    locations: locations,
    endDate: "",
    startTime: "",
    endTime: "",
    onlyOnce: false,
    newUserOnly: false,
    minPurchaseAmount: "",
    isActive: true,
    maxCouponUsage: "",
    locationAccess: false, // Initialize to match locationAccess state
  });

  useEffect(() => {
    setCouponData(prev => ({
      ...prev,
      locationAccess,
      locations: locationAccess ? prev.locations : []
    }));
  }, [locationAccess]);

  const [errors, setErrors] = useState({
    name: "",
    code: "",
    description: "",
    startDate: "",
    endDate: "",
    discountType: "",
    discountValue: "",
    maxCouponUsage: "",
  });

  const { data: res } = useFetch(`/private/companies?p=1&n=10000`);
  const companyData = res?.data;

  useEffect(() => {
    if (companyData) {
      setCompanies(companyData);
    }
  }, [companyData]);

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

  const getAddressStates = async (countryId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_LOCATION_API}/states?country=${countryId}`
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

  const getAddressCities = async (stateId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_LOCATION_API}/cities?state=${stateId}`
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

  const handleLocationChange = (index, field, value) => {
    const newLocations = [...locations];
    newLocations[index] = { ...newLocations[index], [field]: value };
    setLocations(newLocations);
  };

  const addLocation = () => {
    setLocations([
      ...locations,
      {
        isEnableCountry: true,
        isEnableState: false,
        isEnableCity: false,
        countryDropdown: { showName: "Click to select an option", name: "", _id: null },
        stateDropdown: { showName: "Click to select an option", name: "", _id: null },
        cityDropdown: { showName: "Click to select an option", name: "", _id: null },
      },
    ]);
  };

  const removeLocation = (index) => {
    const newLocations = locations.filter((_, i) => i !== index);
    setLocations(newLocations);
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value?.trim()) return "Coupon Name is required";
        if (value.length < 3) return "Minimum 3 characters required";
        return "";
      case "code":
        if (!value?.trim()) return "Coupon Code is required";
        if (value.length < 3) return "Minimum 3 characters required";
        return "";
      case "description":
        if (value.length < 10) return "Minimum 10 characters required";
        if (value.length > 500) return "Maximum 500 characters allowed";
        return "";
      case "discountType":
        if (!value?.trim()) return "Discount Type is required";
        return "";
      case "discountValue":
        if (!value) return "Discount Value is required";
        if (isNaN(value) || Number(value) <= 0)
          return "Please enter a valid positive number";
        if (couponData.discountType === "percentage" && Number(value) > 100)
          return "Percentage discount cannot be more than 100%";
        return "";
      case "maxCouponUsage":
        if (!value) return "Max Coupon Usage is required";
        if (value && (isNaN(value) || Number(value) <= 0)) {
          return "Please enter a valid positive number";
        }
        return "";
      default:
        return "";
    }
  };

  const handleFieldChange = (name, value) => {
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validate = () => {
    let newErrors = {
      name: validateField("name", couponData.name),
      code: validateField("code", couponData.code),
      discountType: validateField("discountType", couponData.discountType),
      discountValue: validateField("discountValue", couponData.discountValue),
      startDate: !couponData.startDate ? "Start Date is required" : "",
      endDate: !couponData.endDate ? "End Date is required" : "",
      maxCouponUsage: validateField(
        "maxCouponUsage",
        couponData.maxCouponUsage
      ),
    };

    if (couponData.startDate && couponData.endDate) {
      const startDate = new Date(couponData.startDate);
      const endDate = new Date(couponData.endDate);
      if (startDate > endDate) {
        newErrors.endDate = "End Date must be after Start Date";
      }
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleAddCoupons = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    // Filter and format locations
    const formattedLocations = locations.map(location => {
      const formatted = {};
      
      if (location.isEnableCountry && location.countryDropdown.name) {
        formatted.country = location.countryDropdown.name;
        formatted.isEnableCountry = true;
      }
      
      if (location.isEnableState && location.stateDropdown.name) {
        formatted.state = location.stateDropdown.name;
        formatted.isEnableState = true;
      }
      
      if (location.isEnableCity && location.cityDropdown.name) {
        formatted.city = location.cityDropdown.name;
        formatted.isEnableCity = true;
      }

      return formatted;
    }).filter(loc => Object.keys(loc).length > 0);

    const res = await callApi("/private/coupons", "POST", {
      ...couponData,
      locations: formattedLocations,
      discountValue: +couponData.discountValue,
      maxCouponUsage: couponData.maxCouponUsage
        ? +couponData.maxCouponUsage
        : null,
      minPurchaseAmount: couponData.minPurchaseAmount
        ? +couponData.minPurchaseAmount
        : null,
    });
    if (res) navigate("/coupons");
  };

  const formattedCompanies = companies.map((company) => ({
    id: company._id,
    name: company.companyName,
  }));

  const handleCompanySelection = (selected) => {
    setSelectedCompanies(
      selected.map((s) => companies.find((c) => c._id === s.id))
    );
    setCouponData((prev) => ({
      ...prev,
      applicableCompanies: selected.map((s) => s.id),
    }));
  };

  return (
    <>
      <div className="py-8 p-4 sm:p-5 overflow-x-hidden mb-20">
        <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex justify-between items-center   ">
          <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
            Add Coupon
          </h4>

          <div className="flex gap-2">
            <Link
              id="coupons"
              to="/coupons"
              className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
            >
              Cancel
            </Link>
            <button
              onClick={handleAddCoupons}
              className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
              id="button-126"
            >
              Add
            </button>
          </div>
        </div>

        <div className="w-full border-b border-primary justify-center items-center mt-8 pb-8 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className=" text-primary flex items-center gap-1">
                Coupon Details
              </span>
            </div>
            <div className="w-full">
              <div className="w-full">
                <InputComponent
                  inputType="text"
                  name="couponname"
                  id="couponname"
                  labelName="Coupon Name"
                  labelColor="primary"
                  placeholderName="Coupon Name"
                  placeholderColor="secondary"
                  textColor="text-dark"
                  borderRadius="xl"
                  activeBorderColor="blue"
                  value={couponData?.name}
                  onChange={(e) => {
                    setCouponData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }));
                    handleFieldChange("name", e.target.value);
                  }}
                  error={errors.name}
                  required
                  minLength={3}
                  maxLength={50}
                />
              </div>
              <div className="w-full mt-5">
                <InputComponent
                  inputType="text"
                  name="couponcode"
                  id="couponcode"
                  labelName="Coupon Code"
                  labelColor="primary"
                  placeholderName="Coupon Code"
                  placeholderColor="secondary"
                  textColor="text-dark"
                  borderRadius="xl"
                  activeBorderColor="blue"
                  value={couponData?.code}
                  onChange={(e) => {
                    setCouponData((prev) => ({
                      ...prev,
                      code: e.target.value,
                    }));
                    handleFieldChange("code", e.target.value);
                  }}
                  error={errors.code}
                  required
                  minLength={3}
                  maxLength={20}
                />
              </div>
              <div className="w-full mt-5">
                <label className="text-primary">Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  cols="50"
                  placeholder="Description"
                  maxLength="500"
                  minLength="10"
                  required
                  disabled={false}
                  readOnly={false}
                  autoFocus
                  wrap="soft"
                  spellCheck={true}
                  value={couponData?.description}
                  onChange={(e) => {
                    setCouponData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }));
                    handleFieldChange("description", e.target.value);
                  }}
                  className={`w-full mt-2 rounded-xl border ${
                    errors.description ? "border-red-500" : "border-primary"
                  } focus:outline-none px-4 py-2.5 placeholder:text-secondary text-primary bg-transparent placeholder:font-normal`}
                  style={{ resize: "none" }}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
                <div className="w-full fle justify-end">
                  <span className="font-normal text-primary">
                    {couponData?.description?.length}/500
                  </span>
                </div>
              </div>
              <div className="w-full mt-5 flex flex-col md:flex-row gap-y-4 gap-4 md:justify-between">
                <div className="w-full">
                  <label className="text-primary">
                    Start Date<span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="mt-2">
                    <DatePicker
                      selectedDate={
                        couponData?.startDate
                          ? new Date(couponData.startDate)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      setSelectedDate={(date) =>
                        setCouponData((prev) => ({
                          ...prev,
                          startDate: new Date(date).toISOString(),
                        }))
                      }
                      placeholder="Select Start Date"
                    />
                  </div>

                  {errors.startDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.startDate}
                    </p>
                  )}
                </div>

                <div className="w-full relative">
                  <label className="text-primary">Start time - Optional </label>
                  <input
                    type="time"
                    id="time"
                    value={couponData?.startTime}
                    onChange={(e) =>
                      setCouponData((prev) => ({
                        ...prev,
                        startTime: e.target.value,
                      }))
                    }
                    className="w-full mt-2 rounded-xl border border-primary focus:outline-none focus:ring-0 px-4 py-2.5 placeholder:text-placeholder text-primary placeholder:font-normal bg-transparent  focus:border focus:border-[#A4BCFD]"
                    placeholder="Start time - Optional"
                    name="time"
                  />
                </div>
              </div>
              <div className="w-full mt-5 flex flex-col md:flex-row gap-y-4 gap-4 md:justify-between">
                <div className="w-full">
                  <label className="text-primary">
                    End Date<span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="mt-2">
                    <EndDatePicker
                      selectedEndDate={
                        couponData?.endDate
                          ? new Date(couponData.endDate)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      setSelectedEndDate={(date) =>
                        setCouponData((prev) => ({
                          ...prev,
                          endDate: new Date(date).toISOString(),
                        }))
                      }
                      selectedStartDate={
                        couponData?.startDate
                          ? new Date(couponData.startDate)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                    />
                  </div>
                  {errors.endDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.endDate}
                    </p>
                  )}
                </div>

                <div className="w-full relative">
                  <label className="text-primary">End time - Optional</label>
                  <input
                    type="time"
                    id="time"
                    className="w-full mt-2 rounded-xl border border-primary  focus:border focus:border-[#A4BCFD] focus:outline-none focus:ring-0 px-4 py-2.5 placeholder:text-placeholder text-primary placeholder:font-normal  bg-transparent"
                    placeholder="End time - Optional"
                    name="time"
                    value={couponData?.endTime}
                    onChange={(e) =>
                      setCouponData((prev) => ({
                        ...prev,
                        endTime: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="w-full mt-5">
                <label className="text-primary">
                  Discount Type<span className="text-red-500 ml-1">*</span>
                </label>
                <div className="dropdown-container relative w-full mt-2">
                  <ComponentDropdown
                    name="company"
                    SummaryChild={
                      <h5 className="p-0 m-0 text-primary">
                        {couponData?.discountType ||
                          "Click to select an option"}
                      </h5>
                    }
                    dropdownList={discountTypes}
                    search={true}
                    commonFunction={(selected) => {
                      setCouponData((prev) => ({
                        ...prev,
                        discountType: selected.name,
                      }));
                      handleFieldChange("discountType", selected.name);
                    }}
                    selected={couponData?.discountType}
                  />
                </div>
                {errors.discountType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.discountType}
                  </p>
                )}
              </div>
              <div className="w-full mt-5">
                <div className="relative w-full mb-2">
                  <InputComponent
                    inputType="number"
                    name="couponcode"
                    id="couponcode"
                    labelName="Discount Value"
                    labelColor="primary"
                    placeholderName="Discount Value"
                    placeholderColor="secondary"
                    textColor="text-dark"
                    borderRadius="xl"
                    activeBorderColor="blue"
                    value={couponData?.discountValue}
                    onChange={(e) => {
                      setCouponData((prev) => ({
                        ...prev,
                        discountValue: e.target.value,
                      }));
                      handleFieldChange("discountValue", e.target.value);
                    }}
                    error={errors.discountValue}
                    required
                  />

                  {!errors.discountValue && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer mt-8">
                      {couponData?.discountType === "percentage" ? (
                        <Percent />
                      ) : (
                        <CircleAlert />
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full mt-5">
                <InputComponent
                  inputType="text"
                  name="couponusage"
                  id="couponusage"
                  labelName="Max coupon Usage"
                  labelColor="primary"
                  placeholderName="Max coupon Usage"
                  placeholderColor="secondary"
                  textColor="text-dark"
                  borderRadius="xl"
                  maxLength={5}
                  activeBorderColor="blue"
                  value={couponData?.maxCouponUsage}
                  onChange={(e) => {
                    setCouponData((prev) => ({
                      ...prev,
                      maxCouponUsage: e.target.value,
                    }));
                    handleFieldChange("maxCouponUsage", e.target.value);
                  }}
                  error={errors.maxCouponUsage}
                  required
                />
            </div>
            </div>
          </div>
        </div>
        <div className="w-full border-b border-primary justify-center items-center mt-8 pb-8 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className=" text-primary flex items-center gap-1">
                Advance Validations
              </span>
            </div>
            <div className="w-full">
              <div className="w-full">
                <MultiselectDropdown
                  data={formattedCompanies}
                  label="Select Companies"
                  onChange={handleCompanySelection}
                  defaultLabel={
                    selectedCompanies.length > 0
                      ? selectedCompanies.map((c) => c.companyName).join(", ")
                      : "Select Companies"
                  }
                />
              </div>
              <div className="w-full mt-5">
                <MultiselectDropdown
                  data={currencyOptions}
                  label="Select Currency"
                  defaultLabel={
                    selectedCurrency.length > 0
                      ? selectedCurrency.map((c) => c.label).join(", ")
                      : "Select Currency"
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* <ToggleComponent /> */}

        <div className="w-full border-b border-primary justify-center items-center mt-8 pb-8 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
          <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
            <div className="sm:w-7/12 w-full flex flex-col">
              <span className="text-primary flex items-center gap-1">
                Locations
              </span>
            </div>
            <div className="w-full">
              <ToggleComponent
                label="Enable Location-based Access"
                description="Allow coupon access based on specific locations"
                isEnableState={locationAccess}
                setIsEnableState={setLocationAccess}
              />

              {locationAccess && (
                <div className="mt-5">
                  {locations.map((location, index) => (
                    <div key={index} className="mb-5 p-4 border border-primary rounded-xl">
                      <ToggleComponent
                        label="Country"
                        isEnableState={location.isEnableCountry}
                        setIsEnableState={(value) => handleLocationChange(index, 'isEnableCountry', value)}
                      />

                      {location.isEnableCountry && (
                        <div className="mt-3">
                          <ComponentDropdown
                            name="country"
                            SummaryChild={<h5 className="p-0 m-0">{location.countryDropdown.showName}</h5>}
                            dropdownList={country.map((item) => ({
                              ...item,
                              showName: item.name,
                            }))}
                            search={true}
                            commonFunction={(selected) => {
                              handleLocationChange(index, 'countryDropdown', selected);
                              getAddressStates(selected._id);
                            }}
                            selected={location.countryDropdown.name}
                          />
                        </div>
                      )}

                      <div className="mt-3">
                        <ToggleComponent
                          label="State"
                          isEnableState={location.isEnableState}
                          setIsEnableState={(value) => handleLocationChange(index, 'isEnableState', value)}
                        />

                        {location.isEnableState && location.countryDropdown._id && (
                          <div className="mt-3">
                            <ComponentDropdown
                              name="state"
                              SummaryChild={<h5 className="p-0 m-0">{location.stateDropdown.showName}</h5>}
                              dropdownList={state.map((item) => ({
                                ...item,
                                showName: item.name,
                              }))}
                              search={true}
                              commonFunction={(selected) => {
                                handleLocationChange(index, 'stateDropdown', selected);
                                getAddressCities(selected._id);
                              }}
                              selected={location.stateDropdown.name}
                            />
                          </div>
                        )}
                      </div>

                      <div className="mt-3">
                        <ToggleComponent
                          label="City"
                          isEnableState={location.isEnableCity}
                          setIsEnableState={(value) => handleLocationChange(index, 'isEnableCity', value)}
                        />

                        {location.isEnableCity && location.stateDropdown._id && (
                          <div className="mt-3">
                            <ComponentDropdown
                              name="city"
                              SummaryChild={<h5 className="p-0 m-0">{location.cityDropdown.showName}</h5>}
                              dropdownList={city.map((item) => ({
                                ...item,
                                showName: item.name,
                              }))}
                              search={true}
                              commonFunction={(selected) => handleLocationChange(index, 'cityDropdown', selected)}
                              selected={location.cityDropdown.name}
                            />
                          </div>
                        )}
                      </div>

                      {locations.length > 1 && (
                        <button
                          onClick={() => removeLocation(index)}
                          className="mt-3 flex items-center gap-2 text-red-500 hover:text-red-600"
                        >
                          <Minus size={16} /> Remove Location
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    onClick={addLocation}
                    className="mt-3 flex items-center gap-2 text-primary hover:text-primarydark"
                  >
                    <Plus size={16} /> Add More Locations
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

       
        <div className="flex justify-end gap-2 mt-8">
          <Link
            id="coupons"
            to="/coupons"
            className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
          >
            Cancel
          </Link>
          <button
            onClick={handleAddCoupons}
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
            id="button-126"
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default AddCoupon;
