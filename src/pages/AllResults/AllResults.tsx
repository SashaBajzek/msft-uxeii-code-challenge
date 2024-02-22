import { useQuery } from "@tanstack/react-query";
import Dog from "../../components/Dog/Dog";
import Grid from "../../components/Grid/Grid";
import fetchAllBreedsWithImages from "../../fetches/fetchAllBreedsWithImages";

const AllResults = () => {
  const { data: breedsWithImages, isLoading } = useQuery({
    queryKey: ["breedsWithImages"],
    queryFn: fetchAllBreedsWithImages,
  });

  return (
    <div>
      <h2>All Breeds</h2>
      <Grid>
        {breedsWithImages?.map((breed) => (
          <li key={breed.name}>
            <Dog
              image={breed.image}
              link={`/${breed.name}`}
              name={breed.name}
            />
          </li>
        ))}
      </Grid>
    </div>
  );
};

export default AllResults;
