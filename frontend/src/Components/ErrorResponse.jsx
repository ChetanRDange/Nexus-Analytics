import React from "react";
import { useState } from "react";
import Printer from "../assets/svgs/printer.svg";
import Download from "../assets/svgs/download.svg";
import DeleteConfirm from "../pages/DeleteConfirm";
import ErrorTable from "./ErrorTable";
import ErrorTableAdmin from "./errorTableAdmin";
import Pagination from "./Pagination";
import DynamicTableComponent from "./DynamicTableComponent";
import ComponentDropdown from "./ComponentDropdown";

const comapnyInfo = [
  {
    id: "0",
    srno: "001",
    errorID: "SADM001",
    module: "Authentication",
    errorCase: "Invalid Email",
    errorMsg: "Invalid email address. Please enter a valid email.",
  },
  {
    id: "1",
    srno: "001",
    errorID: "SADM001",
    module: "Authentication",
    errorCase: "Invalid Email",
    errorMsg: "Invalid email address. Please enter a valid email.",
  },
  {
    id: "2",
    srno: "001",
    errorID: "SADM001",
    module: "Authentication",
    errorCase: "Invalid Email",
    errorMsg: "Invalid email address. Please enter a valid email.",
  },
  {
    id: "3",
    srno: "001",
    errorID: "SADM001",
    module: "Authentication",
    errorCase: "Invalid Email",
    errorMsg: "Invalid email address. Please enter a valid email.",
  },
  {
    id: "4",
    srno: "001",
    errorID: "SADM001",
    module: "Authentication",
    errorCase: "Invalid Email",
    errorMsg: "Invalid email address. Please enter a valid email.",
  },
  {
    id: "5",
    srno: "001",
    errorID: "SADM001",
    module: "Authentication",
    errorCase: "Invalid Email",
    errorMsg: "Invalid email address. Please enter a valid email.",
  },
  {
    id: "6",
    srno: "001",
    errorID: "SADM001",
    module: "Authentication",
    errorCase: "Invalid Email",
    errorMsg: "Invalid email address. Please enter a valid email.",
  },
  {
    id: "7",
    srno: "001",
    errorID: "SADM001",
    module: "Authentication",
    errorCase: "Invalid Email",
    errorMsg: "Invalid email address. Please enter a valid email.",
  },
  {
    id: "8",
    srno: "001",
    errorID: "SADM001",
    module: "Authentication",
    errorCase: "Invalid Email",
    errorMsg: "Invalid email address. Please enter a valid email.",
  },
  {
    id: "9",
    srno: "001",
    errorID: "SADM001",
    module: "Authentication",
    errorCase: "Invalid Email",
    errorMsg: "Invalid email address. Please enter a valid email.",
  },
  {
    id: "10",
    srno: "001",
    errorID: "SADM001",
    module: "Authentication",
    errorCase: "Invalid Email",
    errorMsg: "Invalid email address. Please enter a valid email.",
  },
  {
    id: "11",
    srno: "001",
    errorID: "SADM001",
    module: "Authentication",
    errorCase: "Invalid Email",
    errorMsg: "Invalid email address. Please enter a valid email.",
  },
  {
    id: "12",
    srno: "001",
    errorID: "SADM001",
    module: "Authentication",
    errorCase: "Invalid Email",
    errorMsg: "Invalid email address. Please enter a valid email.",
  },
  {
    id: "13",
    srno: "001",
    errorID: "SADM001",
    module: "Authentication",
    errorCase: "Invalid Email",
    errorMsg: "Invalid email address. Please enter a valid email.",
  },
  {
    id: "14",
    srno: "001",
    errorID: "SADM001",
    module: "Authentication",
    errorCase: "Invalid Email",
    errorMsg: "Invalid email address. Please enter a valid email.",
  },
  {
    id: "15",
    srno: "001",
    errorID: "SADM001",
    module: "Authentication",
    errorCase: "Invalid Email",
    errorMsg: "Invalid email address. Please enter a valid email.",
  },
  {
    id: "16",
    srno: "001",
    errorID: "SADM001",
    module: "Authentication",
    errorCase: "Invalid Email",
    errorMsg: "Invalid email address. Please enter a valid email.",
  },
  {
    id: "17",
    srno: "001",
    errorID: "SADM001",
    module: "Authentication",
    errorCase: "Invalid Email",
    errorMsg: "Invalid email address. Please enter a valid email.",
  },
  {
    id: "18",
    srno: "001",
    errorID: "SADM001",
    module: "Authentication",
    errorCase: "Invalid Email",
    errorMsg: "Invalid email address. Please enter a valid email.",
  },
  {
    id: "19",
    srno: "001",
    errorID: "SADM001",
    module: "Authentication",
    errorCase: "Invalid Email",
    errorMsg: "Invalid email address. Please enter a valid email.",
  },
  {
    id: "20",
    srno: "001",
    errorID: "SADM001",
    module: "Authentication",
    errorCase: "Invalid Email",
    errorMsg: "Invalid email address. Please enter a valid email.",
  },
  {
    id: "21",
    srno: "001",
    errorID: "SADM001",
    module: "Authentication",
    errorCase: "Invalid Email",
    errorMsg: "Invalid email address. Please enter a valid email.",
  },
];

