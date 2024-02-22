import { useState, useEffect, useRef } from "react";
import "./ComboBox.css";
const Combobox = ({ inputId, inputValue, setInputValue, optionsList }) => {
  const [filteredOptions, setFilteredOptions] = useState(optionsList);
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
    setInputValue(option);
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
        ref={inputRef}
        type="text"
        aria-autocomplete="list"
        aria-expanded={isOpen}
        aria-controls="listbox"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        id={inputId}
        name={inputId}
        placeholder="Dog type"
      />
      {isOpen && inputValue.length > 1 && filteredOptions.length > 0 && (
        <ul
          id="listbox"
          role="listbox"
          ref={listboxRef}
          aria-label="Dog Breeds"
        >
          {filteredOptions.map((option, index) => (
            <li
              key={option}
              role="option"
              aria-selected={highlightedIndex === index}
              onMouseDown={() => handleOptionClick(option)}
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
