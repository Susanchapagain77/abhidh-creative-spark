import { useQuery } from "@tanstack/react-query";
import { fetchFromApi, PaginatedResponse, buildAssetUrl } from "@/lib/api";

export type Team = {
  id: number;
  name: string;
  designation: string | null;
  years_of_experience: number | null;
  photo_path?: string | null;
  photo_url?: string | null;
};

export type TeamWithAsset = Team & { photoUrl: string };

export const useTeams = () => {
  const query = useQuery<PaginatedResponse<Team>>({
    queryKey: ["creative-teams"],
    queryFn: () => fetchFromApi<PaginatedResponse<Team>>("/teams?per_page=12"),
  });

  const teamsWithImages: TeamWithAsset[] =
    query.data?.data.map((team) => ({
      ...team,
      photoUrl: team.photo_url || buildAssetUrl(team.photo_path) || "",
    })) ?? [];

  return {
    teams: teamsWithImages,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};