const categories = [
  {
    id: 0,
    showName: "Company Id",
    name: "Company Id",
  },
  {
    id: 1,
    showName: "Company Size",
    name: "Company Size",
  },
  {
    id: 2,
    showName: "Latest Payment",
    name: "Latest Payment",
  },
  {
    id: 3,
    showName: "Plan Expiry Date",
    name: "Plan Expiry Date",
  },
  {
    id: 4,
    showName: "Status",
    name: "Status",
  },
];

const ErrorResponse = () => {
  const [onTabClick, setOnTabClick] = useState("Company-Details");
  const [currentPage, setCurrentPage] = useState(1);
  const [isInviteSentModalOpen, setIsInviteSentModalOpen] = useState(false);

  const [filterDropdown, setFilterDropDown] = useState({
    showName: "Click to select an option",
    name: "",
  });
  const itemsPerPage = 20;
  const totalRecords = comapnyInfo.length;

  const totalPages = Math.ceil(comapnyInfo.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCompanies = comapnyInfo.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="h-full py-8 p-4 sm:p-5 overflow-x-hidden">
      <div className="w-full pb-3  gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">
            Error Response Messages
          </span>
        </div>
      </div>
      <div className="my-0 rounded-xl">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full align-middle">
            <div className=" flex flex-col gap-y-2 md:flex-row md:justify-between items-center gap-2 py-3 border-b border-primary">
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setOnTabClick("Company-Details")}
                  className={`py-2 px-3 rounded-xl text-primary font-medium ${
                    onTabClick === "Company-Details"
                      ? "bg-fadedblue"
                      : "bg-white"
                  }`}
                  id="button-41"
                >
                  Organization Level
                </button>
                <button
                  onClick={() => setOnTabClick("Plan-Details")}
                  className={`py-2 px-3 rounded-xl text-primary font-medium ${
                    onTabClick === "Plan-Details" ? "bg-fadedblue" : "bg-white"
                  }`}
                  id="button-42"
                >
                  Admin Level
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {onTabClick === "Company-Details" && (
        <div className="flex flex-col border border-primary my-8 rounded-xl">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <div className="w-full flex flex-col-reverse sm:flex-row justify-between px-6 ptpb-4 border-b border-primary">
                <div className="flex gap-4 flex-wrap sm:flex-nowrap justify-start">
                  <div className="px-2 rounded-xl border border-primary flex gap-2 items-center w-full md:w-[300px] h-fit">
                    <span className="py-2">
                      <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
                          stroke="#667085"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <input
                      type="search"
                      name="search"
                      id="search"
                      placeholder="Search"
                      className="placeholder:text-secondary w-full md:w-[240px] py-2 placeholder:font-medium focus:outline-none focus:ring-0 focus:border-0 border-0 text-primary"
                    />
                  </div>

                  <div className="w-full">
                    <div className="dropdown-container relative w-full">
                      <ComponentDropdown
                        name="search"
                        SummaryChild={
                          <h5 className="p-0 m-0">{filterDropdown.showName}</h5>
                        }
                        dropdownList={categories}
                        search={true}
                        commonFunction={setFilterDropDown}
                        selected={filterDropdown.name}
                      />
                    </div>
                  </div>
                </div>
                <DeleteConfirm
                  isInviteSentModalOpen={isInviteSentModalOpen}
                  setIsInviteSentModalOpen={setIsInviteSentModalOpen}
                />

                <div className="flex justify-end gap-2 items-center">
                  <button
                    className="text-primary font-normal hover:bg-gray-50 rounded-xl border border-primary py-1.5 sm:py-2 sm:px-3 whitespace-nowrap flex gap-2"
                    id="button-43"
                  >
                    <img src={Printer} alt="Printer" />
                    <span>Print</span>
                  </button>

                  <button
                    className="text-primary font-normal hover:bg-gray-50 rounded-xl border border-primary py-1.5 sm:py-2 sm:px-3 whitespace-nowrap flex gap-2"
                    id="button-44"
                  >
                    <img src={Download} alt="Download" />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              <DynamicTableComponent
                currentCompanies={currentCompanies}
                edit={true}
              />
            </div>
          </div>

          <div className="w-full mt-2">
            <div className="w-full py-3">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                handlePageChange={handlePageChange}
                totalRecords={totalRecords}
              />
            </div>
          </div>
        </div>
      )}

      {onTabClick === "Plan-Details" && (
        <div className="flex flex-col border border-primary my-8 rounded-xl">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <div className="w-full flex flex-col-reverse sm:flex-row justify-between px-6 ptpb-4 border-b border-primary">
                <div className="flex gap-4 flex-wrap sm:flex-nowrap justify-start">
                  <div className="px-2 rounded-xl border border-primary flex gap-2 items-center w-full md:w-[300px] h-fit">
                    <span className="py-2">
                      <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
                          stroke="#667085"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <input
                      type="search"
                      name="search"
                      id="search"
                      placeholder="Search"
                      className="placeholder:text-secondary w-full md:w-[240px] py-2 placeholder:font-medium focus:outline-none focus:ring-0 focus:border-0 border-0 text-primary"
                    />
                  </div>

                  <div className="w-full">
                    <div className="dropdown-container relative w-full">
                      <ComponentDropdown
                        name="search"
                        SummaryChild={
                          <h5 className="p-0 m-0">{filterDropdown.showName}</h5>
                        }
                        dropdownList={categories}
                        search={true}
                        commonFunction={setFilterDropDown}
                        selected={filterDropdown.name}
                      />
                    </div>
                  </div>
                </div>
                <DeleteConfirm
                  isInviteSentModalOpen={isInviteSentModalOpen}
                  setIsInviteSentModalOpen={setIsInviteSentModalOpen}
                />

                <div className="flex justify-end gap-2 items-center">
                  <button
                    className="text-primary font-normal hover:bg-gray-50 rounded-xl border border-primary py-1.5 sm:py-2 sm:px-3 whitespace-nowrap flex gap-2"
                    id="button-45"
                  >
                    <img src={Printer} alt="Printer" />
                    <span>Print</span>
                  </button>

                  <button
                    className="text-primary font-normal hover:bg-gray-50 rounded-xl border border-primary py-1.5 sm:py-2 sm:px-3 whitespace-nowrap flex gap-2"
                    id="button-46"
                  >
                    <img src={Download} alt="Download" />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              <ErrorTableAdmin currentCompanies={currentCompanies} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ErrorResponse;
