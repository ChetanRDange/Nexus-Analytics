import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import ComponentDropdown from "../Components/ComponentDropdown";
import InputComponent from "../Components/InputComponent";
import NewMultiselectdropdown from "../Components/NewMultiselectdropdown";
import paypalLogo from "../assets/images/paypalLogo.png";
import razorpayLogo from "../assets/images/razorpayLogo.png";
import stripeLogo from "../assets/images/stipeLogo.png";
import ToggleComponent from "../Components/ToggleComponent";
import Info from "../assets/svgs/info.svg";
import useMutation from "./../hooks/useMutation";
import useFetch from "../hooks/useFetch";

const paymentGateways = [
  {
    title: "Razorpay",
    Key: "razorpay",
    description:
      "Secure online payment processing with seamless integration for transactions and financial management across your platform.",
    logo: razorpayLogo,
  },
  {
    title: "Paypal",
    Key: "paypal",
    description:
      "Secure online payment processing with seamless integration for transactions and financial management across your platform.",
    logo: paypalLogo,
  },
  {
    title: "Stripe",
    Key: "stripe",
    description:
      "Secure online payment processing with seamless integration for transactions and financial management across your platform.",
    logo: stripeLogo,
  },
];
const allCurrencies = [
  { label: "INR", value: "INR" },
  { label: "AED", value: "AED" },
  { label: "USD", value: "USD" },
];

const envDropdownList = [
  {
    name: "sandbox",
    showName: "Test Mode",
    description: "Use test credentials for development and testing",
  },
  {
    name: "live",
    showName: "Live Mode",
    description: "Use live credentials for production",
  },
];

