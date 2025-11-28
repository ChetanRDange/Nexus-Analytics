import React from "react";

const ToggleComponent = ({
  mt,
  label,
  isIcon,
  icon,
  description,
  isEnableState,
  setIsEnableState,
  tooltipMessage = "",
  disabled = false
}) => {
  return (
    <div
      className={`rounded-xl bg-main border border-primary py-2 px-4 w-full flex justify-between items-center mt-${mt} gap-2 ${
        disabled ? "" : ""
      }`}
    >
      <div className="flex flex-col">
        <div className="flex gap-2 items-center">
          <span className="font-medium text-primary">{label}</span>
          {/* {isIcon && (
            <span className="relative group cursor-pointer">
              <img src={icon} alt="Info" />
              {tooltipMessage && (
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 hidden group-hover:flex bg-black text-white text-xs px-2 py-1 rounded shadow-md z-20 whitespace-nowrap">
                  {tooltipMessage}
                </div>
              )}
            </span>
          )} */}
        </div>
        {description && (
          <p className="text-secondary font-normal pt-0.5">{description}</p>
        )}
      </div>

      <label className={`flex justify-start sm:justify-start select-none items-center w-fit ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}>
        <div className="relative">
          <input
            id="checkbox"
            type="checkbox"
            checked={isEnableState}
            onChange={() => !disabled && setIsEnableState(!isEnableState)}
            className="sr-only"
            disabled={disabled}
          />
          <div
            className={`block h-8 w-14 rounded-full ${
              isEnableState ? "bg-primary" : "bg-[#E5E7EB]"
            }`}
          ></div>
          <div
            className={`dot absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-main text-primary transition ${
              isEnableState ? "translate-x-6" : ""
            } `}
          >
            {isEnableState ? (
              <span className="active">
                <svg
                  width="11"
                  height="8"
                  viewBox="0 0 11 8"
                  fill="none"
                  className="text-black"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                    fill="white"
                    stroke="black"
                    strokeWidth="0.8"
                  ></path>
                </svg>
              </span>
            ) : (
              <span className="inactive"></span>
            )}
          </div>
        </div>
      </label>
    </div>
  );
};

export default ToggleComponent;