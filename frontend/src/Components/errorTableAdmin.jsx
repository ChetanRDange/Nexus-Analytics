import React, { useState } from "react";
import Sort from "../assets/svgs/sort.svg";

import { useNavigate } from "react-router-dom";

const ErrorTableAdmin = ({ currentCompanies }) => {
  const navigate = useNavigate();

  const [selectedCompany, setSelectedCompany] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

    if (!isChecked) {
      setSelectedCompany(currentCompanies.map((post) => post.id));
    } else {
      setSelectedCompany([]);
    }
  };

  const handleRowCheckboxChange = (id) => {
    if (selectedCompany.includes(id)) {
      setSelectedCompany(selectedCompany.filter((postId) => postId !== id));
      console.log(id);
    } else {
      setSelectedCompany([...selectedCompany, id]);
      console.log(id);
    }
  };

  return (
    <div className="overflow-x-auto custom-scrollbar">
      <table className="min-w-full overflow-x-auto custom-scrollbar">
        <thead className="border-b border-primary">
          <tr>
            <th
              scope="col"
              className="px-4 whitespace-nowrap text-left md:px-6 py-1 outline-none ring-0  border-0"
            >
              <div className="inline-flex items-center">
                <label
                  className="relative flex items-center p-3 rounded-full cursor-pointer"
                  htmlFor="ripple-on"
                  data-ripple-dark="true"
                >
                  <input
                    id="ripple-on"
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-sm border border-primary transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-primary checked:bg-white checked:before:bg-gray-100 hover:before:opacity-10"
                  />

                  <span className="absolute text-primary transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth={1}
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </label>
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-1 text-start font-semibold text-primary"
            >
              <span className="flex gap-2 items-center">
                <span className="whitespace-nowrap">Sr. No.</span>
                <img src={Sort} alt="Sort" />
              </span>
            </th>

            <th scope="col" className="px-6 py-1 text-start text-primary">
              <span className="flex gap-2 items-center">
                <span className="whitespace-nowrap">Error ID</span>
                <img src={Sort} alt="Sort" />
              </span>
            </th>

            <th scope="col" className="px-6 py-1 text-start text-primary">
              <span className="flex gap-2 items-center">
                <span className="whitespace-nowrap">Module</span>
                <img src={Sort} alt="Sort" />
              </span>
            </th>

            <th scope="col" className="px-6 py-1 text-start text-primary">
              <span className="flex gap-2 items-center">
                <span className="whitespace-nowrap">Error Case</span>
                <img src={Sort} alt="Sort" />
              </span>
            </th>

            <th scope="col" className="px-6 py-1 text-start text-primary">
              <span className="flex gap-2 items-center">
                <span className="whitespace-nowrap">Error Message</span>
                <img src={Sort} alt="Sort" />
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentCompanies.map((company, index) => (
            <tr
              key={company.id}
              className={`hover:bg-gray-50 border border-collapse ${
                selectedCompany.includes(company.id) ? "bg-blue-50" : ""
              }`}
            >
              <td
                scope="row"
                className="px-6 text-left py-2.5 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <div className="inline-flex items-center">
                  <label
                    className="relative flex items-center p-3 rounded-full cursor-pointer"
                    htmlFor={`row-checkbox-${company.id}`}
                    data-ripple-dark="true"
                  >
                    <input
                      id={`row-checkbox-${company.id}`}
                      type="checkbox"
                      checked={selectedCompany.includes(company.id)}
                      onChange={() => handleRowCheckboxChange(company.id)}
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-sm border border-primary transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-primary checked:bg-white checked:before:bg-gray-100 hover:before:opacity-10 "
                    />
                    <span className="absolute text-primary transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth={1}
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </label>
                </div>
              </td>

              <td className="px-6 ptpb-4 whitespace-nowrap font-medium text-primary">
                <span>{company.srno}</span>
              </td>

              <td className="px-6 ptpb-4 whitespace-nowrap font-medium text-primary">
                <span>{company.errorID}</span>
              </td>

              <td className="px-6 ptpb-4 whitespace-nowrap font-medium text-primary">
                <span>{company.module}</span>
              </td>

              <td className="px-6 ptpb-4 whitespace-nowrap font-medium text-primary">
                <span>{company.errorCase}</span>
              </td>

              <td className="px-6 ptpb-4 whitespace-nowrap font-medium text-primary">
                <span>{company.errorMsg}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ErrorTableAdmin;
