import { Search } from "lucide-react";
import { useState } from "react";

export function SearchBar() {
  const [searchInput, setSearchInput] = useState<string>("");

  function handleSearch(userSearchInput: string) {
    setSearchInput(userSearchInput);
  }
  const [shouldShowSearch, setShouldShowSearch] = useState<boolean>(false);
  return (
    <div className="flex items-center gap-2">
      {shouldShowSearch && (
        <input
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600"
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => handleSearch(e.target.value)}
        />
      )}

      <button onClick={() => setShouldShowSearch(!shouldShowSearch)}>
        <Search />
      </button>
    </div>
  );
}
