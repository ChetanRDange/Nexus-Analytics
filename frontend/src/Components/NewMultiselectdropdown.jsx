import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Circle, CircleCheck } from "lucide-react";

const NewMultiselectdropdown = ({
  title,
  options,
  values,
  onChange,
  disabled,
  showItems,
  selectAll = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const filteredOptions = options.filter(({ label }) =>
    label?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get selected labels
  const selectedLabels = options
    .filter((opt) => values?.includes(opt.value))
    .map((opt) => opt.label)
    .join(", ");

  return (
    <div
      ref={dropdownRef}
      className="w-full relative border border-primary rounded-xl px-2 py-1 flex items-center h-[35px]"
    >
      <div
        className={`w-[96%] m-auto flex items-center justify-between ${
          disabled ? "cursor-not-allowed text-gray-400" : "cursor-pointer text-primary"
        }`}
        onClick={() => {
          if (!disabled) {
            setIsOpen(!isOpen);
          }
        }}
      >
        <span className="text-dark truncate">
          {showItems && values?.length > 0
            ? selectedLabels
            : title || "Title De de Bhai"}
        </span>
        <span>
          {isOpen ? <ChevronUp height={18} /> : <ChevronDown height={18} />}
        </span>
      </div>

      {isOpen && !disabled && (
        <div className="absolute top-10 left-0 w-full bg-main z-50 border overflow-hidden border-primary rounded-xl shadow-lg min-w-[200px]">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border-b border-gray-300 bg-main outline-none text-sm"
          />
          <ul className="max-h-60 overflow-y-auto py-1 px-2 flex flex-col gap-1 min-w-fit">
            {filteredOptions?.length > 0 ? (
              <>
                {selectAll && (
                  <li
                    className="py-1 px-2 flex items-center text-dark gap-2 cursor-pointer hover:bg-hover rounded min-w-max"
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange(null);
                    }}
                  >
                    {values?.length === options.length ? (
                      <CircleCheck size={16} />
                    ) : (
                      <Circle size={16} />
                    )}
                    <label>Select All</label>
                  </li>
                )}
                {filteredOptions.map(({ label, value }, index) => (
                  <li
                    key={index}
                    className="py-1 px-2 flex items-center text-dark gap-2 cursor-pointer hover:bg-hover rounded min-w-max"
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange(value);
                    }}
                  >
                    {values?.includes(value) ? (
                      <CircleCheck size={16} />
                    ) : (
                      <Circle size={16} />
                    )}
                    <label>
                      {label.length > 20 ? `${label.slice(0, 20)}...` : label}
                    </label>
                  </li>
                ))}
              </>
            ) : (
              <li className="text-gray-400 text-sm px-2 py-2">No options</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NewMultiselectdropdown;
