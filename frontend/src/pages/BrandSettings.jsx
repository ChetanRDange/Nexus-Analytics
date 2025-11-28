import { Globe, MailPlus, Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";
import BrandComp from "../Components/BrandComp";
import Logo from "../assets/images/app-logo.png";
import useFavicon from "../hooks/useFavicon";
import useFetch from "../hooks/useFetch";
import useMutation from "../hooks/useMutation";
import SocialMediaTable from "./SocialMediaTable";

const BrandSettings = () => {
  const { callApi, loading: isLoading } = useMutation(); // Add isLoading from useMutation
  const setFavicon = useFavicon("/assets/images/leadmagixlogo.png");
  const [onCancel, setOnCancel] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const initialState = {
    darkLogo: Logo,
    lightLogo: Logo,
    favIcon: Logo,
    emailLogo: Logo,
    personalization: {
      theme: "",
      chatBot: "",
      emailTemplate: "",
    },
    language: "",
    socialMedias: {
      instagram: "",
      x: "",
      facebook: "",
      threads: "",
      linkedin: "",
      youtube: "",
      pinterest: "",
      quora: "",
      medium: "",
      discord: "",
      whatsapp: "",
      reddit: "",
    },
  };
  const [systemIcons, setSystemIcons] = useState(initialState);

  const { data: res, callApi: reFetch } = useFetch(`/private/brand`);
  const brandRecord = res?.data;

  useEffect(() => {
    if (brandRecord) {
      setSystemIcons({
        id: brandRecord?._id,
        darkLogo: brandRecord?.darkLogo || Logo,
        lightLogo: brandRecord?.lightLogo || Logo,
        favIcon: brandRecord?.favIcon || Logo,
        emailLogo: brandRecord?.emailLogo || Logo,
        language: brandRecord?.language || "English",
        personalization: {
          theme: brandRecord?.personalization?.theme || "#2563EB",
          chatBot: brandRecord?.personalization?.chatBot || "#2563EB",
          emailTemplate:
            brandRecord?.personalization?.emailTemplate || "#2563EB",
        },
        socialMedias: {
          instagram: brandRecord?.socialMedias?.instagram || "",
          x: brandRecord?.socialMedias?.x || "",
          facebook: brandRecord?.socialMedias?.facebook || "",
          threads: brandRecord?.socialMedias?.threads || "",
          linkedin: brandRecord?.socialMedias?.linkedin || "",
          youtube: brandRecord?.socialMedias?.youtube || "",
          pinterest: brandRecord?.socialMedias?.pinterest || "",
          quora: brandRecord?.socialMedias?.quora || "",
          medium: brandRecord?.socialMedias?.medium || "",
          discord: brandRecord?.socialMedias?.discord || "",
          whatsapp: brandRecord?.socialMedias?.whatsapp || "",
          reddit: brandRecord?.socialMedias?.reddit || "",
        },
      });

      if (brandRecord?.favIcon) {
        setFavicon(brandRecord.favIcon);
      }
    }
  }, [brandRecord]);

  const handleBrandSettings = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in systemIcons) {
      if (systemIcons[key]) {
        if (systemIcons[key] instanceof File) {
          formData.append(key, systemIcons[key]);
        } else if (typeof systemIcons[key] === "object") {
          for (const subKey in systemIcons[key]) {
            formData.append(`${key}[${subKey}]`, systemIcons[key][subKey]);
          }
        } else {
          formData.append(key, systemIcons[key]);
        }
      }
    }
    const method = brandRecord?._id ? "PUT" : "POST";
    const path = `/private/brand/`;
    const res = await callApi(path, method, formData);
    setIsEditing(false)

    if (res) {
      reFetch();
      setOnCancel(true);
    }
  };

  const handleCancel = () => {
    setOnCancel(true);
    if (brandRecord) {
      setSystemIcons({
        id: brandRecord?._id,
        darkLogo: brandRecord?.darkLogo || Logo,
        lightLogo: brandRecord?.lightLogo || Logo,
        favIcon: brandRecord?.favIcon || Logo,
        emailLogo: brandRecord?.emailLogo || Logo,
        language: brandRecord?.language || "English",
        personalization: {
          theme: brandRecord?.personalization?.theme || "#2563EB",
          chatBot: brandRecord?.personalization?.chatBot || "#2563EB",
          emailTemplate:
            brandRecord?.personalization?.emailTemplate || "#2563EB",
        },
        socialMedias: {
          instagram: brandRecord?.socialMedias?.instagram || "",
          x: brandRecord?.socialMedias?.x || "",
          facebook: brandRecord?.socialMedias?.facebook || "",
          threads: brandRecord?.socialMedias?.threads || "",
          linkedin: brandRecord?.socialMedias?.linkedin || "",
          youtube: brandRecord?.socialMedias?.youtube || "",
          pinterest: brandRecord?.socialMedias?.pinterest || "",
          quora: brandRecord?.socialMedias?.quora || "",
          medium: brandRecord?.socialMedias?.medium || "",
          discord: brandRecord?.socialMedias?.discord || "",
          whatsapp: brandRecord?.socialMedias?.whatsapp || "",
          reddit: brandRecord?.socialMedias?.reddit || "",
        },
      });
    } else {
      setSystemIcons(initialState);
    }
    // setOnCancel(false);
  };

  return (
    <div className="h-full py-8  p-4 sm:p-5 overflow-x-hidden">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex justify-between items-center   ">
        <h4 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-dark ">
          Brand Setting
        </h4>

        <div className="flex gap-2">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-primary font-medium bg-main rounded-xl border hover:bg-hover border-primary whitespace-nowrap"
            id="button-161"
          >
            Cancel
          </button>
          <button
            onClick={handleBrandSettings}
            disabled={isLoading}
            className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap"
            id="button-162"
          >
            {isLoading ? (
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
            ) : null}
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
      <div className="w-full justify-center items-center mt-8 mb-5 pb-8 gap-y-4 gap-2  lg:items-start md:items-end xl:items-end border-b border-primary">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary flex items-center gap-1">
              Brand Settings
              {/* <img src={Brand} alt="brand" /> */}
            </span>
            <span className="text-secondary font-normal ">
              Upload Brand Details
            </span>
          </div>
          <div className="w-full flex flex-col gap-6">
            <BrandComp
              setIcon={(file) =>
                setSystemIcons((prevState) => ({
                  ...prevState,
                  darkLogo: file,
                }))
              }
              imagePreviewUrl={systemIcons?.darkLogo}
              // compLogo={CompDarkLogo}
              compLogo={Moon}
              title="Dark Logo"
              bg="bg-black"
              textColor="white"
              onCancel={onCancel}
              setOnCancel={setOnCancel}
            />
            <BrandComp
              setIcon={(file) =>
                setSystemIcons((prevState) => ({
                  ...prevState,
                  lightLogo: file,
                }))
              }
              imagePreviewUrl={systemIcons?.lightLogo}
              compLogo={Sun}
              title="Light Logo"
              onCancel={onCancel}
              setOnCancel={setOnCancel}
            />
            <BrandComp
              setIcon={(file) =>
                setSystemIcons((prevState) => ({ ...prevState, favIcon: file }))
              }
              imagePreviewUrl={systemIcons?.favIcon}
              compLogo={Globe}
              title="Favicon"
              onCancel={onCancel}
              setOnCancel={setOnCancel}
            />
            <BrandComp
              setIcon={(file) =>
                setSystemIcons((prevState) => ({
                  ...prevState,
                  emailLogo: file,
                }))
              }
              imagePreviewUrl={systemIcons?.emailLogo || Logo}
              compLogo={MailPlus}
              title="Email Logo"
              onCancel={onCancel}
              setOnCancel={setOnCancel}
            />
          </div>
        </div>
      </div>
      {/* <SocialMediaTable socialMediaData={{}} /> */}
      <SocialMediaTable
        socialMediaData={systemIcons.socialMedias}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        onUpdate={(updatedLinks) => {
          setSystemIcons((prev) => ({
            ...prev,
            socialMedias: { ...prev.socialMedias, ...updatedLinks },
          }));
        }}
      />

      <div className="w-full flex justify-end items-center gap-4 pb-20 pt-8 border-t border-primary">
        <button
          onClick={handleCancel}
          className="px-4 py-2 text-primary font-medium bg-main rounded-xl border border-primary hover:bg-hover  whitespace-nowrap"
          id="button-163"
        >
          Cancel
        </button>
        <button
          onClick={handleBrandSettings}
          disabled={isLoading}
          className="px-4 py-2 text-white font-medium bg-primary hover:bg-primarydark rounded-xl whitespace-nowrap disabled:opacity-70 flex items-center justify-center min-w-[120px]"
          id="button-164"
        >
          {isLoading ? (
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
          ) : null}
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default BrandSettings;
