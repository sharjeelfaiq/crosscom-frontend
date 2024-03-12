import React from "react";

const Search = ({searchKey, handleSearchKeyChange}) => {
  return (
    <input
      type="text"
      placeholder="Search Product"
      value={searchKey}
      className="outline-none w-40 border-b-2 border-b-slate-300 focus:border-b-slate-400 p-1 lg:text-base text-sm"
      onChange={handleSearchKeyChange}
    />
  );
};

export default Search;
