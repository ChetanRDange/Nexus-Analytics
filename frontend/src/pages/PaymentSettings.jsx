import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useMutation from "../hooks/useMutation";
import useFetch from "../hooks/useFetch";
import razorpayLogo from "../assets/images/razorpayLogo.png";
import stripeLogo from "../assets/images/stipeLogo.png";
import paypalLogo from "../assets/images/paypalLogo.png";

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

const PaymentSettings = () => {
  const { callApi, loading: isLoading } = useMutation();

  const [paymentSettings, setPaymentSettings] = useState({
    stripe: {
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
    },
    paypal: {
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
    },
    razorpay: {
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
    },
  });

  const { data: paymentConfigs } = useFetch(`/private/paymentSetting`);

  useEffect(() => {
    if (paymentConfigs && paymentConfigs.data) {
      setPaymentSettings(paymentConfigs.data);
    }
  }, [paymentConfigs]);

  console.log("the payment configs are", paymentSettings);

  const handleSave = async () => {
    const response = await callApi(
      "/private/paymentSetting",
      "PUT",
      paymentSettings
    );
  };
  // handleSave();

  return (
    <div className="min-h-screen py-8 p-4 sm:p-5 overflow-x-hidden ">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">
            Payment Settings
          </span>
        </div>
      </div>
      <div className="mt-5 flex gap-4">
        {paymentGateways.map(({ title, description, logo }, index) => (
          <div className=" flex flex-col gap-4 border border-primary bg-main text-dark rounded-xl py-6 px-4 w-[400px] ">
            <div className=" flex justify-start">
              <div className="h-[35px]">
                <img src={logo} alt="" srcset="" />
              </div>
            </div>
            <div className=" flex flex-col gap-2">
              <h4>{title}</h4>
              <span className="font-light">{description}</span>
            </div>
            <Link
              to={`/payment-settings/${title.toLowerCase()}`}
              className="w-fit px-3 py-1 border border-primary rounded-xl"
            >
              Configure
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentSettings;
