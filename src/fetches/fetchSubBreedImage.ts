async function fetchSubBreedImage(breed, subBreed): Promise<string[]> {
    const response = await fetch(
      `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`,
    );
    const data = await response.json();
    return data.message;
  }
  
  export default fetchSubBreedImage;
  