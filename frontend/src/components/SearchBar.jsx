import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Prefix search handler
  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim().length === 0) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:3000/api/products/search?q=${encodeURIComponent(value)}`
      );
      const data = await res.json();
      setResults(data);
      setShowDropdown(true);
    } catch {
      setResults([]);
      setShowDropdown(false);
    }
  };

  return (
    <div className="flex-1 mx-8 max-w-2xl relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for products, brands and more"
          className="w-full px-4 py-2 rounded-sm text-black outline-none shadow-sm"
          value={search}
          onChange={handleSearchChange}
          onFocus={() => search && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
        />
        <button className="absolute right-0 top-0 h-full px-4 bg-white text-[#2874f0]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      {/* Search Results Dropdown */}
      {showDropdown && results.length > 0 && (
        <div className="absolute left-0 right-0 bg-white text-black shadow-lg rounded mt-1 z-50 max-h-64 overflow-y-auto">
          {results.map((item) => (
            <div
              key={item._id}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer flex items-center gap-2"
              onMouseDown={() => {
                setShowDropdown(false);
                setSearch("");
                navigate(`/products/${item._id}`, { state: { product: item } });
              }}
            >
              <img
                src={item.imageUrl?.[0]}
                alt={item.name}
                className="w-8 h-8 object-contain"
              />
              <span className="font-medium">{item.name}</span>
              <span className="text-xs text-gray-500 ml-2">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
