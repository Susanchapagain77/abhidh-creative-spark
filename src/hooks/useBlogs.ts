import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFromApi, PaginatedResponse } from "@/lib/api";

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  option: string | null;
  content: string | null;
  image_url?: string | null;
  published_at?: string | null;
  created_at?: string;
};

const optionLabels: Record<string, string> = {
  career: "Career Tips",
  technology: "Technology",
  design: "Design",
  branding: "Branding",
  seo: "SEO",
};

const formatOption = (value: string | null | undefined) => {
  if (!value) {
    return "Insights";
  }
  return optionLabels[value] ?? value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

export const useBlogs = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const { data, isLoading, isError, error, refetch } = useQuery<PaginatedResponse<BlogPost>>({
    queryKey: ["creative-blogs"],
    queryFn: () => fetchFromApi<PaginatedResponse<BlogPost>>("/blogs?per_page=30"),
  });

  const blogs = data?.data ?? [];

  const categories = useMemo(() => {
    const unique = new Map<string, string>();
    unique.set("all", "All");

    blogs.forEach((post) => {
      const key = post.option ?? "insights";
      if (!unique.has(key)) {
        unique.set(key, formatOption(post.option));
      }
    });

    return Array.from(unique.entries()).map(([id, label]) => ({ id, label }));
  }, [blogs]);

  const filteredPosts =
    activeCategory === "all"
      ? blogs
      : blogs.filter((post) => (post.option ?? "insights") === activeCategory);

  return {
    blogs,
    categories,
    filteredPosts,
    activeCategory,
    setActiveCategory,
    isLoading,
    isError,
    error,
    refetch,
  };
};



