// Fetches all breeds names
async function fetchBreedsNames() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
  
    const breedsObj = data.message;
  
    const breedKeys = Object.keys(breedsObj);
  
    return breedKeys;
  }
  
  export default fetchBreedsNames;
  