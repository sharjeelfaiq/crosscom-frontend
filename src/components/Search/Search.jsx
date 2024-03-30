import { MdOutlineCancel } from "react-icons/md";

const Search = ({
  searchKey,
  setSearchKey,
  handleSearchKeyChange,
  getProducts,
}) => {
  return (
    <div className="flex items-center w-44">
      {" "}
      <input
        type="text"
        placeholder="Search Product"
        value={searchKey}
        className="outline-none w-40 border-b-2 border-b-slate-300 focus:border-b-slate-400 p-1 lg:text-base text-sm"
        onChange={handleSearchKeyChange}
      />
      {searchKey.length > 0 && (
        <MdOutlineCancel
          className="cursor-pointer"
          onClick={() => {
            setSearchKey("");
            getProducts();
          }}
        />
      )}
    </div>
  );
};

export default Search;
