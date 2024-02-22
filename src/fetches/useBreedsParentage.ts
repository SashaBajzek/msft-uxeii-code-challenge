import { useQuery } from "@tanstack/react-query";
import fetchBreedsParentage from "./fetchBreedsParentage";

export default function useBreedsParentage() {
  const results = useQuery({
    queryKey: ["breedsParentage"],
    queryFn: fetchBreedsParentage,
  });

  return [results?.data ?? {}, results.status];
}
