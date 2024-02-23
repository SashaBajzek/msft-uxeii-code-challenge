import { useQuery } from "@tanstack/react-query";
import Dog from "../../components/Dog/Dog";
import Grid from "../../components/Grid/Grid";
import { useParams } from "react-router-dom";
import fetchBreedImage from "../../fetches/fetchBreedImage";
import fetchSubBreedImages from "../../fetches/fetchSubBreedImages";
import useBreedsParentage from "../../fetches/useBreedsParentage";
import "./SubBreedDetails.css";

const SubBreedDetails = () => {
  const [breedsParentage] = useBreedsParentage();

  const { breed, subBreed } = useParams();

  const parent = breedsParentage
    ? breedsParentage[`${subBreed} ${breed}`]?.parent
    : "";

  const { data: subBreedImages, isLoading: isLoadingSubBreedImages } = useQuery<
    string[]
  >({
    queryKey: ["SubBreedImages", breed, subBreed],
    queryFn: () => fetchSubBreedImages(breed, subBreed),
  });

  const { data: breedImage, isLoading: isLoadingBreedImage } = useQuery<
    string[]
  >({
    queryKey: ["BreedImage", breed],
    queryFn: () => fetchBreedImage(breed),
  });

  return (
    <main className="SubBreedDetails">
      <h1>
        {subBreed} {breed}
      </h1>
      <Grid>
        {subBreedImages && !isLoadingSubBreedImages
          ? subBreedImages.map((breed) => (
              <li key={breed}>
                <Dog image={breed} name={breed} />
              </li>
            ))
          : new Array(3).map((index) => (
              <li key={index}>
                <Dog image={""} name={"Loading"} />
              </li>
            ))}
      </Grid>
      <h2 className="heading">Parent Breed:</h2>
      <Dog
        image={breedImage && !isLoadingBreedImage && breedImage}
        link={`/${breed}`}
        name={parent}
      />
    </main>
  );
};

export default SubBreedDetails;
