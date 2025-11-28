import React, { useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import useHandleClickOutside from "../hooks/useClickOutside";
import { AlignJustify, Columns2, ListRestart } from "lucide-react";
import useMutation from "../hooks/useMutation";
import { Tooltip } from "./ToolTip";

const SortableMultiselectDrop = ({
  isDropdown = true,
  columns,
  setColumns,
  tableName,
  button = (
    <span className="sm:w-fit text-primary font-normal hover:bg-hover rounded-xl border border-primary py-1 px-3 sm:px-2 sm:py-1.5 h-[35px] items-center md:px-3 whitespace-nowrap flex gap-1 sm:gap-2">
      <Tooltip
        text="Columns"
        position="right-0 w-fit -top-0 whitespace-nowrap z-10"
      >
        <div className="flex items-center gap-1 sm:gap-2">
          <Columns2 size={18} />
          <span className="hidden lg:block">Columns</span>
        </div>
      </Tooltip>
    </span>
  ),
}) => {
  const dropDownRef = useRef(null);
  const [draggedColumn, setDraggedColumn] = useState(null);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { callApi } = useMutation();

  const allSelected = columns
    .filter((col) => col.Header.toLowerCase().includes(search.toLowerCase()))
    .every((col) => col.isSelected);

  const handleCheckbox = (column) => {
    const newColumns = columns.map((col) =>
      col.accessor === column.accessor
        ? { ...col, isSelected: !col.isSelected || col.isMandatory }
        : col
    );
    setColumns(newColumns);
  };

  const handleDragStart = (accessor) => setDraggedColumn(accessor);

  const handleDragOver = (index) => {
    const dragIndex = columns.findIndex(
      (col) => col.accessor === draggedColumn
    );
    if (draggedColumn === null || dragIndex === index) return;
    const updatedColumns = [...columns];
    const [movedColumn] = updatedColumns.splice(dragIndex, 1);
    updatedColumns.splice(index, 0, movedColumn);

    setColumns(updatedColumns);
  };

  const handleDrop = (index) => {
    const dragIndex = columns.findIndex(
      (col) => col.accessor === draggedColumn
    );
    if (draggedColumn === null || dragIndex === index) return;
    const updatedColumns = [...columns];
    const [movedColumn] = updatedColumns.splice(dragIndex, 1);
    updatedColumns.splice(index, 0, movedColumn);

    setColumns(updatedColumns);
    setDraggedColumn(null);
  };

  const handleReset = async () => {
    try {
      const response = await callApi(`/private/column/${tableName}`, "DELETE");
      if (response) {
        const resetColumns = columns.map((col) => ({
          ...col,
          isSelected: true,
        }));
        setColumns(resetColumns);
      }
    } catch (error) {
      console.error("Error resetting columns:", error);
    }
  };

  useHandleClickOutside(dropDownRef, () => setIsOpen(false));

  return (
    <div
      ref={dropDownRef}
      className={`${isDropdown ? "relative h-fit w-fit " : "w-full"}`}
    >
      <button onClick={() => setIsOpen(!isOpen)} id="button-96">
        {button}
      </button>
      {(isOpen || !isDropdown) && (
        <div
          className={`${
            isDropdown
              ? "absolute mt-2 top-full right-0 z-10 shadow-md"
              : "w-full"
          } border bg-main rounded-lg border-primary`}
        >
          <div className="flex items-center gap-4 px-4 py-1 border-b border-primary">
            <span className="py-2.5">
              <CiSearch
                size={20}
                strokeWidth="1"
                stroke="#667085"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </span>
            <input
              type="search"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              id="search"
              placeholder="Search"
              className="placeholder:text-secondary w-full py-2.5 placeholder:font-medium focus:outline-none focus:ring-0 focus:border-0 border-0 text-primary bg-main"
            />
          </div>
          <label className="flex gap-2 p-2 items-center border-b border-primary ">
            <input
              checked={allSelected}
              onChange={() =>
                setColumns(
                  columns.map((col) => ({
                    ...col,
                    isSelected:
                      col.Header.toLowerCase().includes(
                        search?.toLocaleLowerCase()
                      ) && !col.isMandatory
                        ? !allSelected
                        : col.isSelected,
                  }))
                )
              }
              type="checkbox"
              name="cols"
              id="checkbox"
              className="w-4 h-4"
            />
            <span className="text-primary">{"Select All"}</span>
            <div className="relative group ml-auto flex items-center justify-center ">
              <button onClick={handleReset}>
                <ListRestart />
              </button>

              {/* Tooltip box */}
              <div className="absolute  bottom-full flex flex-col items-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                <div className="px-3 py-1 text-xs text-white bg-gray-500 rounded-md shadow-lg">
                  Reset Columns
                </div>

                <div className="w-2 h-2  rotate-45 mt-[-4px]"></div>
              </div>
            </div>
          </label>
          <ul
            className={`${
              isDropdown
                ? "max-h-60 w-60 overflow-y-auto custom-scrollbar"
                : "w-full"
            }`}
          >
            {columns
              .filter((col) =>
                col.Header.toLowerCase().includes(search?.toLocaleLowerCase())
              )
              .map((column, index) => (
                <li
                  draggable={!search}
                  onDragStart={() => handleDragStart(column.accessor)}
                  onDragOver={() => handleDragOver(index)}
                  onDrop={() => handleDrop(index)}
                  key={index + "col"}
                >
                  <label className="flex justify-between p-2 items-center">
                    <span>
                      <input
                        checked={column.isSelected}
                        disabled={column.isMandatory}
                        onChange={() => handleCheckbox(column)}
                        type="checkbox"
                        name="cols"
                        id=""
                        className="w-4 h-4"
                      />
                      <span className="text-primary ml-2">{column.Header}</span>
                    </span>
                    {/* <GiHamburgerMenu fill="#344054" /> */}
                    <AlignJustify />
                  </label>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortableMultiselectDrop;
