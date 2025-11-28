import React from "react";
import NewMultiselectdropdown from "./NewMultiselectdropdown";

const NewFilter = ({ tableFilters, filter, setFilter }) => {
  const handleClearFilters = () => {
    setFilter({});
  };

  console.log("the filter", filter);

  return (
    <>
      <div className="w-[100px]">
        <NewMultiselectdropdown
          title="Filter"
          options={tableFilters.map((item) => ({
            label: item.title,
            value: item.key,
          }))}
          values={Object.keys(filter)}
          onChange={(e) => {
            const flag = Object.keys(filter).includes(e);
            if (flag) {
              const newFilter = { ...filter };
              delete newFilter[e];
              setFilter(newFilter);
            } else {
              const newFilter = { ...filter };
              newFilter[e] = undefined;
              setFilter(newFilter);
            }
          }}
        />
      </div>
      {/* <div className="flex items-center gap-4"> */}

        {/* <div className="flex items-center flex-wrap gap-4"> */}
          {Object.entries(filter).length > 0 &&
            Object.entries(filter).map(([key, value], index) => {
              const item = tableFilters.find((item) => item.key === key);
              return item && item.type === "multiSelect" ? (
                <div key={index} className="w-[170px]">
                  <NewMultiselectdropdown
                    title={item.title}
                    options={item.options.map((item) => ({
                      label: item.title,
                      value: item.value,
                    }))}
                    values={value?.$in || []}
                    onChange={(selectedValue) => {
                      setFilter((prev) => {
                        const newFilter = { ...prev };
                        const currentValues = newFilter[key]?.$in || [];

                        if (currentValues.includes(selectedValue)) {
                          const updatedValues = currentValues.filter(
                            (v) => v !== selectedValue
                          );
                          if (updatedValues.length > 0) {
                            newFilter[key] = { $in: updatedValues };
                          } else {
                            delete newFilter[key];
                          }
                        } else {
                          newFilter[key] = {
                            $in: [...currentValues, selectedValue],
                          };
                        }

                        return newFilter;
                      });
                    }}
                  />
                </div>
              ) : null;
            })}

          {Object.keys(filter).length > 0 && (
            <button
              onClick={handleClearFilters}
              className="whitespace-nowrap text-primary font-normal hover:bg-hover rounded-xl border border-primary py-1 px-3"
            >
              Clear Filters
            </button>
          )}
        {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default NewFilter;
