// TableComponent.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sort from "../assets/svgs/sort.svg";
import AddBlack from "../assets/svgs/plus.svg";
import Printer from "../assets/svgs/printer.svg";
import Upload from "../assets/svgs/upload.svg";
import Download from "../assets/svgs/download.svg";
import Delete from "../assets/images/delete.png";
import TableActions from "./TableActions";
import DeleteConfirm from "../pages/DeleteConfirm";
import UsersTableActions from "./UsersTableActions";
import Pagination from "./Pagination";
import ActionImg from "../assets/svgs/action.svg";
import Filters from "./Filters";
import Search from "./Search";
import StatusFilter from "./StatusFilter";
import Columns from "../assets/svgs/columns.svg";
import useStore from "../state/store";
const DynamicTableComponent = ({
  filter = false,
  search = false,
  tableCountLabel = false,
  deleteBtn = false,
  printBtn = false,
  importBtn = false,
  ExportBtn = false,
  openImportModal,
  deletelabel,
  deletepara,
  deletebutton1,
  deletebutton2,
  statuses,
  categories,
  columns,
  data = [],
  selectable = false,
  onSelectChange,
  actions = false,
  addColumn = false,
  edit = true,
  view = false,
  heading = "",
  page = "",
  deletePlan = true,
  userType,
  deleteItem,
  setIsDeleteModalOpen,
  editPage = "/edit-company",
  planName = "normal",
  paginate = false,
  setDeleteRole,
  onSearch,
  downloadExcel,
  totalCount,
  reFetch,
}) => {
  console.log("data", data);
  const navigate = useNavigate();
  const {
    currentPaginatedPage,
    currentItemsPerPage,
    setCurrentPaginatedPage,
    setCurrentItemsPerPage,
    setSelectedCategory,
    selectedCategory,
    currentSelectedCategory,
    setCurrentSelectedCategory,
  } = useStore();
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [isInviteSentModalOpen, setIsInviteSentModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPaginatedPage(pageNumber);
    }
  };

  const handleMasterCheckboxChange = () => {
    const newChecked = !isAllSelected;
    setIsAllSelected(newChecked);
    if (newChecked) {
      const allIds = data2.map((item) => item.id);
      setSelectedItems(allIds);
      if (onSelectChange) onSelectChange(allIds);
    } else {
      setSelectedItems([]);
      if (onSelectChange) onSelectChange([]);
    }
  };

  const handleAllSelect = () => {
    const newChecked = !isAllSelected;
    setIsAllSelected(newChecked);
    // If 'Select All' is clicked, disable pagination and fetch all users
    if (newChecked) {
      const allIds = data2.map((item) => item.id);
      onSelectChange();
      setSelectedItems(allIds);
    } else {
      onSelectChange(new Date());
      setSelectedItems([]);
    }
  };

  const totalRecords = Number(totalCount);
  const totalPages = Math.ceil(totalRecords / currentItemsPerPage);

  const data2 = paginate
    ? data.slice(0, currentItemsPerPage)
    : data.slice(0, data.length);
  const handleRowCheckboxChange = (id) => {
    let updatedSelected;
    if (selectedItems.includes(id)) {
      updatedSelected = selectedItems.filter((itemId) => itemId !== id);
    } else {
      updatedSelected = [...selectedItems, id];
    }
    setSelectedItems(updatedSelected);
    setIsAllSelected(updatedSelected.length === data2.length);
    if (onSelectChange) onSelectChange(updatedSelected);
  };

  const [showStatusFilter, setShowStatusFilter] = useState(false);

  const handleCategorySelect = (category) => {
    if (category.Header === "Status") {
      setShowStatusFilter(true);
    } else {
      setShowStatusFilter(false);
      setSelectedCategory(category?.searchBy);
      console.log(selectedCategory);
    }
  };

  function handleFilterClear(e) {
    e.preventDefault();
    setShowStatusFilter(false);
    setSelectedCategory(null);
    setCurrentSelectedCategory(null);
  }

  return (
    <div className="">
      <div className="my- rounded-xl border border-primary">
        <DeleteConfirm
          isInviteSentModalOpen={isInviteSentModalOpen}
          setIsInviteSentModalOpen={setIsInviteSentModalOpen}
          label={deletelabel}
          para={deletepara}
          button1={deletebutton1}
          button2={deletebutton2}
        />

        <div className="w-full flex flex-col-reverse sm:flex-row flex-wrap gap-y-4 justify-between px-3 sm:px-6 ptpb-4 border-b border-primary">
          <div className="flex gap-4 flex-wrap sm:flex-nowrap justify-start">
            {search && (
              <div className="px-2 rounded-xl border border-primary flex gap-2 items-center w-full md:w-[210px] h-fit">
                <Search onSearch={onSearch} />
              </div>
            )}
            {filter && (
              <>
                <Filters
                  categories={categories}
                  setSelectedCategory={setSelectedCategory}
                  selectedCategory={selectedCategory}
                  onCategorySelect={handleCategorySelect}
                />
                {showStatusFilter && <StatusFilter statuses={statuses} />}
              </>
            )}
            {/* <div className="flex sm:hidden w-full justify-end">
              {selectedCategory && (
                <button className="px-2 py-1 rounded-lg text-secondary hover:text-blue"
                  onClick={handleFilterClear}
                 id="button-33">
                  Clear All
                </button>
              )}
            </div> */}
          </div>
          <div
            className={`w-full xl:w-fit flex ${deleteBtn + printBtn + importBtn + ExportBtn >= 4
              ? "flex-wrap"
              : "flex-nowrap"
              } justify-end gap-2 items-center`}
          >
            {selectedCategory && (
              <button className="hidden sm:block px-2 py-1 rounded-lg text-secondary hover:text-blue"
                onClick={handleFilterClear}
                id="button-34">
                Clear All
              </button>
            )}
            {deleteBtn && (
              <button onClick={() => setIsInviteSentModalOpen(true)}
                className="w-[100px] sm:w-fit text-primary font-normal hover:bg-hover rounded-xl borderborder-primary py-1.5 px-1.5 sm:px-2 sm:py-2 md:px-3 whitespace-nowrap flex gap-1 sm:gap-2 items-center"
                id="button-35">
                <Tooltip text="Delete" position="right-0 w-fit -top-1 whitespace-nowrap">
                  <img src={Delete} alt="Delete" />
                </Tooltip>
                <span className="hidden lg:block"> Delete</span>
              </button>
            )}
            {printBtn && (
              <button className="w-[100px] sm:w-fit text-primary font-normal hover:bg-hover rounded-xl border border-primary py-1.5 px-1.5 sm:px-2 sm:py-2 md:px-3 whitespace-nowrap flex gap-1 sm:gap-2" id="button-36">
                
                <Tooltip text="Printer" position="right-0 w-fit -top-1 whitespace-nowrap">
                <img src={Printer} alt="Printer" />
                </Tooltip>
                <span className="hidden lg:block">Print</span>
              </button>
            )}
            {importBtn && (
              <button onClick={openImportModal}
                className="w-[100px] sm:w-fit text-primary font-normal hover:bg-hover rounded-xl border border-primary py-1.5 px-1.5 sm:px-2 sm:py-2 md:px-3 whitespace-nowrap flex gap-1 sm:gap-2"
                id="button-37">
                <Tooltip text="Upload" position="right-0 w-fit -top-1 whitespace-nowrap">
                <img src={Upload} alt="Upload" />
                </Tooltip>
                <span className="hidden lg:block">Import</span>
              </button>
            )}
            {ExportBtn && (
              <button onClick={downloadExcel}
                className="w-[100px] sm:w-fit text-primary font-normal hover:bg-hover rounded-xl border border-primary py-1.5 px-1.5 sm:px-2 sm:py-2 md:px-3 whitespace-nowrap flex gap-1 sm:gap-2"
                id="button-38">
                <Tooltip text="Download" position="right-0 w-fit -top-1 whitespace-nowrap">
                <img src={Download} alt="Download" />
                </Tooltip>
                <span className="hidden lg:block">Export</span>
              </button>
            )}
            {addColumn && (
              <button className="w-[100px] sm:w-fit text-primary font-normal hover:bg-hover rounded-xl border border-primary py-1.5 px-1.5 sm:px-2 sm:py-2 md:px-3 whitespace-nowrap flex gap-1 sm:gap-2" id="button-39">
                <Tooltip text="Columns" position="right-0 w-fit -top-1 whitespace-nowrap">
                <img src={Columns} alt="Columns" />
                </Tooltip>
                <span className="hidden lg:block">Columns</span>
              </button>
            )}
          </div>
        </div>
        {tableCountLabel && (
          <div className="w-full ptpb-4 text-center bg-[#F9FAFB] border-b border-primary">
            <p className="text-secondary">
              All {selectedItems.length} record from this page is selected
              <Link onClick={handleAllSelect} className="text-blue pl-2">
                Select all {totalCount} records from this table
              </Link>
            </p>
          </div>
        )}

        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full">
            <thead className="border-b border-primary">
              <tr>
                {selectable && (
                  <th scope="col" className="px-4 py-2.5 text-left">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={handleMasterCheckboxChange}
                        className="form-checkbox h-4 w-4 text-blue-600 focus:outline-none"
                      />
                    </label>
                  </th>
                )}
                {columns.map((column, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="px-6 py-2.5 text-left font-semibold text-primary"
                  >
                    <div className="flex items-center gap-2">
                      <span className="whitespace-nowrap">{column.Header}</span>
                      {/* {column.sortable !== false && (
                        <img src={Sort} alt="Sort" className="w-4 h-4" />
                      )} */}
                    </div>
                  </th>
                ))}
                {actions && (
                  <th
                    scope="col"
                    className="px-6 py-2 text-left font-semibold text-primary"
                  >
                    Actions
                  </th>
                )}
                {/* {addColumn && (
                  <th
                    scope="col"
                    className="px-4 py-2 text-left font-semibold text-primary"
                  >
                    <button className="p-1.5 px-1.5 rounded-xl hover:bg-gray-100 border-0 outline-0 ring-0 focus:border-0 focus:outline-0 focus:ring-0" id="button-40">
                      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.8398 4.5V19.5M20.3398 12H5.33984" stroke="#344054" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>

                    </button>
                  </th>
                )} */}
              </tr>
            </thead>
            <tbody>
              {data2.map((row, index) => (
                <tr
                  key={row.id}
                  className={` border-b border-primary ${selectedItems.includes(row.id)
                    ? "bg-blue-50"
                    : "hover:bg-hover"
                    }`}
                >
                  {selectable && (
                    <td className="px-4 py-2">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(row.id)}
                          onChange={() => handleRowCheckboxChange(row.id)}
                          className="form-checkbox h-4 w-4 text-blue-600"
                        />
                      </label>
                    </td>
                  )}
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-6 py-2 text-secondary whitespace-nowrap font-medium"
                    >
                      {column.Cell
                        ? column.Cell({
                          value: row[column.accessor],
                          row,
                        })
                        : row[column.accessor] || "N/A"}
                    </td>
                  ))}
                  {actions && userType !== "Owner" ? (
                    <td className="px-6 ptpb-4 whitespace-nowrap font-medium text-secondary">
                      <TableActions
                        index={index}
                        setIsModalOpen={setIsModalOpen}
                        edit={edit}
                        view={view}
                        setOpenDropdownIndex={setOpenDropdownIndex}
                        openDropdownIndex={openDropdownIndex}
                        row={row}
                        heading={heading}
                        page={page}
                        deleteItem={deleteItem}
                        deletePlan={deletePlan}
                        reFetch={reFetch}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                        editPage={editPage}
                        planName={planName}
                        setDeleteRole={setDeleteRole} // Add this if it's needed
                      />
                    </td>
                  ) : actions ? (
                    <td className="px-6 ptpb-4 whitespace-nowrap font-medium text-secondary">
                      <UsersTableActions
                        index={index}
                        setIsModalOpen={setIsModalOpen}
                        edit={edit}
                        view={view}
                        setOpenDropdownIndex={setOpenDropdownIndex}
                        openDropdownIndex={openDropdownIndex}
                        row={row}
                        heading={heading}
                        page={page}
                        userType={userType}
                        deleteItem={deleteItem}
                        deletePlan={deletePlan}
                        reFetch={reFetch}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                        editPage={editPage}
                        planName={planName}
                      />
                    </td>
                  ) : (
                    <></>
                  )}
                  {/* {addColumn && <td></td>} */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full mt-2">
          <div className="w-full py-3">
            {paginate && (
              <Pagination
                currentPage={currentPaginatedPage}
                totalPages={totalPages}
                itemsPerPage={currentItemsPerPage}
                setItemsPerPage={setCurrentItemsPerPage}
                handlePageChange={handlePageChange}
                totalRecords={totalRecords}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicTableComponent;
