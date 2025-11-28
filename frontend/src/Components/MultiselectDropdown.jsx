import React, { useState, useRef, useEffect } from "react";
import SearchComponent from "./SearchComponent";

const MultiselectDropdown = ({
  data = [],
  label = "Select Options",
  onChange,
  defaultLabel,
  required = false,
}) => {
  console.log("data is ", data)
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Set default selections
  useEffect(() => {
    if (defaultLabel && Array.isArray(data)) {
      const defaultSelected = defaultLabel
        .split(",")
        .map((plan) => data.find((item) => item.name === plan.trim()));
      setSelectedItems(defaultSelected.filter(Boolean));
    } 
  }, [defaultLabel, data]);

  // Toggle item selection
  const toggleSelection = (item) => {
    setSelectedItems((prevSelected) => {
      const isSelected = prevSelected.some(
        (selected) => selected.id === item.id
      );
      const updatedSelection = isSelected
        ? prevSelected.filter((selected) => selected.id !== item.id)
        : [...prevSelected, item];

      if (onChange) {
        setTimeout(() => onChange(updatedSelection), 0);
      }

      return updatedSelection;
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        dropdownRef.current.removeAttribute("open");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const generateSummaryText = () => {
    if (selectedItems.length === 0) {
      return (
        <span className="text-placeholder font-normal">
          {defaultLabel ? defaultLabel : "Click to select an option"}
        </span>
      );
    }

    const firstTwo = selectedItems
      .slice(0, 2)
      .map((d) => d.name)
      .join(", ");
    const remainingCount = selectedItems.length - 2;

    return remainingCount > 0
      ? `${firstTwo}, +${remainingCount} more`
      : firstTwo;
  };

  const filteredData = data.filter((item) =>
    item?.name?.toLowerCase()?.includes(searchTerm.toLowerCase())
  );

  // Determine if all filtered items are selected
  const allFilteredSelected =
    filteredData.length > 0 &&
    filteredData.every((item) =>
      selectedItems.some((selected) => selected.id === item.id)
    );

  // Handle select all toggle
  const handleSelectAll = () => {
    const newSelection = allFilteredSelected
      ? selectedItems.filter(
          (item) => !filteredData.some((fItem) => fItem.id === item.id)
        )
      : Array.from(new Set([...selectedItems, ...filteredData]));

    setSelectedItems(newSelection);
    if (onChange) setTimeout(() => onChange(newSelection), 0);
  };

  return (
    <div className="w-full">
      <label className="text-dark">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="dropdown-container relative w-full pt-2">
        <details ref={dropdownRef} className="relative">
          <summary className="cursor-pointer rounded-xl bg-main pl-3 pr-10 py-2.5 text-left text-dark shadow-sm border border-primary sm:text-lg sm:leading-6">
            <span className="flex items-center">
              <span className="block font-medium text-[16px] md:text-[16px]">
                {generateSummaryText()}
              </span>
            </span>
            <span className="absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <svg
                className="icon-closed"
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="#667085"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                className="icon-open hidden"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 15L12 9L6 15"
                  stroke="#667085"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </summary>

          <ul className="absolute z-40 mt-1 max-h-48 w-full rounded-md border border-primary bg-main text-[12px] md:text-base shadow-lg ring-1 ring-black ring-opacity-5 overflow-y-auto custom-scrollbar">
            <div className="w-full flex items-center border-b border-primary px-3 py-2">
              <SearchComponent
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>

            {filteredData.length > 0 && (
              <li
                className="cursor-pointer py-2 px-3 text-dark hover:bg-lightcyan"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="flex items-center gap-2"
                  onClick={handleSelectAll}
                >
                  <input
                    type="checkbox"
                    id="select-all"
                    checked={allFilteredSelected}
                    onChange={handleSelectAll}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span onClick={handleSelectAll}>Select All</span>
                </div>
              </li>
            )}

            {filteredData.map((item) => (
              <li
                key={item.id}
                className="cursor-pointer py-2 px-3 text-dark hover:bg-lightcyan"
                onClick={() => toggleSelection(item)}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`checkbox-${item.id}`}
                    checked={selectedItems.some(
                      (selected) => selected.id === item.id
                    )}
                    onChange={() => toggleSelection(item)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span>{item.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </div>
  );
};

export default MultiselectDropdown;
