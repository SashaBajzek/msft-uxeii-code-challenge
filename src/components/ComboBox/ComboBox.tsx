import { useState, useEffect, useRef } from "react";
import "./ComboBox.css";

function capitalizeFirstLetters(string) {
  const arr = string.split(" ");
  if (arr.length === 1) return string.charAt(0).toUpperCase() + string.slice(1);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  return arr.join(" ");
}

const Combobox = ({ inputId, inputValue, setInputValue, optionsList }) => {
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);
  const listboxRef = useRef(null);

  const filterOptions = (value) => {
    return optionsList
      .filter((option) => option.toLowerCase().includes(value.toLowerCase()))
      .sort();
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setFilteredOptions(filterOptions(event.target.value));
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    setFilteredOptions(optionsList.sort());
  };

  const handleInputBlur = () => {
    // Delay closing to allow click to be registered
    setTimeout(() => setIsOpen(false), 100);
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setHighlightedIndex((prevIndex) =>
          prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : prevIndex,
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
        break;
      case "Enter":
        if (highlightedIndex >= 0) {
          setInputValue(filteredOptions[highlightedIndex]);
          setIsOpen(false);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handleOptionClick = (option) => {
    setInputValue(capitalizeFirstLetters(option));
    setIsOpen(false);
  };

  // Click outside to close listbox
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        listboxRef.current &&
        !listboxRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="ComboBox">
      <input
        aria-autocomplete="list"
        aria-expanded={isOpen}
        aria-controls="listbox"
        id={inputId}
        name={inputId}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        placeholder="Dog type"
        ref={inputRef}
        type="text"
        value={inputValue}
      />
      {isOpen && filteredOptions.length > 0 && (
        <ul
          aria-label="Dog Breeds"
          id="listbox"
          ref={listboxRef}
          role="listbox"
        >
          {filteredOptions.map((option, index) => (
            <li
              aria-selected={highlightedIndex === index}
              key={option}
              onMouseDown={() => handleOptionClick(option)}
              role="option"
              style={{
                backgroundColor: highlightedIndex === index ? "#bde4ff" : "",
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Combobox;
