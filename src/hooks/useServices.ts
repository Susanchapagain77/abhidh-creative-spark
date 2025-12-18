import { useQuery } from "@tanstack/react-query";
import { fetchFromApi, PaginatedResponse, ApiResponse } from "@/lib/api";

export type Service = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  content: string | null;
  thumbnail_url: string | null;
  category: string;
  accent_color?: string | null;
  is_published: boolean;
  featured: boolean;
  order: number;
  created_at: string;
  updated_at: string | null;
  category_label?: string;
  accent_color_hex?: string;
};

const categoryLabels: Record<string, string> = {
  digital_marketing: "Digital Marketing",
  it_development: "IT & Development",
  creative_solutions: "Creative Solutions",
};

const mapCategoryLabel = (value: string | null | undefined) => {
  if (!value) {
    return "Service";
  }
  return categoryLabels[value] ?? value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

export const useServices = (perPage = 10, category?: string) => {
  const queryParams = new URLSearchParams();
  queryParams.set('per_page', String(perPage));
  if (category && category !== 'all') {
    queryParams.set('category', category);
  }

  const query = useQuery<PaginatedResponse<Service>>({
    queryKey: ["services", perPage, category],
    queryFn: () => fetchFromApi<PaginatedResponse<Service>>(`/services?${queryParams.toString()}`),
  });

  const services =
    query.data?.data.map((service) => ({
      ...service,
      category_label: mapCategoryLabel(service.category),
      accentColor: service.accent_color ?? service.accent_color_hex ?? "#1d4ed8",
    })) ?? [];

  return {
    services,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    pagination: query.data?.pagination,
  };
};

export const useService = (slug: string) => {
  const query = useQuery<ApiResponse<Service>>({
    queryKey: ["service", slug],
    queryFn: () => fetchFromApi<ApiResponse<Service>>(`/services/${slug}`),
    enabled: !!slug,
  });

  const service = query.data?.data
    ? {
        ...query.data.data,
        category_label: mapCategoryLabel(query.data.data.category),
        accentColor: query.data.data.accent_color ?? query.data.data.accent_color_hex ?? "#1d4ed8",
      }
    : null;

  return {
    service,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};

