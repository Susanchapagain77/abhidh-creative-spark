import { useQuery } from "@tanstack/react-query";
import { fetchFromApi, PaginatedResponse, buildAssetUrl } from "@/lib/api";

export type Trainer = {
  id: number;
  name: string;
  expertise: string | null;
  years_of_experience: number | null;
  photo_path?: string | null;
};

export type TrainerWithAsset = Trainer & { photoUrl: string };

export const useTrainers = () => {
  const query = useQuery<PaginatedResponse<Trainer>>({
    queryKey: ["creative-trainers"],
    queryFn: () => fetchFromApi<PaginatedResponse<Trainer>>("/trainers?per_page=12"),
  });

  const trainersWithImages: TrainerWithAsset[] =
    query.data?.data.map((trainer) => ({
      ...trainer,
      photoUrl: buildAssetUrl(trainer.photo_path),
    })) ?? [];

  return {
    trainers: trainersWithImages,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};


