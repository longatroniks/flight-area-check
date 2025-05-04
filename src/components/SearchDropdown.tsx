
interface SearchDropdownProps<T> {
  items: T[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (open: boolean) => void;
  selectedStyleVariant?: 'primary' | 'secondary';
  getId: (item: T) => string;
  getLabel: (item: T) => string;
  onSelect: (item: T) => void;
}

const SearchDropdown = <T,>({
  items,
  searchTerm,
  setSearchTerm,
  isDropdownOpen,
  setIsDropdownOpen,
  selectedStyleVariant = 'primary',
  getId,
  getLabel,
  onSelect,
}: SearchDropdownProps<T>) => {
  const filteredItems = items.filter((item) =>
    getLabel(item).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search and select..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsDropdownOpen(true);
        }}
        onFocus={() => setIsDropdownOpen(true)}
        className={`w-full p-3 pr-10 text-base rounded-lg border bg-gray-50 placeholder-gray-400 border-none focus:outline-none focus:ring-2 transition-all
          ${selectedStyleVariant === 'primary' ? 'focus:ring-primary' : 'focus:ring-secondary'}`}
      />
      {searchTerm && (
        <button
          onClick={() => {
            setSearchTerm('');
            setIsDropdownOpen(false);
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg"
          aria-label="Clear search"
        >
          ×
        </button>
      )}
      {isDropdownOpen && (
        <ul className="absolute z-30 mt-1 max-h-56 w-full overflow-auto rounded-lg bg-white shadow border border-gray-200">
          {filteredItems.length === 0 && (
            <li className="p-3 text-gray-400">No results found</li>
          )}
          {filteredItems.map((item) => (
            <li
              key={getId(item)}
              onClick={() => {
                onSelect(item);
                setSearchTerm(getLabel(item));
                setIsDropdownOpen(false);
              }}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100 transition-colors"
            >
              {getLabel(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchDropdown;
