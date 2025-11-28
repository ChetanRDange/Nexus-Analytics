import React, {
  memo,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DeleteConfirm from "../pages/DeleteConfirm";
import Pagination from "./Pagination";
// import Eye from "../assets/svgs/eye.svg";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Sort from "../assets/svgs/sort.svg";
import useFetch from "../hooks/useFetch";
import useMutation from "../hooks/useMutation";
import useStore from "../state/store";
import Search from "./Search";
import createXLSX from "../utils/exportXLSX";
import { printRecords, printRecordsCustom } from "../utils/printRecords";
import ImportCompaniesModal from "./ImportCompaniesModal";
import InvitationSuccessModal from "./InvitationSuccessModal";
import NewFilter from "./NewFilter";
import SortableMultiselectDrop from "./SortableMultiSelectDrop";
import { Tooltip } from "./ToolTip";
import FilterGroup from "./AdvanceFilter";
import {
  Copy,
  Download,
  EllipsisVertical,
  Expand,
  Eye,
  Pencil,
  Printer,
  Shrink,
  Sparkles,
  Trash2,
  Upload,
} from "lucide-react";
import TransferOwnershipModal from "./TransferOwnershipModal";
import { GlobalContext } from "../App";
import { useAuth } from "../AuthContext";

const stripHtmlTags = (html) => {
  if (!html || typeof html !== "string") return html;
  return html.replace(/<[^>]*>/g, "");
};

const NewTable = ({
  columns,
  actions = [],
  selectable = true,
  tableMetaData,
  triggerRefetch = false,
  setTriggerRefetch = () => {},
  bulkColumns,
  sampleFileDataxlsx,
  setIsFileImported,
  setFileImportedData,
  showViewAction = true,
  showEditAction = true,
  showCopyAction = false,
  showDeleteAction = true,
  passName = false,
  showMagicLogAction = false,
  preselectedStatus,
  preSelectedType,
  tableFilters = [],
  preFilters = {},
  printTableData,
}) => {
  const { fullScreen, setFullScreen } = useContext(GlobalContext);
  const { zoomValue } = useStore();
  const { theme } = useAuth();

  const iconSize = useMemo(() => {
    return zoomValue === 85 ? 12 : 20;
  }, [zoomValue]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const [selectedRows, setSelectedRows] = useState(new Set());

  const [isInviteSentModalOpen, setIsInviteSentModalOpen] = useState(false);
  const [reFetch, setRefetch] = useState(false);
  const [deleteIds, setDeleteIds] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectAllMode, setSelectAllMode] = useState(false);
  const [sortColumn, setSortColumn] = useState(
    tableMetaData?.sort?.sortBy || "updatedAt"
  );
  const [deleteMesasge, setDeleteMessage] = useState("");
  const [sortDirection, setSortDirection] = useState(
    tableMetaData?.sort?.order || "desc"
  );
  const [isOwnershipModalOpen, setIsOwnershipModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isImportCompanyModalOpen, setIsImportCompanyModalOpen] =
    useState(false);

  const [successImportModal, setSuccessImportModal] = useState(false);
  const [columnList, setColumnList] = useState([]);
  const [isPreferencesLoaded, setIsPreferencesLoaded] = useState(false);

  const [filter, setFilter] = useState({ ...preFilters });

  const [searchparams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const filterParam = searchparams.get("filter");
    if (filterParam) {
      setFilter({
        ...filter,
        ...JSON.parse(filterParam),
      });
    }
  }, [searchparams.get("filter")]);

  const {
    data,
    loading,
    callApi: refetch,
  } = useFetch(
    `${
      tableMetaData.endpoint
    }?n=${itemsPerPage}&p=${currentPage}&filter=${JSON.stringify(
      filter
    )}&search=${searchTerm}&sortBy=${sortColumn}&order=${sortDirection}`
  );

  useEffect(() => {
    refetch();
  }, [theme]);

  const { callApi } = useMutation();

  const fetchColumnPreferences = async () => {
    try {
      const data = await callApi(
        `/protect/column/${tableMetaData.tableName}`,
        "GET"
      );

      if (data?.data) {
        const orderedColumns = data.data.order
          .map((colId) => columns.find((col) => col.id === colId))
          .filter(Boolean);

        const remainingColumns = columns.filter(
          (col) => !data.data.order.includes(col.id)
        );

        setColumnList(
          [...orderedColumns, ...remainingColumns].map((col) => ({
            ...col,
            isSelected: data.data.columns.includes(col.id),
          }))
        );
      } else {
        setColumnList(columns.map((col) => ({ ...col, isSelected: true })));
      }
      setIsPreferencesLoaded(true);
    } catch (error) {
      console.error("Error fetching column preferences:", error);
      setColumnList(columns.map((col) => ({ ...col, isSelected: true })));
      setIsPreferencesLoaded(true);
    }
  };

  const saveColumnPreferences = async (newColumnList) => {
    const payload = {
      tableName: tableMetaData.tableName,
      columns: newColumnList
        .filter((col) => col.isSelected)
        .map((col) => col.id),
      order: newColumnList.map((col) => col.id),
      itemsPerPage,
    };

    await callApi("/protect/column", "POST", payload);
  };

  useEffect(() => {
    if (tableMetaData.tableName && !isPreferencesLoaded) {
      fetchColumnPreferences();
    }
  }, [tableMetaData.tableName]);

  const handleMagicLogin = async (row) => {
    const res = await callApi(`/private/magicLogin/${row._id}`, "GET");
    if (res?.data) {
      if (res?.data.token) {
        const a = document.createElement("a");
        a.href = `${import.meta.env.VITE_ORG_FRONTEND_URL}?magic_token=Bearer ${
          res.token
        }`;
        a.target = "_blank";
        a.click();
        document.body.removeChild(a);
      }
    }
  };

  const tableRef = useRef(null);
  const navigate = useNavigate();

  const { setSelectedCategory, selectedCategory, setCurrentSelectedCategory } =
    useStore();

  useEffect(() => {
    if (preselectedStatus) {
      setShowStatusFilter(true);
    }
  }, [preselectedStatus]);

  useEffect(() => {
    if (preSelectedType) {
      setShowTypeFilter(true);
    }
  }, [preSelectedType]);

  const handleSort = (columnKey) => {
    if (sortColumn === columnKey) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= Math.ceil(data?.count / itemsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const handleRowSelect = (id) => {
    if (selectAllMode) {
      setSelectAllMode((prev) => !prev);
    }
    setSelectedRows((prev) => {
      const updatedSelectedRows = new Set(prev);
      if (updatedSelectedRows.has(id)) {
        updatedSelectedRows.delete(id);
      } else {
        updatedSelectedRows.add(id);
      }
      return updatedSelectedRows;
    });
  };

  const handleSelectAll = () => {
    if (selectAllMode) {
      setSelectAllMode((prev) => !prev);
    }
    setSelectedRows((prev) => {
      if (prev.size === data?.data?.length) {
        return new Set();
      } else {
        const allRowIds = data?.data?.map((row) => row._id);
        return new Set(allRowIds);
      }
    });
  };

  const selectAllData = () => {
    if (selectAllMode) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(data?.data?.map((row) => row._id)));
    }

    setSelectAllMode((prev) => !prev);
  };

  const handleEdit = (row) => {
    if (passName) {
      navigate(`/${tableMetaData.editPath}/${row[passName]}`);
    } else {
      navigate(`/${tableMetaData.editPath}/${row._id}`);
    }
  };

  const handleCopy = (row) => {
    navigate(`/${tableMetaData.copyPath}/${row._id}`);
  };

  const handleView = (row) => {
    if (passName) {
      navigate(`/${tableMetaData.viewPath}/${row[passName]}`);
    } else {
      navigate(`/${tableMetaData.viewPath}/${row._id}`);
    }
  };

  const handleDelete = (row = "") => {
    setIsInviteSentModalOpen(true);
    if (selectAllMode) {
      setDeleteIds("selectAll");
      setDeleteMessage(`${data?.count} ${tableMetaData.model}`);
    } else if (selectedRows.size > 0) {
      const updatedDeleteIds =
        selectedRows.size > 0 ? [...selectedRows] : [row._id];
      setDeleteIds(updatedDeleteIds);
      setDeleteMessage(`${selectedRows.size} ${tableMetaData.model}`);
    } else {
      const firstVisibleColumn = columnList.find((col) => col.isSelected);
      let firstColumnValue = "Selected Item";
      if (firstVisibleColumn?.accessor) {
        const accessorKey = firstVisibleColumn.accessor.split(".")[0];
        const value = row[accessorKey];
        if (typeof value === "string") {
          firstColumnValue = value;
        } else if (value && typeof value === "object") {
          firstColumnValue = value.companyName || "Selected Item";
        }
      }
      setDeleteIds(row._id);
      setDeleteMessage(firstColumnValue);
    }
  };
  const handleScreen = () => {
    setFullScreen((prev) => !prev);
  };

  const confirmDelete = async (e) => {
    e.preventDefault();
    const res = await callApi(`${tableMetaData.endpoint}`, "DELETE", {
      ids: deleteIds,
    });
    if (res) {
      refetch();
      setRefetch(true);
      setSelectedRows(new Set());
      setIsInviteSentModalOpen(false);
    }
  };

  function handleFilterClear(e) {
    e.preventDefault();
    setShowStatusFilter(false);
    setShowTypeFilter(false);
    setShowRoleFilter(false);
    setSelectedCategory(null);
    setCurrentSelectedCategory(null);
    setSearchTerm("");
    setStatusSearch("");
    setTypeSearch("");
  }

  const downloadExcel = async () => {
    let selectedData;
    if (selectAllMode) {
      try {
        const uri = `${import.meta.env.VITE_API_URL}/api/admin${
          tableMetaData.endpoint
        }`;
        const res = await fetch(uri, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error(
            `Something went wromg, Please try again Later. ${res.statusText}`
          );
        }
        const allData = await res.json();
        selectedData = allData.data || [];
        setSelectedRows(new Set());
        setSelectAllMode((prev) => !prev);
      } catch (error) {
        toast.error(error.message);
        return;
      }
    } else {
      selectedData = data?.data?.filter((row) => selectedRows.has(row._id));
    }

    if (selectedData.length === 0) {
      toast.error("No rows selected for download.");
      return;
    }

    const headers = columns.map((col) => col.Header);

    const content = selectedData.map((row) =>
      columns.map((column) => {
        const value = column.accessor
          .split(".")
          .reduce(
            (obj, key) => (obj && obj[key] !== undefined ? obj[key] : null),
            row
          );

        if (value === null || value === undefined) return "N/A";
        if (Array.isArray(value)) {
          if (value.length === 0) return "[]";
          return value
            .map((item) => {
              if (typeof item === "object" && item !== null) {
                if (item.code && item.number)
                  return `${item.code} ${item.number}`;
                return JSON.stringify(item);
              }
              return item;
            })
            .join(", ");
        }
        if (typeof value === "object") {
          if (value.code && value.number) {
            return `${value.code} ${value.number}`;
          }
          return Object.keys(value)[0] || "N/A";
        }
        return value;
      })
    );

    const checkDownload = await createXLSX(headers, content);
    if (checkDownload) {
      toast.success("Data downloaded successfully!");
    } else {
      toast.error("Failed to generate Excel file.");
    }
  };

  const handlePrint = () => {
    if (printTableData && printTableData.length > 0) {
      const tempTable = document.createElement("table");
      tempTable.className = "print-table";

      const thead = document.createElement("thead");
      const headerRow = document.createElement("tr");
      printTableData?.forEach((col) => {
        const th = document.createElement("th");
        th.textContent = col.Header;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      tempTable.appendChild(thead);

      const tbody = document.createElement("tbody");
      data?.data?.forEach((row) => {
        const tr = document.createElement("tr");
        printTableData?.forEach((col) => {
          const td = document.createElement("td");
          const value = col.accessor
            .split(".")
            .reduce(
              (obj, key) => (obj && obj[key] !== undefined ? obj[key] : null),
              row
            );
          td.textContent = col.render ? col.render(value, row) : value || "-";
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
      tempTable.appendChild(tbody);

      printRecordsCustom(tempTable.outerHTML, tableMetaData.model);
    } else if (tableRef.current) {
      const tableHTML = tableRef.current.outerHTML;
      printRecords(tableHTML, tableMetaData.model);
    }
  };

  useEffect(() => {
    return () => {
      setRefetch(false);
      setTriggerRefetch(false);
    };
  }, [currentPage, itemsPerPage, reFetch, triggerRefetch]);

  const [showAdvanceFilter, setShowAdvanceFilter] = useState(false);

  const [conditions, setConditions] = useState([
    { field: "", operator: "is", value: "" },
  ]);

  const [logicalOperator, setLogicalOperator] = useState("and");

  const handleClearFilters = () => {
    setConditions([{ field: "", operator: "is", value: "" }]);
    setLogicalOperator("and");
    setShowAdvanceFilter(false);
  };

  const handleColumnReorder = (newColumnList) => {
    setColumnList(newColumnList);
    saveColumnPreferences(newColumnList);
  };

  return (
    <div className="pb-20">
      <ImportCompaniesModal
        bulkColumns={bulkColumns}
        isImportCompanyModalOpen={isImportCompanyModalOpen}
        setIsImportCompanyModalOpen={setIsImportCompanyModalOpen}
        heading={`${tableMetaData.model} `}
        successImportModal={successImportModal}
        setIsFileImported={setIsFileImported}
        setFileImportedData={setFileImportedData}
        setSuccessImportModal={setSuccessImportModal}
        sampleFileDataxlsx={sampleFileDataxlsx}
      />
      <InvitationSuccessModal
        isInviteSuccessModalOpen={successImportModal}
        setIsInviteSuccessModalOpen={setSuccessImportModal}
        title={`Badges Added Successfully!`}
        para="200 documents have been add."
      />
      {showAdvanceFilter && (
        <div className="border p-4 rounded bg-main shadow-md">
          <FilterGroup
            columns={columns}
            conditions={conditions}
            setConditions={setConditions}
            logicalOperator={logicalOperator}
            setLogicalOperator={setLogicalOperator}
            // applyFilters={handleApplyFilters}
            setIsOpenCategories={setIsOpenCategories}
            removeGroup={() => {
              setShowAdvanceFilter(false);
            }}
            showAdvanceFilter={showAdvanceFilter}
            setShowAdvanceFilter={setShowAdvanceFilter}
            isMainFilterGroup={true}
            handleClearFilters={handleClearFilters} // Pass clear function
          />
        </div>
      )}

      <div className="my-2 rounded-xl border border-primary">
        <div className="w-full flex flex-wrap gap-y-1 justify-end sm:justify-between px-3 sm:px-3 ptpb-2.5 mt-2 border-b border-primary">
          <div className="flex gap-2 flex-wrap justify-start mb-2">
            <div className="px-2 rounded-xl border border-primary flex gap-2 items-center h-[35px]">
              <Search onSearch={(query) => setSearchTerm(query)} />
            </div>
            {tableFilters.length > 0 && (
              <NewFilter
                tableFilters={tableFilters}
                filter={filter}
                setFilter={setFilter}
              />
            )}
          </div>
          <div
            className={`w-fit flex flex-wrap justify-end gap-2 items-center mb-2`}
          >
            {selectedCategory && (
              <button
                className="hidden sm:block px-2 py-1 rounded-lg text-secondary hover:text-blue"
                onClick={handleFilterClear}
                id="button-74"
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => handleScreen()}
              className="hidden sm:flex w-auto sm:w-fit text-primary font-normal hover:bg-hover items-center rounded-xl border border-primary py-1 px-1.5 sm:px-2 sm:py-1 h-[35px] md:px-3 whitespace-nowrap gap-1 sm:gap-2"
              id="button-75"
            >
              {!fullScreen ? (
                <>
                  <Tooltip
                    text="Full Screen"
                    position="right-0 w-fit -top-0 whitespace-nowrap"
                  >
                    <Expand size={18} />
                  </Tooltip>
                  {/* <span className="hidden lg:block">Full Screen</span> */}
                </>
              ) : (
                <>
                  <Tooltip
                    text="Exit Full Screen"
                    position="right-0 w-fit -top-1 whitespace-nowrap"
                  >
                    <Shrink size={18} />
                  </Tooltip>
                  {/* <span className="hidden lg:block">Exit Full Screen</span> */}
                </>
              )}
            </button>

            {tableMetaData.showDeleteAll && selectedRows.size >= 2 && (
              <button
                onClick={() => handleDelete()}
                className="w-[100px] sm:w-fit text-primary font-normal hover:bg-hover rounded-xl border border-primary py-1.5 px-1.5 sm:px-2 sm:py-2 md:px-3 whitespace-nowrap flex gap-1 sm:gap-2 items-center"
                id="button-75"
              >
                <Tooltip
                  text="Delete"
                  position="right-0 w-fit -top-0 whitespace-nowrap"
                >
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Trash2 size={18} />
                    <span className="hidden lg:block">Delete</span>
                  </div>
                </Tooltip>
              </button>
            )}

            <button
              className="sm:flex w-auto sm:w-fit text-primary items-center font-normal hover:bg-hover rounded-xl border border-primary py-1 px-1.5 sm:px-2 sm:py-1.5 h-[35px] md:px-3 whitespace-nowrap flex gap-1 sm:gap-2"
              onClick={handlePrint}
              id="button-76"
            >
              <Tooltip
                text="Print"
                position="right-0 w-fit -top-0 whitespace-nowrap"
              >
                <div className="flex items-center gap-1 sm:gap-2">
                  <Printer size={18} />
                  <span className="hidden lg:block">Print</span>
                </div>
              </Tooltip>
            </button>

            {tableMetaData.bulkImport && (
              <button
                onClick={() => setIsImportCompanyModalOpen(true)}
                className="sm:w-fit text-primary font-normal hover:bg-hover rounded-xl border border-primary py-1 px-1.5 sm:px-2 sm:py-1.5 h-[35px] items-center md:px-3 whitespace-nowrap flex gap-1 sm:gap-2"
                id="button-77"
              >
                <Tooltip
                  text="Import"
                  position="right-0 w-fit -top-0 whitespace-nowrap"
                >
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Upload size={18} />
                    <span className="hidden lg:block">Import</span>
                  </div>
                </Tooltip>
              </button>
            )}

            {selectedRows.size > 0 && (
              <button
                onClick={downloadExcel}
                className="w-[100px] sm:w-fit text-primary font-normal hover:bg-hover rounded-xl border border-primary py-1 px-1.5 sm:px-2 sm:py-1.5 h-[35px] items-center md:px-3 whitespace-nowrap flex gap-1 sm:gap-2"
                id="button-78"
              >
                <Tooltip
                  text="Export"
                  position="right-0 w-fit -top-0 whitespace-nowrap"
                >
                  <Download size={18} />
                </Tooltip>
                <span className="hidden lg:block">Export</span>
              </button>
            )}

            <SortableMultiselectDrop
              columns={columnList}
              setColumns={handleColumnReorder}
              tableName={tableMetaData.tableName}
            />
          </div>
        </div>

        {selectedRows.size > 0 && (
          <div className="w-full pt-4 pb-4 text-center bg-main border-b border-primary px-2">
            <p className="text-secondary">
              {selectAllMode ? data?.count : selectedRows.size} record from this
              page is selected
              <Link
                id="link-1"
                onClick={selectAllData}
                className="text-blue pl-2"
              >
                {selectAllMode ? "Unselect all" : "Select all"} {data?.count}{" "}
                records from this table
              </Link>
            </p>
          </div>
        )}

        {loading ? (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="min-w-full">
              <thead className="border-b border-primary">
                <tr>
                  {selectable && (
                    <th scope="col" className="px-4 py-2.5 text-left">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-primary cursor-pointer"
                        aria-label="Select All"
                      />
                    </th>
                  )}

                  {columns.map((column, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-6 py-2.5 text-left font-semibold text-primary"
                    >
                      {column.Header}
                    </th>
                  ))}
                  {actions.length > 0 && (
                    <th
                      scope="col"
                      className="px-2 py-2.5 text-left font-semibold text-primary sticky right-0 bg-main shadow-l"
                    >
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {[...Array(itemsPerPage)].map((_, index) => (
                  <tr key={index} className="border-b border-primary ">
                    {selectable && (
                      <td className="px-4 py-2">
                        <Skeleton width={24} height={24} />
                      </td>
                    )}
                    {columns.map((column, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-6 py-2 text-secondary whitespace-nowrap font-medium"
                      >
                        <Skeleton width={120} height={20} />
                      </td>
                    ))}

                    <td>
                      <Skeleton width={100} height={30} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto custom-scrollbar">
            {data?.data?.length === 0 ? (
              <div className="text-center py-6 text-xl font-semibold text-gray-400">
                No {tableMetaData.model} Data Found
              </div>
            ) : (
              <table className="min-w-full" ref={tableRef}>
                <thead className="border-b border-primary">
                  <tr>
                    {selectable && (
                      <th scope="col" className="px-4 py-1 text-left">
                        <div className="inline-flex items-center">
                          <label className="flex items-center cursor-pointer relative">
                            <input
                              type="checkbox"
                              checked={
                                selectedRows.size > 0 &&
                                selectedRows.size === data?.data?.length
                              }
                              className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-primary checked:border-0"
                              id="check"
                              onChange={handleSelectAll}
                            />
                            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="1"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                            </span>
                          </label>
                        </div>
                      </th>
                    )}

                    <th
                      scope="col"
                      className="px-4 py-1 text-left font-semibold text-primary "
                    >
                      #{" "}
                    </th>

                    {columnList
                      .filter((col) => col.isSelected)
                      ?.map((column, index) => (
                        <th
                          key={index}
                          scope="col"
                          className="px-6 py-1 text-left font-semibold text-primary"
                        >
                          <div className="flex items-center gap-2">
                            <span className="whitespace-nowrap flex gap-2 items-center">
                              {column.Header}
                              {column.accessor === "admins" ? (
                                ""
                              ) : (
                                <img
                                  src={Sort}
                                  alt="Sort"
                                  className="w-4 h-4 cursor-pointer"
                                  onClick={() => handleSort(column.accessor)}
                                />
                              )}
                            </span>
                          </div>
                        </th>
                      ))}

                    <th
                      scope="col"
                      className="px-2 py-2.5 text-left font-semibold text-primary sticky right-0 bg-main shadow-l"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data ? (
                    data?.data.map((row, index) => {
                      const isSelected = selectedRows.has(row._id);
                      const srNo = index + 1 + (currentPage - 1) * itemsPerPage;

                      const defaultActions = [
                        showViewAction && {
                          label: "View",
                          onClick: () => handleView(row),
                          icon: <Eye size={20} />,
                        },
                        showEditAction && {
                          label: "Edit",
                          onClick: () => handleEdit(row),
                          icon: <Pencil size={18} />,
                        },
                        showCopyAction && {
                          label: "Copy",
                          onClick: () => handleCopy(row),
                          icon: <Copy size={18} />,
                        },
                        showMagicLogAction && {
                          label: "Magic Login",
                          onClick: () => handleMagicLogin(row),
                          icon: <Sparkles size={18} />,
                        },
                        showDeleteAction && {
                          label: "Delete",
                          onClick: () => handleDelete(row),
                          color: "red",
                          icon: <Trash2 color="red" size={18} />,
                        },
                      ].filter(Boolean);

                      const combinedActions = [
                        ...defaultActions,
                        ...actions.filter(
                          ({ condition }) => condition && condition(row)
                        ),
                      ];

                      return (
                        <tr
                          key={row._id}
                          className={`border-b h-full border-primary ${
                            isSelected ? "bg-main" : "hover:bg-hover"
                          }`}
                        >
                          {selectable && (
                            <td className="px-4 py-1">
                              <label className="flex items-center cursor-pointer relative">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-primary checked:border-0"
                                  id="check"
                                  onChange={() => handleRowSelect(row._id)}
                                />
                                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3.5 w-3.5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    stroke="currentColor"
                                    stroke-width="1"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clip-rule="evenodd"
                                    ></path>
                                  </svg>
                                </span>
                              </label>
                            </td>
                          )}
                          <td className="px-4 py-1 text-secondary font-medium">
                            {srNo}
                          </td>
                          {columnList
                            .filter((col) => col.isSelected)
                            .map((column, colIndex) => {
                              const value = column.accessor
                                .split(".")
                                .reduce(
                                  (obj, key) =>
                                    obj && obj[key] !== undefined
                                      ? obj[key]
                                      : "N/A",
                                  row
                                );

                              const processedValue =
                                column.accessor === "content"
                                  ? stripHtmlTags(value)
                                  : value;

                              const truncatedValue =
                                typeof processedValue === "string" &&
                                processedValue?.length > 25
                                  ? processedValue?.slice(0, 25) + "..."
                                  : processedValue;

                              return (
                                <td
                                  key={colIndex}
                                  className="px-6 py-1 text-secondary whitespace-nowrap font-medium relative"
                                >
                                  {column.render ? (
                                    String(processedValue)?.startsWith(
                                      "https://"
                                    ) ? (
                                      column.render(processedValue, row)
                                    ) : processedValue?.length > 25 ? (
                                      <Tooltip text={processedValue} >
                                        {truncatedValue}
                                      </Tooltip>
                                    ) : (
                                      column.render(processedValue, row)
                                    )
                                  ) : processedValue?.length > 25 ? (
                                    <Tooltip text={processedValue}>
                                      {truncatedValue}
                                    </Tooltip>
                                  ) : (
                                    truncatedValue
                                  )}
                                </td>
                              );
                            })}

                          {combinedActions.length > 3 ? (
                            <td className="text-center sticky right-0 bg-main px-2 flex gap-2">
                              {combinedActions
                                .slice(0, 2)
                                .map(
                                  ({ label, onClick, icon, color }, index) => (
                                    <div key={index}>
                                      <button
                                        className={`w-full flex gap-2 items-center px-2 py-1 text-sm ${
                                          color
                                            ? "text-red-500"
                                            : "text-primary"
                                        } hover:bg-hover`}
                                        onClick={(e) => {
                                          if (label === "Transfer Ownership") {
                                            setSelectedRow(row);
                                            setIsOwnershipModalOpen(true);
                                          } else {
                                            onClick(e, row);
                                          }
                                          setIsOpen(false);
                                        }}
                                        id={`button-${index}`}
                                      >
                                        <Tooltip
                                          text={label}
                                          position="right-0 w-fit -top-1 whitespace-nowrap"
                                        >
                                          {icon && <span>{icon}</span>}
                                        </Tooltip>
                                      </button>
                                    </div>
                                  )
                                )}
                              <DropdownActions
                                row={row}
                                actions={combinedActions.slice(2)}
                                setIsOwnershipModalOpen={
                                  setIsOwnershipModalOpen
                                }
                                setSelectedRow={setSelectedRow}
                                iconSize={iconSize}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                              />
                            </td>
                          ) : (
                            <td className="text-center sticky right-0 bg-main px-2 flex gap-2">
                              {combinedActions.map(
                                ({ label, onClick, icon, color }, index) => (
                                  <div key={index}>
                                    <button
                                      className={`w-full flex gap-2 items-center px-2 py-1 text-sm ${
                                        color ? "text-red-500" : "text-primary"
                                      } hover:bg-hover`}
                                      onClick={(e) => {
                                        if (label === "Transfer Ownership") {
                                          setSelectedRow(row);
                                          setIsOwnershipModalOpen(true);
                                        } else {
                                          onClick(e, row);
                                        }
                                        setIsOpen(false);
                                      }}
                                      id={`button-${index}`}
                                    >
                                      <Tooltip
                                        text={label}
                                        position="right-0 w-fit -top-1 whitespace-nowrap"
                                      >
                                        {icon && <span>{icon}</span>}
                                      </Tooltip>
                                    </button>
                                  </div>
                                )
                              )}
                            </td>
                          )}
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={13}
                        className="text-left px-4 md:px md:text-center py-8"
                      >
                        <span className="text-center">Not working</span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={data?.count ? Math.ceil(data.count / itemsPerPage) : 1}
          totalRecords={data?.count ? data.count : 0}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={handleItemsPerPageChange}
          handlePageChange={handlePageChange}
        />

        <DeleteConfirm
          isInviteSentModalOpen={isInviteSentModalOpen}
          setIsInviteSentModalOpen={setIsInviteSentModalOpen}
          handleDeleteUser={confirmDelete}
          name={deleteMesasge}
        />

        <TransferOwnershipModal
          isOwnershipModalOpen={isOwnershipModalOpen}
          setIsOwnershipModalOpen={setIsOwnershipModalOpen}
          label="Transfer Ownership"
          para="Are you sure you want to transfer ownership to another admin?"
          para2="This action cannot be undone."
          button1="Cancel"
          button2="Transfer"
          row={selectedRow}
        />
      </div>
    </div>
  );
};

export default memo(NewTable);

const DropdownActions = ({
  row,
  actions = [],
  setIsOwnershipModalOpen,
  setSelectedRow,
  iconSize,
  isOpen,
  setIsOpen,
}) => {
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, [isOpen]);

  const handleToggle = (e) => {
    e.preventDefault();
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const menuHeight = actions.length * 40; // Approximate height per item
      const spaceBelow = window.innerHeight - rect.bottom;

      // Calculate if there's enough space below
      const showAbove = spaceBelow < menuHeight;

      // Position calculation
      const top = showAbove
        ? rect.top + window.scrollY - menuHeight - 5
        : rect.bottom + window.scrollY + 5;

      // Ensure menu stays within viewport
      const adjustedTop = Math.max(
        5,
        Math.min(top, window.innerHeight - menuHeight - 5)
      );

      setMenuPosition({
        top: adjustedTop,
        left: rect.left - 112,
      });
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="relative inline-block text-left" ref={buttonRef}>
        <button
          onClick={handleToggle}
          className="cursor-pointer p-1.5 rounded-xl bg-main focus:outline-none mx-auto"
          id="button-80"
        >
          <EllipsisVertical size={iconSize} />
        </button>
      </div>

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            className="fixed z-[9999] border border-blue rounded-xl overflow-hidden bg-white shadow-lg "
            style={{
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
            }}
          >
            <ul className="w-32 rounded-md bg-main overflow-hidden">
              {actions.map(({ label, onClick, icon, color }, index) => (
                <li key={index}>
                  <button
                    className={`w-full flex gap-2 items-center px-3 py-2 text-sm ${
                      color ? "text-red-500" : "text-primary"
                    } hover:bg-hover`}
                    onClick={(e) => {
                      if (label === "Transfer Ownership") {
                        setSelectedRow(row);
                        setIsOwnershipModalOpen(true);
                      } else {
                        onClick(e, row);
                      }
                      setIsOpen(false);
                    }}
                    id={`button-${index}`}
                  >
                    {icon && <span>{icon}</span>}
                    <span className="whitespace-norwrap">{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>,
          document.body
        )}
    </>
  );
};
