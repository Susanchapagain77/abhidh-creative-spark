import { useQuery } from "@tanstack/react-query";
import { fetchFromApi, PaginatedResponse } from "@/lib/api";

export type Program = {
  id: number;
  name: string;
  description: string | null;
  category: string | null;
  color?: string | null;
  courses_count?: number;
  updated_at?: string | null;
};

const categoryLabels: Record<string, string> = {
  school: "School",
  college: "College",
  corporate: "Corporate",
  it: "IT & Development",
  digital_marketing: "Digital Marketing",
};

const mapCategoryLabel = (value: string | null | undefined) => {
  if (!value) {
    return "Creative Strategy";
  }

  return categoryLabels[value] ?? value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

export const usePrograms = (perPage = 9) => {
  const query = useQuery<PaginatedResponse<Program>>({
    queryKey: ["creative-programs", perPage],
    queryFn: () => fetchFromApi<PaginatedResponse<Program>>(`/programs?per_page=${perPage}`),
  });

  const programs =
    query.data?.data.map((program) => ({
      ...program,
      categoryLabel: mapCategoryLabel(program.category),
      accentColor: program.color ?? "#1d4ed8",
    })) ?? [];

  return {
    programs,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};

