import React, { useEffect, useRef, useState } from "react";
import Add from "../assets/svgs/add-secondary.svg";
import SearchComponent from "./SearchComponent";

function ComponentDropdown({
  name,
  SummaryChild,
  dropdownList,
  commonFunction,
  search,
  paddingY = "py-2.5",
  selected,
  add = false,
  setIsNewSegment,
  width = "full",
  data,
  disabled = false,
}) {
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        dropdownRef.current.removeAttribute("open");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Filter dropdownList based on search input
  const filteredList = dropdownList?.filter(
    (item) =>
      item.showName.toLowerCase().includes(searchValue.toLowerCase()) ||
      (item.description &&
        item.description.toLowerCase().includes(searchValue.toLowerCase()))
  );

  return (
    <details
      ref={dropdownRef}
      name={name}
      className={`relative w-${width} ${
        disabled ? "cursor-not-allowed" : "cursor-default"
      } rounded-xl bg-main pl-3 pr-10  text-left text-primary shadow-sm border border-primary focus:outline-none focus:ring-0 sm:text-lg sm:leading-6`}
      disabled={disabled}
    >
      <summary
        className={`${
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        } ${paddingY} pr-8 text-left text-primary list-none focus:outline-none h-full focus:ring-0 focus:border-0`}
        onClick={(e) => disabled && e.preventDefault()}
      >
        <span className="flex items-center">
          <span className="block font-medium whitespace-nowrap text-[16px]">
            {dropdownList?.find((item) => item.name === selected)?.showName ||
              "Select"}
          </span>
        </span>
        {/* {!disabled && ( */}
        <span className="absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#5F6368"
          >
            <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
          </svg>
        </span>
        {/* )} */}
      </summary>
      {!disabled && (
        <ul className="absolute end-0 top-11 z-40 mt-1 max-h-48 w-full min-w-[250px] rounded-md bg-main text-[12px] md:text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm overflow-y-auto custom-scrollbar border border-primary">
          {search && (
            <div className="w-full flex items-center border-b border-primary px-3 py-1 sticky top-0 bg-main z-10">
              <SearchComponent
                searchTerm={searchValue}
                setSearchTerm={setSearchValue}
              />
            </div>
          )}
          <div className="w-full relative">
            {filteredList?.length > 0 ? (
              filteredList.map((item, index) => (
                <li
                  key={index}
                  className={`group relative cursor-default select-none py-2 pl-3 pr-9 text-primary ${
                    item?.name == selected ? "bg-fadedblue" : "hover:bg-hover"
                  }`}
                  onClick={(e) => {
                    item.seperateFunction
                      ? item.seperateFunction()
                      : commonFunction(item);
                    e.currentTarget.closest("details").removeAttribute("open");
                  }}
                >
                  <div className="flex flex-col items-start ml-3">
                    <span
                      className={`block whitespace-nowrap font-normal ${
                        item.name == selected ? "font-semibold" : ""
                      }`}
                    >
                      {item.showName}
                    </span>
                    {item.description && (
                      <span className="text-sm text-secondary font-normal">
                        {item.description}
                      </span>
                    )}
                  </div>
                  {item.name == selected && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#5f6368"
                      >
                        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                      </svg>
                    </span>
                  )}
                </li>
              ))
            ) : (
              <li className="py-2 pl-3 pr-9 text-primary text-center">
                No results found
              </li>
            )}
            {add && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.currentTarget.closest("details").removeAttribute("open");
                  setIsNewSegment(true);
                }}
                className="w-full py-2 z-10 px-2 pl-4 md:px-4 border-t border-primary mt-2 flex gap-2 items-center hover:bg-hover"
                id="button-28"
              >
                <span>
                  <img src={Add} alt="Add" />
                </span>
                <span className="text-secondary">Create New Segment</span>
              </button>
            )}
          </div>
        </ul>
      )}
    </details>
  );
}

export default ComponentDropdown;
