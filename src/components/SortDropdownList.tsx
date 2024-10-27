import { CaretDown } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

interface SortDropdownProps {
  onSelect: (sortOrder: string) => void; // Callback prop for selecting sort order
}

function SortDropdown({ onSelect }: SortDropdownProps) {
  // State to manage the dropdown open/closed state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // State to keep track of the current sort order
  const [sortOrder, setSortOrder] = useState<string>("latest");
  // Ref to handle clicks outside the dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handler to close dropdown when clicking outside of it
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener for mouse down
    document.addEventListener("mousedown", handler);
    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  // Function to handle selection of sort order
  const handleSortSelect = (order: string) => {
    setSortOrder(order); // Update the sort order
    onSelect(order); // Call the passed in prop to update sort order
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full cursor-pointer font-body h-10 bg-status-blue-light flex justify-between items-center px-4 py-2 rounded-lg"
      >
        Sort 
        <CaretDown></CaretDown>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-full bg-white rounded-md shadow-lg z-10 ">
          <div
            className="py-1 cursor-pointer hover:bg-gray-100 px-4 text-gray-700 rounded-lg"
            onClick={() => handleSortSelect("latest")} // Sort by latest
          >
            Latest
          </div>
          <div
            className="py-1 cursor-pointer hover:bg-gray-100 px-4 text-gray-700 w-full rounded-lg"
            onClick={() => handleSortSelect("oldest")} // Sort by oldest
          >
            Oldest
          </div>
        </div>
      )}
    </div>
  );
}

export default SortDropdown;
