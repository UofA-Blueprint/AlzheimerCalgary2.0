import clsx from "clsx";
import { useState, useEffect, useRef, useCallback } from "react";

interface ColorCircleProps {
  /** The color of the circle */
  color: string;
}
function ColorCircle({ color }: ColorCircleProps) {
  // Circle style
  const circle = "h-6 w-6 rounded-full";

  return <div className={clsx(circle, color)} />;
}

interface ColorPickerOptionProps {
  /** The color option */
  color: string;

  /** The function to call when the option is clicked */
  handleClick: (color: string) => void;
}
function ColorPickerOption({ color, handleClick }: ColorPickerOptionProps) {
  // Body style
  const body =
    "p-1 bg-inherit rounded-lg outline outline-1 outline-transparent";

  // Body style (on hover)
  const bodyOnHover =
    "hover:bg-neutrals-light-400 hover:outline-neutrals-dark-100 transition transition-all duration-200 ease-in-out";

  return (
    <button
      className={clsx(body, bodyOnHover)}
      onClick={() => {
        handleClick(color);
      }}
    >
      <ColorCircle color={color} />
    </button>
  );
}

interface ColorPickerDropdownProps {
  /** The ref to the dropdown */
  dropdownRef: React.RefObject<HTMLDivElement>;

  /** The function to call when the option is clicked */
  handleClick: (color: string) => void;
}
function ColorPickerDropdown({
  dropdownRef,
  handleClick,
}: ColorPickerDropdownProps) {
  // Body style
  const body =
    "flex flex-col gap-1 p-2 bg-neutrals-light-100 rounded-lg outline outline-1 outline-neutrals-dark-100 absolute -left-4 z-10 transition transition-all duration-200 ease-in-out";

  // Row style
  const row = "flex flex-row gap-1";

  return (
    <div
      ref={dropdownRef}
      className={clsx(body)}
    >
      <div className={clsx(row)}>
        <ColorPickerOption
          color="bg-profile-water"
          handleClick={handleClick}
        />
        <ColorPickerOption
          color="bg-profile-air"
          handleClick={handleClick}
        />
        <ColorPickerOption
          color="bg-profile-lilac"
          handleClick={handleClick}
        />
        <ColorPickerOption
          color="bg-profile-candy"
          handleClick={handleClick}
        />
      </div>
      <div className={clsx(row)}>
        <ColorPickerOption
          color="bg-profile-tulip"
          handleClick={handleClick}
        />
        <ColorPickerOption
          color="bg-profile-gold"
          handleClick={handleClick}
        />
        <ColorPickerOption
          color="bg-profile-lime"
          handleClick={handleClick}
        />
        <ColorPickerOption
          color="bg-profile-jade"
          handleClick={handleClick}
        />
      </div>
    </div>
  );
}

interface ColorPickerButtonProps {
  /** The color currently selected */
  selectedColor: string;

  /** The ref to the button */
  buttonRef: React.RefObject<HTMLButtonElement>;

  /** The function to call when the button is clicked */
  handleClick: () => void;
}
function ColorPickerButton({
  selectedColor,
  buttonRef,
  handleClick,
}: ColorPickerButtonProps) {
  // Body style
  const body =
    "flex flex-row p-2 mb-[1px] gap-2.5 bg-neutrals-light-100 hover:bg-neutrals-light-400 rounded-lg outline outline-1 outline-neutrals-dark-100";

  // Text style
  const text = "text-neutrals-dark-300 text-body-sm leading-6";

  return (
    <button
      ref={buttonRef}
      className={clsx(body)}
      onClick={handleClick}
    >
      <ColorCircle color={selectedColor} />
      <div className={clsx(text)}>Background</div>
    </button>
  );
}

function ColorPicker() {
  // State for the color picker
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("bg-profile-air");

  // Refs for the button and the dropdown
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Memoize the handleClickOutside function
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  }, []);

  // Use useEffect to add an event listener that closes the dropdown when clicking outside
  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen, handleClickOutside]);

  // Body style
  const body = "relative";

  return (
    <div className={clsx(body)}>
      <ColorPickerButton
        selectedColor={selectedColor}
        buttonRef={buttonRef}
        handleClick={() => setIsDropdownOpen(!isDropdownOpen)}
      />
      {isDropdownOpen && (
        <ColorPickerDropdown
          dropdownRef={dropdownRef}
          handleClick={setSelectedColor}
        />
      )}
    </div>
  );
}

export default ColorPicker;