const PaymentGatewayIntegrations = () => {
  const navigate = useNavigate();

  const { gatewayKey } = useParams();

  const gateway = paymentGateways.find(
    (item) => item.Key.toLowerCase() === gatewayKey.toLowerCase()
  );

  if (!gateway) {
    navigate("/payment-settings");
  }

  const { callApi, loading: isLoading } = useMutation();

  const [isEditabel, setIsEditabel] = useState(false);
  // const [isLoading, setIsUpdating] = useState(false);

  const [paymentSettings, setPaymentSettings] = useState({
    live: {
      keyId: "",
      secret: "",
    },
    sandbox: {
      keyId: "",
      secret: "",
    },
    default: "sandbox",
    isActive: false,
    currency: [],
  });

  const { data: paymentConfigs } = useFetch(`/private/paymentSetting`);

  useEffect(() => {
    if (paymentConfigs && paymentConfigs?.data?.[gatewayKey]) {
      const gatewayConfig = paymentConfigs?.data?.[gatewayKey];
      setPaymentSettings((prev) => ({
        ...prev[gatewayKey],
        sandbox: {
          ...prev[gatewayKey]?.sandbox,
          keyId: gatewayConfig?.sandbox?.keyId,
          secret: gatewayConfig?.sandbox?.secret,
        },
        live: {
          ...prev[gatewayKey]?.live,
          keyId: gatewayConfig?.live?.keyId,
          secret: gatewayConfig?.live?.secret,
        },
        default: gatewayConfig?.default,
        isActive: gatewayConfig?.isActive,
        currency: gatewayConfig?.currency,
      }));
    }
  }, [paymentConfigs]);

  const handleUpdatePaymentSettings = async () => {
    const res = await callApi("/private/paymentSetting", "PUT", {
      [gatewayKey]: paymentSettings,
    });
    if (res) {
      setIsEditabel(false);
    }
  };

  return (
    <div className="min-h-screen py-8 p-4 sm:p-5 overflow-x-hidden ">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">
            Payment Settings - {gateway.title}
          </span>
        </div>
        <div className="w-full pt-2 sm:pt-0 flex gap-4 sm:justify-start items-center  md:w-fit lg:w-full xl:w-fit">
          {isLoading ? (
            <button
              disabled
              className="px-4 py-2 text-white font-medium bg-primary opacity-75 rounded-xl whitespace-nowrap"
            >
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </div>
            </button>
          ) : isEditabel ? (
            <div className="flex gap-4 items-center justify-end">
              <button
                onClick={() => setIsEditabel(false)}
                disabled={isLoading}
                className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdatePaymentSettings}
                disabled={isLoading}
                className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap disabled:opacity-75"
              >
                Update
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/payment-settings"
                className="px-4 py-2 text-primary font-medium bg-main hover:bg-hover rounded-xl border border-primary whitespace-nowrap"
              >
                Back
              </Link>
              <button
                onClick={() => setIsEditabel(true)}
                className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="w-full justify-center items-center my-8 pb-8 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end border-b border-primary mb-10 ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="text-primary flex items-center gap-1">Enable</span>
          </div>
          <div className="w-full h-[50px] box-border">
            <ToggleComponent
              label="Enable Gateway"
              isIcon={true}
              icon={Info}
              isEnableState={paymentSettings.isActive}
              disabled={!isEditabel}
              tooltipMessage="Enable or disable this payment gateway"
              setIsEnableState={(value) =>
                setPaymentSettings((prev) => ({
                  ...prev,
                  isActive: value,
                }))
              }
            />
          </div>
        </div>
      </div>
      <div className="w-full justify-center items-center my-8 pb-8 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end border-b border-primary mb-10 ">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="text-primary flex items-center gap-1">
              Settings
            </span>
          </div>
          <div className="w-full h-[50px] box-border">
            <ComponentDropdown
              name="environment"
              dropdownList={envDropdownList}
              selected={paymentSettings.default}
              disabled={!isEditabel}
              commonFunction={(item) => {
                setPaymentSettings((prev) => ({
                  ...prev,
                  default: item.name,
                }));
              }}
            />
          </div>
        </div>
      </div>
      <div className="w-full justify-center items-center my-8 pb-8 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end border-b border-primary mb-10">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className="text-primary flex items-center gap-1">
              Payment Settings
            </span>
          </div>
          <div className="w-full flex flex-col gap-4">
            <NewMultiselectdropdown
              title="Currency"
              options={allCurrencies}
              values={paymentSettings.currency}
              disabled={!isEditabel || isLoading}
              showItems={true}
              onChange={(value) => {
                const flag = paymentSettings?.currency?.includes(value);
                if (flag) {
                  const newCurrency = paymentSettings.currency.filter(
                    (item) => item !== value
                  );
                  setPaymentSettings((prev) => ({
                    ...prev,
                    currency: newCurrency,
                  }));
                } else {
                  setPaymentSettings((prev) => ({
                    ...prev,
                    currency: [...prev.currency, value],
                  }));
                }
              }}
            />
          </div>
        </div>
      </div>
      {paymentSettings && (
        <>
          <div className="w-full justify-center items-center my-8 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end border-b border-primary mb-10 ">
            <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
              <div className="sm:w-7/12 w-full flex flex-col">
                <span className=" text-primary flex items-center gap-1">
                  Sandbox Credentials
                </span>
              </div>
              <div className="w-full">
                <InputComponent
                  name="keyId"
                  id={gateway.Key}
                  value={paymentSettings?.sandbox?.keyId}
                  disabled={!isEditabel || isLoading}
                  labelName="Key Id"
                  placeholderName="Key Id"
                  onChange={(e) =>
                    setPaymentSettings((prev) => ({
                      ...prev,
                      sandbox: { ...prev.sandbox, keyId: e.target.value },
                    }))
                  }
                />
                <InputComponent
                  name="secret"
                  id={gateway.Key}
                  value={paymentSettings?.sandbox?.secret}
                  disabled={!isEditabel || isLoading}
                  labelName="Secret"
                  placeholderName="Secret"
                  onChange={(e) =>
                    setPaymentSettings((prev) => ({
                      ...prev,
                      sandbox: { ...prev.sandbox, secret: e.target.value },
                    }))
                  }
                />
              </div>
            </div>
          </div>
          <div className="w-full justify-center items-center my-8 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end border-b border-primary mb-10 ">
            <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
              <div className="sm:w-7/12 w-full flex flex-col">
                <span className=" text-primary flex items-center gap-1">
                  Live Credentials
                </span>
              </div>
              <div className="w-full">
                <InputComponent
                  name="keyId"
                  id={gateway.Key}
                  value={paymentSettings?.live?.keyId}
                  disabled={!isEditabel || isLoading}
                  labelName="Key Id"
                  placeholderName="Key Id"
                  onChange={(e) =>
                    setPaymentSettings((prev) => ({
                      ...prev,
                      live: { ...prev.live, keyId: e.target.value },
                    }))
                  }
                />
                <InputComponent
                  name="secret"
                  id={gateway.Key}
                  value={paymentSettings?.live?.secret}
                  disabled={!isEditabel || isLoading}
                  labelName="Secret"
                  placeholderName="Secret"
                  onChange={(e) =>
                    setPaymentSettings((prev) => ({
                      ...prev,
                      live: { ...prev.live, secret: e.target.value },
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentGatewayIntegrations;
