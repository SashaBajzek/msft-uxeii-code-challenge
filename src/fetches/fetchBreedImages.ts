async function fetchBreedImages(breed: string): Promise<string[]> {
    const response = await fetch(
      `https://dog.ceo/api/breed/${breed}/images/random/3`,
    );
    const data = await response.json();
    return data.message;
  }
  
  export default fetchBreedImages;
  