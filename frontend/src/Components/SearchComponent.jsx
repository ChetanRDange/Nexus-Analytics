import React from "react";

const SearchComponent = ({ searchTerm, setSearchTerm }) => {
  return (
    <>
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
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="placeholder:text-secondary py-2 placeholder:font-medium focus:outline-none focus:ring-0 focus:border-0 border-0 text-dark px-3 bg-main w-full"
      />
    </>
  );
};

export default SearchComponent;
