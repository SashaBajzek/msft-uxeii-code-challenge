import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import useBreedsParentage from "../../fetches/useBreedsParentage";
import "./Search.css";
import Combobox from "../ComboBox/ComboBox";
import { useState } from "react";

const Search = () => {
  const [breedsParentage] = useBreedsParentage();

  const allBreedNames = Object.keys(breedsParentage);
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");

  const goToDogPage = (breed, subBreed) => {
    if (!subBreed) {
      navigate(`/${breed}`);
    } else {
      navigate(`/${breed}/${subBreed}`);
    }
  };

  const setRandomDog = (e) => {
    e.preventDefault();
    setInputValue("");
    const randomDog =
      allBreedNames[Math.floor(Math.random() * allBreedNames.length - 1)];

    const arr = randomDog.split(" ");
    if (arr.length === 1) {
      goToDogPage(arr[0], undefined);
    } else {
      goToDogPage(arr[1], arr[0]);
    }
  };

  return (
    <div className="Search">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const breedName = formData.get("breedName") ?? "";
          const arr = new String(breedName).split(" ");

          const string = new String(breedName)
            .split(" ")
            .join(arr.length === 2 ? " " : "");

          if (arr.length > 2 || !breedsParentage[string]) {
            // If not a valid breed, redirect to homepage
            navigate(`/`);
          } else if (arr.length === 1) {
            goToDogPage(arr[0], undefined);
          } else {
            goToDogPage(arr[1], arr[0]);
          }

          setInputValue("");
        }}
      >
        <div className="wrapper">
          <label className="VisuallyHidden" htmlFor="breedName">
            Search for dog breeds:
          </label>
          <Combobox
            inputId="breedName"
            inputValue={inputValue}
            optionsList={allBreedNames}
            setInputValue={setInputValue}
          />
          <Button>Search</Button>
          <Button onClick={setRandomDog}>Random</Button>
        </div>
      </form>
    </div>
  );
};

export default Search;
