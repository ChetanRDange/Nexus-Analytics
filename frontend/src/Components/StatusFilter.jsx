import React, { useState, useEffect } from "react";
import DropImg from "../assets/svgs/chevrondown.svg";
import useStore from "../state/store";

const StatusFilter = ({
  statuses,
  onCategorySelect,
  showName = "Status",
  initialStatus = "",
  preselectedStatus,
}) => {
  console.log("statuses", statuses);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [isOpenSucceses, setIsOpenSucceses] = useState(false);
  const { setSelectedCategory, setCurrentSelectedCategory } = useStore();

  useEffect(() => {
    const statusToSelect = preselectedStatus || initialStatus;
    if (statusToSelect) {
      setSelectedStatuses([statusToSelect]);
      const status = statuses.find((s) => s.name === statusToSelect);
      if (status) {
        setSelectedCategory(status.searchBy);
        setCurrentSelectedCategory(status);
        onCategorySelect({
          name: [statusToSelect],
          searchBy: status.searchBy,
          value: status.value,
        });
      }
    }
  }, [initialStatus, preselectedStatus, statuses]);

  const handleCheckboxClick = (status) => {
    const updatedSelections = selectedStatuses.includes(status.name)
      ? selectedStatuses.filter((s) => s !== status.name)
      : [...selectedStatuses, status.name];

    setSelectedStatuses(updatedSelections);
    setSelectedCategory(status.searchBy);
    setCurrentSelectedCategory(updatedSelections.length ? status : null);
    if (updatedSelections.length > 0) {
      onCategorySelect({
        name: updatedSelections,
        searchBy: status.searchBy,
        value: status.value,
      });
    } else {
      onCategorySelect(null);
    }
  };

  return (
    <div className="dropdown-container relative w-full">
      <details
        name="tone"
        open={isOpenSucceses}
        className="relative w-full cursor-default rounded-xl bg-main px-4 text-left text-primary shadow-sm border border-fadedblue focus:outline-none focus:ring-0 sm:text-lg sm:leading-6"
        onToggle={(e) => setIsOpenSucceses(e.target.open)}
      >
        <summary className="cursor-pointer py-1 text-left w-full pr-0 text-primary list-none focus:outline-none focus:ring-0 focus:border-0">
          <span className="flex items-center w-fit">
            <span className="block font-medium whitespace-nowrap text-[16px]">
              {selectedStatuses.length > 0 ? (
                <span>
                  {showName} : {selectedStatuses.join(", ")}
                </span>
              ) : (
                <span className="text-secondary font-normal flex gap-2 items-center">
                  <span>{showName}</span>
                  <span>
                    <img src={DropImg} alt="" className="w-full h-full" />
                  </span>
                </span>
              )}
            </span>
          </span>
        </summary>

        <ul className="absolute end-0 top-11 z-40 mt-1 min-w-[250px] max-w-[300px] max-h-[350px] rounded-xl bg-main text-[12px] md:text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm overflow-y-auto custom-scrollbar">
          <div className="relative py-2 border-b border-primary">
            {statuses?.map((status) => (
              <li
                key={status.id}
                className={`group relative cursor-default select-none py-1 pl-3 pr-14 text-primary hover:bg-hover`}
                onClick={() => handleCheckboxClick(status)}
              >
                <div className="flex items-center">
                  <div className="ml-1 whitespace-nowrap font-normal flex gap-4 items-center">
                    <input
                      type="checkbox"
                      checked={selectedStatuses.includes(status.name)}
                      onChange={() => {}}
                      className="form-checkbox h-4 w-4 text-blue-600 focus:outline-none border-primary"
                    />
                    <div
                      className="px-2 py-1 rounded-lg flex gap-2 items-center"
                      style={{
                        backgroundColor: status.bgColor,
                        color: status.color,
                      }}
                    >
                      <span
                        className="w-[8px] h-[8px] rounded-full"
                        style={{ backgroundColor: status.dotColor }}
                      ></span>
                      <span>{status.name}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </div>
          {/* <button 
            className="w-full py-3 pb-5 font-normal text-left px-4 hover:bg-hover"
            onClick={(e) => e.currentTarget.closest("details").removeAttribute("open")}
            id="button-97"
          >
            Add to advanced filter
          </button> */}
        </ul>
      </details>
    </div>
  );
};

export default StatusFilter;
