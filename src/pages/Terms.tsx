import { useQuery } from "@tanstack/react-query";
import { fetchFromApi, ApiResponse } from "@/lib/api";

type LegalPage = {
  id: number;
  title: string;
  content: string;
  published_at: string | null;
};

export default function Terms() {
  const { data, isLoading, isError } = useQuery<ApiResponse<LegalPage>>({
    queryKey: ["legal-page", "terms"],
    queryFn: () => fetchFromApi<ApiResponse<LegalPage>>("/legal-pages/terms"),
    retry: false,
  });

  const page = data?.data;

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-background" />
        <div className="container relative mx-auto px-6 text-center lg:px-8">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl animate-fade-in">
            Terms of Service
          </h1>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto max-w-4xl px-6 lg:px-8">
          {isLoading && (
            <div className="space-y-4 animate-pulse">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="h-4 rounded bg-muted" style={{ width: `${65 + (i % 4) * 8}%` }} />
              ))}
            </div>
          )}

          {!isLoading && (isError || !page) && (
            <p className="text-center text-muted-foreground py-16">
              This page is currently being updated. Please check back soon.
            </p>
          )}

          {!isLoading && page && (
            <>
              {page.published_at && (
                <p className="mb-8 text-sm text-muted-foreground">
                  Last updated:{" "}
                  {new Date(page.published_at).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}
              <div
                className="prose prose-sm max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: page.content }}
              />
            </>
          )}
        </div>
      </section>
    </div>
  );
}
