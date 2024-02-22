// Fetches all breeds and includes one image for each
async function fetchAllBreedsWithImages() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    const breeds = Object.keys(data.message);
  
    const breedsWithImages = await Promise.all(
      breeds.map(async (breed) => {
        const imgResponse = await fetch(
          `https://dog.ceo/api/breed/${breed}/images/random`,
        );
        const imgData = await imgResponse.json();
        return {
          name: breed,
          image: imgData.message,
          subBreeds: data.message[breed].map((subBreed: string) => ({
            name: subBreed,
          })),
        };
      }),
    );
  
    return breedsWithImages;
  }
  
  export default fetchAllBreedsWithImages;
  