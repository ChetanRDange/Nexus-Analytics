import { useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { MdClose } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const operators = [
  { label: "Equals", value: "is" },
  { label: "Not Equals", value: "is not" },
  { label: "Contains", value: "contains" },
  { label: "Does Not Contain", value: "does not contain" },
  { label: "Starts With", value: "starts with" },
  { label: "Ends With", value: "ends with" },
  { label: "Greater Than", value: "greater than" },
  { label: "Greater Than or Equal To", value: "greater than or equal to" },
  { label: "Less Than", value: "less than" },
  { label: "Less Than or Equal To", value: "less than or equal to" },
  { label: "Before", value: "before" },
  { label: "After", value: "after" },
  { label: "On or Before", value: "on or before" },
  { label: "On or After", value: "on or after" },
  { label: "Between", value: "between" }, // Requires special handling in UI
  { label: "Not Between", value: "not between" }, // Requires special handling in UI
  { label: "Is Empty", value: "is empty" }, // Special case
  { label: "Is Not Empty", value: "is not empty" }, // Special case
];

const FilterGroup = ({
  columns,
  conditions,
  setConditions,
  logicalOperator,
  setLogicalOperator,
  applyFilters,
  removeGroup,
  isMainFilterGroup = false,
  handleClearFilters,
}) => {
  // Add new single condition
  const handleAddCondition = () => {
    setConditions([...conditions, { field: "", operator: "is", value: "" }]);
  };

  // Add a nested group of conditions
  const handleAddGroup = () => {
    setConditions([...conditions, { logicalOperator: "and", conditions: [] }]);
  };

  // Remove a condition
  const handleRemoveCondition = (index) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  // Update a condition field/operator/value
  const handleChange = (index, key, value) => {
    const updatedConditions = [...conditions];
    updatedConditions[index][key] = value;
    setConditions(updatedConditions);
  };

  // Apply filters by formatting correctly for backend
  const handleApplyFilters = () => {
    const filterData = { logicalOperator, conditions };
    applyFilters(filterData);
  };

  return (
    <div className="w-full rounded-xl p-4 border border-border shadow-md bg-white">
      {/* Header */}
      <div className="flex justify-between items-center pb-3 border-b border-border">
        <h3 className="text-primary text-lg font-bold">Advanced Filters</h3>
        {removeGroup && (
          <button onClick={removeGroup}
            className="p-1.5 rounded-xl hover:bg-hover"
           id="button-3">
            <MdClose className="cursor-pointer text-secondary" size={20} />
          </button>
        )}
      </div>

      {/* Logical Operator Selection */}
      <div className="w-full flex gap-4 pt-4 items-center">
        <span className="text-primary">WHERE</span>
        <select
          className="border p-2 rounded-xl text-dark"
          value={logicalOperator}
          onChange={(e) => setLogicalOperator(e.target.value)}
        >
          <option value="and">AND</option>
          <option value="or">OR</option>
        </select>
      </div>

      {/* Conditions List */}
      <div className="w-full space-y-4 mt-4">
        {conditions.map((condition, index) =>
          condition.conditions ? (
            // Nested FilterGroup (for grouped conditions)
            <FilterGroup
              key={index}
              columns={columns}
              conditions={condition.conditions}
              setConditions={(newConditions) => {
                const updatedConditions = [...conditions];
                updatedConditions[index].conditions = newConditions;
                setConditions(updatedConditions);
              }}
              logicalOperator={condition.logicalOperator}
              setLogicalOperator={(newLogicalOperator) => {
                const updatedConditions = [...conditions];
                updatedConditions[index].logicalOperator = newLogicalOperator;
                setConditions(updatedConditions);
              }}
              removeGroup={() => handleRemoveCondition(index)}
            />
          ) : (
            // Single Condition
            <div key={index} className="flex gap-3 flex-wrap items-center">
              <select
                className="border p-2 rounded-xl text-dark"
                value={condition.field}
                onChange={(e) => handleChange(index, "field", e.target.value)}
              >
                <option value="">Select Field</option>
                {columns.map((item, i) => (
                  <option key={i} value={item?.accessor}>
                    {item?.Header}
                  </option>
                ))}
              </select>

              <select
                className="border p-2 rounded-xl text-dark"
                value={condition.operator}
                onChange={(e) =>
                  handleChange(index, "operator", e.target.value)
                }
              >
                {operators.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.label}
                  </option>
                ))}
              </select>

              <input
                type="text"
                className="border p-2 rounded-xl text-dark"
                value={condition.value}
                onChange={(e) => handleChange(index, "value", e.target.value)}
                placeholder="Value"
              />

              <button onClick={() => handleRemoveCondition(index)}
                className="p-2 rounded-xl bg-red-500 text-white"
               id="button-4">
                <IoClose />
              </button>
            </div>
          )
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 flex-wrap justify-start mt-5 min-h-[50px]">
        <button onClick={handleAddCondition}
          className="flex px-4 py-2 items-center gap-2 w-fit border border-border rounded-xl text-primary tracking-wide"
         id="button-5">
          <VscAdd size={20} className="text-primary" />
          <span>New Condition</span>
        </button>
        <button onClick={handleAddGroup}
          className="flex px-4 py-2 items-center gap-2 w-fit border border-border rounded-xl text-primary tracking-wide"
         id="button-6">
          <VscAdd size={20} className="text-primary" />
          <span>New Group</span>
        </button>

        {/* Apply and Clear Buttons Only for Main Filter Group */}
        {isMainFilterGroup && (
          <>
            <button onClick={handleApplyFilters}
              className="flex px-4 py-2 items-center gap-2 w-fit border border-border rounded-xl text-primary tracking-wide"
             id="button-7">
              Apply Filters
            </button>
            <button onClick={handleClearFilters}
              className="flex px-4 py-2 items-center gap-2 w-fit border border-red-500 text-red-500 rounded-xl tracking-wide"
             id="button-8">
              Clear Filters
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FilterGroup;
