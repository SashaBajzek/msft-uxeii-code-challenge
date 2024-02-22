async function fetchBreedImage(breed: string): Promise<string[]> {
  const response = await fetch(
    `https://dog.ceo/api/breed/${breed}/images/random`,
  );
  const data = await response.json();
  return data.message;
}

export default fetchBreedImage;
