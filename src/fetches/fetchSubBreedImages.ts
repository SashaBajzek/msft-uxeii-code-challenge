async function fetchSubBreedImages(breed, subBreed): Promise<string[]> {
    const response = await fetch(
      `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random/3`,
    );
    const data = await response.json();
    return data.message;
  }
  
  export default fetchSubBreedImages;
  