import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Download from "../assets/svgs/download.svg";
import Upload from "../assets/svgs/upload.svg";
import UploadImg from "../assets/svgs/uploadfile.svg";
import createXLSX from "../utils/exportXLSX";
import Pagination from "./Pagination";
import { Tooltip } from "./ToolTip";

const TwoTableComponent = ({
  defaultColumns,
  data,
  bulkendpoint,
  schemaMapping,
  setIsFileImported,
}) => {
  const [correctData, setCorrectData] = useState([]);
  const [incorrectData, setIncorrectData] = useState([]);
  const [mappedCorrectData, setMappedCorrectData] = useState([]);

  const [currentPageCorrect, setCurrentPageCorrect] = useState(1);
  const [currentPageIncorrect, setCurrentPageIncorrect] = useState(1);

  const [itemsPerPageCorrect, setItemsPerPageCorrect] = useState(10);
  const [itemsPerPageIncorrect, setItemsPerPageIncorrect] = useState(10);

  const totalRecordsCorrect = correctData.length;
  const totalRecordsIncorrect = incorrectData.length;

  const totalPagesCorrect = Math.ceil(
    totalRecordsCorrect / itemsPerPageCorrect
  );
  const totalPagesIncorrect = Math.ceil(
    totalRecordsIncorrect / itemsPerPageIncorrect
  );

  const paginatedDataCorrect = correctData.slice(
    (currentPageCorrect - 1) * itemsPerPageCorrect,
    currentPageCorrect * itemsPerPageCorrect
  );

  const paginatedDataIncorrect = incorrectData.slice(
    (currentPageIncorrect - 1) * itemsPerPageIncorrect,
    currentPageIncorrect * itemsPerPageIncorrect
  );

  const handlePageChangeCorrect = (page) => {
    setCurrentPageCorrect(page);
  };

  const handlePageChangeIncorrect = (page) => {
    setCurrentPageIncorrect(page);
  };

  const handleItemsPerPageChangeCorrect = (items) => {
    setItemsPerPageCorrect(items);
    setCurrentPageCorrect(1);
  };

  const handleItemsPerPageChangeIncorrect = (items) => {
    setItemsPerPageIncorrect(items);
    setCurrentPageIncorrect(1);
  };

  useEffect(() => {
    const areFieldsMissing = (row) =>
      defaultColumns.some(({ Header }) => {
        return (
          row[Header] === undefined ||
          row[Header] === "" ||
          row[Header] === "\n" ||
          row[Header] === "N/A"
        );
      });

    const validData = [];
    const invalidData = [];

    data.forEach((row) => {
      const rowCopy = { ...row };

      defaultColumns.forEach(({ Header }) => {
        if (
          row[Header] === undefined ||
          row[Header] === null ||
          row[Header] === "" ||
          row[Header] === "\n" ||
          row[Header] === "N/A"
        ) {
          rowCopy[Header] = "[Required]";
        }
      });
      if (areFieldsMissing(row)) {
        invalidData.push(rowCopy);
      } else {
        validData.push(row);
      }
    });
    setCorrectData(validData);
    setIncorrectData(invalidData);

    const mappedData = validData.map((row) => {
      const mappedRow = {};
      defaultColumns.forEach(({ Header, key }) => {
        if (row[Header] !== undefined) {
          mappedRow[key] = row[Header];
        }
      });
      return mappedRow;
    });
    setMappedCorrectData(mappedData);
  }, [defaultColumns, data]);

  const handleImport = async (e) => {
    e.preventDefault();
    const backendData = transformToBackendSchema(
      schemaMapping,
      mappedCorrectData
    );
    const res = await callApi(`/private${bulkendpoint}`, "POST", backendData);
    if (res) setIsFileImported(false);
  };

  const handleExport = async (tableType) => {
    const content = tableType === "Correct Data" ? correctData : incorrectData;
    const exportDataHeaders = Object.keys(content[0]);
    const exportData = Object.values(content).map((row) => Object.values(row));
    const checkDownload = await createXLSX(exportDataHeaders, exportData);
    if (checkDownload) {
      toast.success("Data downloaded successfully!");
    } else {
      toast.error("Failed to generate Excel file.");
    }
  };

  const transformToBackendSchema = (schemaMapping, processedJSON) => {
    return processedJSON.map((data) => {
      let transformedData = {};
      Object.keys(schemaMapping).forEach((key) => {
        const mapping = schemaMapping[key];
        if (typeof mapping === "function") {
          transformedData[key] = mapping(data);
        } else if (mapping.includes(".")) {
          const keys = mapping.split(".");
          let value = data;
          for (let k of keys) {
            value = value?.[k];
          }
          transformedData[key] = value !== undefined ? value : null;
        } else {
          transformedData[key] =
            data[mapping] !== undefined ? data[mapping] : null;
        }
      });
      return transformedData;
    });
  };

  const renderTable = (tableData, tableTitle, tableType) => (
    <div className="p-1.5 w-full align-middle">
      <div className="w-full flex flex-col-reverse sm:flex-row flex-wrap gap-y-4 justify-between px-3 sm:px-6 ptpb-4 border-primary">
        <div className="w-full">
          <div className="rounded-xl border border-primary pb-4">
            <div className="p-4 rounded-xl w-full h-fit flex justify-between items-center">
              {tableType === "Correct Data" && correctData.length > 0 && (
                <div className="flex flex-col">
                  <h2 className="font-bold text-lg mb-2">{tableTitle}</h2>
                  <p className="text-secondary font-normal">
                    {correctData
                      ? `${correctData.length} rows consist correct data.`
                      : "We couldn't add these data due to invalid format or missing data."}
                  </p>
                </div>
              )}
              {tableType === "Incorrect" && incorrectData.length > 0 && (
                <div className="flex flex-col gap-2 w-full">
                  <h2 className="font-bold text-lg mb-2">{tableTitle}</h2>
                  <p className="text-secondary font-normal">
                    {incorrectData
                      ? `${incorrectData.length} rows couldn't be added.`
                      : "We couldn't add these data due to invalid format or missing data."}
                  </p>
                </div>
              )}
              {tableType === "Correct Data" && (
                <div className="w-full xl:w-fit flex flex-wrap sm:flex-nowrap justify-end gap-2 items-center">
                  <button
                    onClick={() => setIsFileImported(false)}
                    className="px-4 py-2 hover:bg-gray-50  text-primary font-medium bg-white rounded-xl border border-primary whitespace-nowrap"
                    id="button-18"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleImport}
                    className="w-[100px] sm:w-fit text-primary font-normal hover:bg-gray-50 rounded-xl border border-primary py-1.5 px-1.5 sm:px-2 sm:py-2 md:px-3 whitespace-nowrap flex gap-1 sm:gap-2"
                    id="button-19"
                  >
                    <Tooltip text="Upload" position="right-0 w-fit -top-1 whitespace-nowrap">
                      <img src={Upload} alt="Upload" />
                    </Tooltip>
                    <span className="hidden lg:block">Upload File</span>
                  </button>
                  <button
                    onClick={() => handleExport(tableType)}
                    className="w-[100px] sm:w-fit text-primary font-normal hover:bg-gray-50 rounded-xl border border-primary py-1.5 px-1.5 sm:px-2 sm:py-2 md:px-3 whitespace-nowrap flex gap-1 sm:gap-2"
                    id="button-20"
                  >
                    <Tooltip text="Download" position="right-0 w-fit -top-1 whitespace-nowrap">
                      <img src={Download} alt="Download" />
                    </Tooltip>
                    <span className="hidden lg:block">Export</span>
                  </button>
                </div>
              )}
              {tableType === "Incorrect" && (
                <div className="w-full xl:w-fit flex flex-wrap sm:flex-nowrap justify-end gap-2 items-center">
                  <Link
                    id="cancel"
                    onClick={() => setIsFileImported(false)}
                    className="px-4 py-2 hover:bg-gray-50  text-primary font-medium bg-white rounded-xl border border-primary whitespace-nowrap"
                  >
                    Cancel
                  </Link>
                  <button
                    onClick={handleExport}
                    className="w-[150px]  text-primary font-normal hover:bg-gray-50 rounded-xl border border-primary py-1.5 sm:py-2 px-2 sm:px-3 whitespace-nowrap flex gap-2"
                    id="button-21"
                  >
                    <img src={UploadImg} alt="Download" />
                    <span>Export & Fix</span>
                  </button>
                </div>
              )}
            </div>
            <div className="overflow-x-auto custom-scrollbar border-t border-primary">
              <table className="min-w-full">
                <thead className="border-b border-primary">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-2.5 text-left font-semibold text-primary"
                    >
                      Sr. No.
                    </th>
                    {defaultColumns.map(({ Header }, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="px-6 py-2.5 text-left font-semibold text-primary "
                      >
                        {Header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b border-primary">
                      <td className="px-6 py-2 text-secondary whitespace-nowrap font-medium">
                        {rowIndex + 1}
                      </td>
                      {defaultColumns.map(({ Header }, colIndex) => (
                        <td
                          key={colIndex}
                          className="px-6 py-5 text-secondary whitespace-nowrap font-medium"
                        >
                          {row[Header] !== undefined ? (
                            row[Header].length > 30 ? (
                              <Tooltip text={row[Header]}>
                                <span
                                  className={`px-2  py-2 whitespace-nowrap  w-max rounded-lg ${row[Header] === "[Required]"
                                    ? "bg-[#FEF3F2] text-[#B32318] font-bold"
                                    : "text-secondary font-medium"
                                    }`}
                                >
                                  {row[Header].substring(0, 30)}...
                                </span>
                              </Tooltip>
                            ) : (
                              <span
                                className={`px-2  py-2 whitespace-nowrap  w-max rounded-lg ${row[Header] === "[Required]"
                                  ? "bg-[#FEF3F2] text-[#B32318] font-bold"
                                  : "text-secondary font-medium"
                                  }`}
                              >
                                {row[Header]}
                              </span>
                            )
                          ) : (
                            <span
                              className={`px-2  py-2 whitespace-nowrap  w-max rounded-lg ${row[Header] === "[Required]"
                                ? "bg-[#FEF3F2] text-[#B32318] font-bold"
                                : "text-secondary font-medium"
                                }`}
                            >
                              N/A
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {tableType === "Correct Data" && correctData.length > 0 && (
              <Pagination
                currentPage={currentPageCorrect}
                totalPages={totalPagesCorrect}
                totalRecords={totalRecordsCorrect}
                itemsPerPage={itemsPerPageCorrect}
                setItemsPerPage={handleItemsPerPageChangeCorrect}
                handlePageChange={handlePageChangeCorrect}
              />
            )}

            {tableType === "Incorrect" && incorrectData.length > 0 && (
              <Pagination
                currentPage={currentPageIncorrect}
                totalPages={totalPagesIncorrect}
                totalRecords={totalRecordsIncorrect}
                itemsPerPage={itemsPerPageIncorrect}
                setItemsPerPage={handleItemsPerPageChangeIncorrect}
                handlePageChange={handlePageChangeIncorrect}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pb-52 w-full">
      {incorrectData.length > 0 &&
        renderTable(
          paginatedDataIncorrect,
          `${incorrectData.length} Data couldn't be added`,
          "Incorrect"
        )}

      {renderTable(
        paginatedDataCorrect,
        `${correctData.length} rows can be added.`,
        "Correct Data"
      )}
    </div>
  );
};

export default TwoTableComponent;
