import React, { useState } from "react";
import FilterImg from "../assets/svgs/filters.svg";
import SearchImg from "../assets/svgs/settings/users/search.svg";
import Tick from "../assets/svgs/settings/tick.svg";
import PlussImg from "../assets/svgs/pluss.svg";
import useStore from "../state/store";

const Filters = ({
  categories,
  onCategorySelect,
  setSelectedCategory,
  selectedCategory,
  onQuerySubmitHandler,
  setShowAdvanceFilter,
}) => {
  console.log("seleced category", selectedCategory);
  // const [isOpenCategories, setIsOpenCategories] = useState(false);
  const { currentSelectedCategory, setCurrentSelectedCategory } = useStore();
  return (
    <>
      <div className="dropdown-container relative w-full">
        <details
          name="tone"
          // open={isOpenCategories}
          className="relative w-full cursor-default rounded-xl bg-main px-4 text-left text-primary shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-0 sm:text-lg sm:leading-6"
        >
          <summary className="cursor-pointer py-1 text-left w-full pr-0 text-primary list-none focus:outline-none focus:ring-0 focus:border-0">
            <span className="flex items-center w-fit">
              <span className="block font-medium whitespace-nowrap text-[16px]">
                {/* {selectedCategory?.name ? (
                  selectedCategory.name
                ) : ( */}
                <span className="text-secondary font-normal flex gap-2 items-center">
                  <span>
                    <img src={FilterImg} alt="" />
                  </span>
                  <span className="">
                    {selectedCategory
                      ? categories.find(
                          (cat) => cat.accessor === selectedCategory
                        )?.Header
                      : "Filters"}
                  </span>
                </span>
                {/* )} */}
              </span>
            </span>
          </summary>

          <ul className="absolute start-0 top-9 z-40 max-w-[300px] max-h-[350px] rounded-xl bg-main text-[12px] md:text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm overflow-y-auto custom-scrollbar">
            <div className="w-full flex items-center rounded-xl border border-primary px-3">
              {/* <span>
                <img src={SearchImg} alt="" />
              </span>

              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search"
                className="placeholder:text-primary placeholder:font-normal w-[90%] py-2 focus:outline-none focus:ring-0 focus:border-0 border-0 text-primary px-3"
              /> */}
            </div>
            <div className="relative">
              {categories.map(
                (category) =>
                  category.accessor && (
                    <li
                      key={category.accessor}
                      className={`group relative cursor-default select-none py-2 pl-3 pr-14 text-primary hover:bg-hover ${
                        selectedCategory?.accessor === category.accessor
                          ? "bg-lightcyan"
                          : ""
                      }`}
                      onClick={(e) => {
                        e.currentTarget
                          .closest("details")
                          .removeAttribute("open");
                        console.log(category);
                        setCurrentSelectedCategory(category);
                        onCategorySelect(category);
                      }}
                    >
                      <div className="flex items-center">
                        <span
                          className={`ml-3 block whitespace-nowrap font-normal ${
                            selectedCategory?.accessor === category.accessor
                              ? "font-semibold"
                              : ""
                          }`}
                        >
                          {category.Header}
                        </span>
                      </div>

                      {currentSelectedCategory?.accessor ===
                        category.accessor && (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-white">
                          <img src={Tick} alt="" />
                        </span>
                      )}
                    </li>
                  )
              )}
              {/* <button className="w-full border-t border-primary py-2 flex px-6"
                onClick={() => setShowAdvanceFilter(true)}
               id="button-50">
                <span className=" whitespace-nowrap font-normal text-primary">
                  Advanced Filter
                </span>
              </button> */}
            </div>
          </ul>
        </details>
      </div>
    </>
  );
};

export default Filters;
