// Fetches all breeds and sub-breeds
async function fetchBreedsParentage() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
  
    const breedsObj = data.message;
  
    const breedKeys = Object.keys(breedsObj);
  
    const breedsAndSubBreedsObjWithParentage = {};
  
    for (let i = 0; i < breedKeys.length; i++) {
      const breedName = breedKeys[i];
      const subBreeds = breedsObj[breedName];
      breedsAndSubBreedsObjWithParentage[breedName] = {
        children: subBreeds,
        parent: null,
      };
      for (let j = 0; j < subBreeds.length; j++) {
        const subBreedName = subBreeds[j];
        breedsAndSubBreedsObjWithParentage[`${subBreedName} ${breedName}`] = {
          children: null,
          parent: breedName,
        };
      }
    }
  
    return breedsAndSubBreedsObjWithParentage;
  }
  
  export default fetchBreedsParentage;
  