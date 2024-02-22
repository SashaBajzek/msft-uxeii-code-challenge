import { useQuery } from "@tanstack/react-query";
import Dog from "../../components/Dog/Dog";
import Grid from "../../components/Grid/Grid";
import { useParams } from "react-router-dom";
import fetchBreedImages from "../../fetches/fetchBreedImages";
import fetchSubBreedImage from "../../fetches/fetchSubBreedImage";
import useBreedsParentage from "../../fetches/useBreedsParentage";
import "./BreedDetails.css";

const BreedDetails = () => {
  const [breedsParentage] = useBreedsParentage();

  const { breed } = useParams();
  const subBreeds = breedsParentage[breed]?.children;

  const { data: breedImages } = useQuery<string[]>({
    queryKey: ["BreedImages", breed],
    queryFn: () => fetchBreedImages(breed),
  });

  const subBreedPhotosQuery = useQuery({
    queryKey: ["subBreedPhotos", breed, subBreeds],
    queryFn: async () => {
      if (!subBreeds) return [];
      return Promise.all(
        subBreeds.map((subBreed: string) =>
          fetchSubBreedImage(breed, subBreed),
        ),
      );
    },
    enabled: !!subBreeds && subBreeds.length > 0,
  });

  return (
    <div className="BreedDetails">
      <h2 className="heading">{breed} Images</h2>
      <Grid>
        {breedImages
          ? breedImages.map((image, index) => (
              <li key={index}>
                <Dog image={image} name={breedImages} />
              </li>
            ))
          : "loading images"}
      </Grid>
      <h2 className="heading">
        {subBreeds && subBreeds.length > 0 ? "Sub-breeds" : "No Sub-breeds"}
      </h2>
      {subBreeds && subBreeds.length > 0 ? (
        <Grid>
          {subBreeds.map((subBreed: string, index: number) => (
            <li key={subBreed}>
              <Dog
                image={
                  subBreedPhotosQuery.data
                    ? subBreedPhotosQuery.data[index]
                    : ""
                }
                link={`/${breed}/${subBreed}`}
                name={`${subBreed} ${breed}`}
              />
            </li>
          ))}
        </Grid>
      ) : null}
    </div>
  );
};

export default BreedDetails;
