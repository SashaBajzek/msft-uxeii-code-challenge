import { useQuery } from "@tanstack/react-query";
import Dog from "../../components/Dog/Dog";
import Grid from "../../components/Grid/Grid";
import fetchBreedImage from "../../fetches/fetchBreedImage";
import fetchBreedsNames from "../../fetches/fetchBreedNames";

const AllResults = () => {
  const { data: allBreedNames } = useQuery<string[]>({
    queryKey: ["BreedNames"],
    queryFn: () => fetchBreedsNames(),
  });

  const breedPhotosQuery = useQuery({
    queryKey: ["breedPhotos", allBreedNames],
    queryFn: async () => {
      if (!allBreedNames) return [];
      return Promise.all(
        allBreedNames.map((breed: string) => fetchBreedImage(breed)),
      );
    },
    enabled: !!allBreedNames && allBreedNames.length > 0,
  });

  return (
    <main>
      <h1 className="VisuallyHidden">All Breeds</h1>
      <Grid>
        {allBreedNames?.map((breed, index) => (
          <li key={breed}>
            <Dog
              image={breedPhotosQuery.data ? breedPhotosQuery.data[index] : ""}
              link={`/${breed}`}
              name={breed}
            />
          </li>
        ))}
      </Grid>
    </main>
  );
};

export default AllResults;
