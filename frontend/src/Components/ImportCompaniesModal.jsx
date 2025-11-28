import React, { useState } from "react";
import ExcelLogo from "../assets/images/excel-logo.png";
import PDFLogo from "../assets/images/pdf-logo.png";
import { Link } from "react-router-dom";
import UploadImg from "../assets/svgs/uploadfile.svg";
import CloseImg from "../assets/svgs/close.svg";
import TrashImg from "../assets/svgs/tabler-icon-trash.svg";
import toast from "react-hot-toast";
import useStore from "../state/store";
import createXLSX from "../utils/exportXLSX";
// import { processXlsxFile } from "../utils/processXlsxfile";
import { processXlsxFile } from "./../utils/processXlsxFile";
import { Download, X } from "lucide-react";

const ImportCompaniesModal = ({
  isImportCompanyModalOpen,
  setIsImportCompanyModalOpen,
  setSuccessImportModal,
  heading ,
  navigate,
  bulkColumns,
  sampleFileDataxlsx,
  setFileImportedData,
  setIsFileImported,
}) => {
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(false);
  const [data, setData] = useState([]);
  // const { setFileImportedData, setIsFileImported } = useStore();
  const validateHeaders = (dataArray, bulkColumns) => {
    return new Promise((resolve, reject) => {
      const dataHeaders = Object.keys(dataArray[0]);
      const missingHeaders = bulkColumns
        ?.filter((column) => column.required && !dataHeaders?.includes(column.Header))
        .map((column) => column.Header);
      // console.log("the data ", dataArray);
      console.log("missing headers are", missingHeaders);
      if (missingHeaders?.length > 0) {
        const missingHeadersString = missingHeaders.join(", ");
        toast.error(`Missing required Colums in Excel Sheet: ${missingHeadersString}`);
        setError(`Missing required Colums in Excel Sheet: ${missingHeadersString}`);
        return false;
      } else {
        resolve("Validation Passed! Proceeding...");
      }
    });
  };

  const handleFileChange = async (e) => {
    const fileInput = e.target;
    const file = e.target.files[0];

    if (!file) {
      setError("No file selected");
      setSelectedFile(null);
      return;
    }

    fileInput.value = "";

    if (!file.name.endsWith(".xlsx")) {
      setError("Only .xlsx files are allowed");
      setSelectedFile(null);
      return;
    }

    const sizeInKB = file.size / 1024;
    const sizeWithUnit = sizeInKB < 1024 ? `${sizeInKB.toFixed(2)} KB` : `${(sizeInKB / 1024).toFixed(2)} MB`;

    try {
      const processedJSONData = await processXlsxFile(file);
      const isValid = await validateHeaders(processedJSONData, bulkColumns);
      if (isValid) {
        toast.success(isValid);
        setData(processedJSONData);
      }
    } catch (error) {
      console.error("Error:", error); // Log the exact error
      toast.error("Data in your xlsx is Invalid.");
      setError("Please make sure the data in xlsx file is in correct format and a valid xlsx.");
      return;
    }

    setSelectedFile({
      name: file.name,
      size: sizeWithUnit,
      preview: URL.createObjectURL(file),
    });

    setError(null);
  };

  function handleFileImport(e) {
    e.preventDefault();
    setFileImportedData(data);
    setIsFileImported(true);
    setSelectedFile("");
  }

  async function handleSampleXlsx(e) {
    e.preventDefault();
    const { SampleHeaders, SampleContent } = sampleFileDataxlsx();
    const checkDownload = await createXLSX(SampleHeaders, SampleContent);
    if (checkDownload) {
      toast.success("Sample XlSX downloaded successfully!");
    } else {
      toast.error("Failed to Download Excel file.");
    }
    setSelectedFile("");
  }
  if (!isImportCompanyModalOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity"
          onClick={() => setIsImportCompanyModalOpen(false)}
        ></div>
        <div className="flex items-start py-5 justify-center w-full min-h-screen px-4 text-center lg:absolute lg:top-[12%]" >
          <div className="bg-main rounded-2xl text-left overflow-hidden shadow-xl transform transition-all w-[95%] sm:w-[80%] md:w-[75%] lg:w-[70%] xl:w-[664px] 2xl:w-[664px] px-6 2xl:px-8 py-10">
            <div className="w-full flex justify-between items-center">
              <span className="text-primary font-semibold text-xl">Bulk Invite {heading}</span>
              <button
                onClick={() => {
                  setIsImportCompanyModalOpen(false);
                  setSelectedFile("");
                }}
                className="p-1.5 rounded-xl hover:bg-hover"
                id="button-62"
              >
                <X />
              </button>
            </div>

            <div className="w-full mt-8">
              <div className="w-full flex flex-col gap-y-2 ">
                <label className="w-full text-primary">Upload File</label>
                <div className="w-full flex gap-3 items-center justify-between">
                  <button
                    type="button"
                    onClick={handleSampleXlsx}
                    className="w-full flex gap-1.5 sm:gap-2 items-center justify-center py-2.5 rounded-xl border border-primary"
                    id="button-63"
                  >
                    <span>
                      {/* <img src={UploadImg} alt="" /> */}
                      <Download />

                    </span>
                    <span className="whitespace-nowrap text-primary text-sm sm:text-base">Sample XLSX File</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedFile("");
                    }}
                    className="w-full flex gap-1.5 sm:gap-2 items-center justify-center py-2.5 rounded-xl border border-primary text-primary"
                    id="button-64"
                  >
                    <span>
                      {/* <img src={UploadImg} alt="" /> */}
                      <Download />
                    </span>
                    <span className="whitespace-nowrap text-primary text-sm sm:text-base">Sample CSV Sheet</span>
                  </button>
                </div>
              </div>

              {selectedFile && (
                <>
                  <div className="w-full mt-5">
                    <label className="w-full text-primary mb-2">Attach File</label>
                    <div className="w-full mt-1 rounded-xl border border-primary py-2.5 flex justify-between items-center gap-2 px-4">
                      <div className="flex gap-2 items-center font-normal">
                        {selectedFile && selectedFile.name.endsWith(".pdf") ? (
                          <img src={PDFLogo} alt="PDFLogo" />
                        ) : (
                          <img src={ExcelLogo} alt="ExcelLogo" />
                        )}
                        <span className="flex flex-col">
                          <span className="text-primary text-base">{selectedFile.name}</span>
                          <span className="text-sm text-secondary">{selectedFile.size}</span>
                        </span>
                      </div>

                      <div className="flex gap-0.5 items-center">
                        <button className="p-2 rounded-xl hover:bg-hover" id="button-65">
                          <img
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedFile("");
                            }}
                            src={TrashImg}
                            alt=""
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
              <div className="mt-2">
                <header className="bg-main py-12 flex flex-col justify-center rounded-xl items-center border-dashed border border-primary cursor-pointer">
                
                  <>
                    <input
                      id="hidden-input"
                      type="file"
                      className="hidden"
                      accept=".xlsx, .pdf"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="hidden-input"
                      className="flex flex-col items-center cursor-pointer text-center space-y-2"
                    >
                      <p className="block text-base text-lg text-primary">Choose a file or drag and drop to upload!</p>
                      <p className="text-lg text-primary leading-relaxed max-w-lg">
                        If your .xlsx contains a date, ensure it is formatted as:
                        <br />
                        <span className="text-sm">DD/MM/YYYY HH:MM:SS AM/PM (eg: 06-02-2025 09:30:00 AM)</span>
                      </p>
                      <span className="text-sm text-secondary">Accepted file types: .xlsx, .csv</span>
                    </label>
                  </>
                </header>
                {selectedFile && <p className="text-base text-primary mt-1">File uploaded successfully.</p>}

                <p className="mt-2 text-red-400 font-medium">{error}</p>
              </div>
              <div className="w-full mt-6 flex flex-col gap-y-6 justify-center">
                {navigate ? (
                  <Link
                    id="continue"
                    onClick={() => {
                      setIsImportCompanyModalOpen(false);
                      setSuccessImportModal(true);
                      handleFileImport(e);
                    }}
                    className={`w-full text-center text-primary text-lg py-2 rounded-xl bg-primary transition duration-300 ease-in-out shadow-sm ${
                      !selectedFile ? "bg-[#C7D7FE]" : "bg-primary hover:bg-primarydark"
                    }`}
                    disabled={!selectedFile}
                    style={!selectedFile ? { cursor: "not-allowed" } : {}}
                  >
                    Continue
                  </Link>
                ) : (
                  <button
                    onClick={(e) => {
                      {
                        setIsImportCompanyModalOpen(false);
                        setSuccessImportModal(true);
                        handleFileImport(e);
                      }
                    }}
                    className={`w-full text-center text-primary text-lg py-2 rounded-xl bg-primary transition duration-300 ease-in-out shadow-sm ${
                      !selectedFile ? "bg-[#C7D7FE]" : "bg-primary hover:bg-primarydark"
                    }`}
                    disabled={!selectedFile}
                    style={!selectedFile ? { cursor: "not-allowed" } : {}}
                    id="button-66"
                  >
                    Continue
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportCompaniesModal;
