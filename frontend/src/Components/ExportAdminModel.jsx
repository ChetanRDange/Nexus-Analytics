import { useState } from "react";

const ExportAdminModal = ({ isExportModelOpen, setIsExportModelOpen }) => {
  const [exportOptions, setExportOptions] = useState({
    records: "current",
    data: "all",
    columns: "visible",
    format: "xlsx",
  });

  const handleChange = (category, value) => {
    setExportOptions((prev) => ({ ...prev, [category]: value }));
  };

  if (!isExportModelOpen) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        onClick={() => setIsExportModelOpen(false)}
      ></div>
      <div className="flex items-start justify-center w-full min-h-screen px-4 py-5 text-center lg:absolute lg:top-[12%]">
        <div className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-all w-full max-w-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Export Enquiries
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            Customize your export preferences below.
          </p>

          <div className="space-y-5">
            {[
              {
                label: "Select Records to Export",
                name: "records",
                options: [
                  { label: "Current Page Records", value: "current" },
                  { label: "All Records", value: "all" },
                  { label: "Selected Records", value: "selected" },
                ],
              },
              {
                label: "Select Data to Export",
                name: "data",
                options: [
                  { label: "All Data", value: "all" },
                  { label: "Filtered Data", value: "filtered" },
                ],
              },
              {
                label: "Select Export Columns",
                name: "columns",
                options: [
                  { label: "Visible Columns", value: "visible" },
                  { label: "All Columns", value: "all" },
                  { label: "Custom Columns", value: "custom" },
                ],
              },
              {
                label: "Select File Format",
                name: "format",
                options: [
                  { label: "XLSX", value: "xlsx" },
                  { label: "CSV", value: "csv" },
                  { label: "PDF", value: "pdf" },
                ],
              },
            ].map(({ label, name, options }) => (
              <div key={name}>
                <p className="font-medium text-gray-700">{label}</p>
                <div className="flex flex-col space-y-2">
                  {options.map(({ label, value }) => (
                    <label key={value} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={name}
                        value={value}
                        checked={exportOptions[name] === value}
                        onChange={() => handleChange(name, value)}
                        className="accent-blue-600"
                      />
                      <span className="text-gray-600">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button onClick={() => setIsExportModelOpen(false)}
              className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-200"
             id="button-47">
              Cancel
            </button>
            <button onClick={() => console.log("Exporting", exportOptions)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
             id="button-48">
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportAdminModal;
