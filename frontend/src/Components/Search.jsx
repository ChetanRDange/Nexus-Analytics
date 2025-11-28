import React from "react";
import useDebounce from "../hooks/useDebounce";
import { useState, useEffect } from "react";
import { SearchIcon } from "lucide-react";
const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);
  return (
    <>
      <span className="py-1">
        <SearchIcon size={18} />
      </span>
      <input
        type="search"
        name="search"
        id="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
        className="placeholder:text-secondary w-full md:w-[160px] py-1 placeholder:font-medium focus:outline-none focus:ring-0 focus:border-0 border-0 text-primary bg-main"
      />
    </>
  );
};

export default Search;
