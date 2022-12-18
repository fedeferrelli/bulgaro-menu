import React from "react";

function Search({ setSearch }) {
  return (
    <div id="search" className="px-1 sm:px-0">
      <input
        className="sm:w-40 w-full sm:focus:w-1/2 p-2 px-3 rounded-full my-4 ease-in-out duration-700 outline-none
                border-gray-100 border bg-white text-text font-extralight"
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Buscar"
      />
    </div>
  );
}

export default Search;
