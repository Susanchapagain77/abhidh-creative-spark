import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchFromApi, PaginatedResponse, buildAssetUrl } from "@/lib/api";
import { stripHtml, cn } from "@/lib/utils";

type GalleryPhoto = {
  id: number;
  photo_path: string | null;
  caption?: string | null;
};

type GalleryItem = {
  id: number;
  title: string;
  description: string | null;
  option: string | null;
  photos: GalleryPhoto[];
  created_at?: string;
};

const optionLabels: Record<string, string> = {
  campus: "Campus",
  classroom: "Classroom",
  events: "Events",
  success: "Success Stories",
  workshop: "Workshops",
  virtual: "Virtual Sessions",
};

const formatOption = (value: string | null | undefined) => {
  if (!value) {
    return "Highlights";
  }
  return optionLabels[value] ?? value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("all");

  const { data, isLoading, isError, error, refetch } = useQuery<PaginatedResponse<GalleryItem>>({
    queryKey: ["creative-gallery"],
    queryFn: () => fetchFromApi<PaginatedResponse<GalleryItem>>("/galleries?per_page=30"),
  });

  const galleries = data?.data ?? [];

  const categories = useMemo(() => {
    const unique = new Map<string, string>();
    unique.set("all", "All");

    galleries.forEach((gallery) => {
      const key = gallery.option ?? "highlights";
      if (!unique.has(key)) {
        unique.set(key, formatOption(gallery.option));
      }
    });

    return Array.from(unique.entries()).map(([id, label]) => ({ id, label }));
  }, [galleries]);

  const filteredGalleries =
    activeFilter === "all"
      ? galleries
      : galleries.filter((gallery) => (gallery.option ?? "highlights") === activeFilter);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-secondary/20 to-background" />
        <div className="container relative mx-auto px-6 text-center lg:px-8">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl animate-fade-in">
            Our Portfolio
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground animate-fade-in-up">
            Explore real-world highlights captured from projects, events, and brand experiences crafted by Abhidh Creative.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="border-b py-12">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeFilter === category.id ? "hero" : "outline"}
                size="sm"
                className={cn(
                  "rounded-full px-6 py-2 text-sm font-semibold transition-all",
                  activeFilter === category.id ? "" : "border-white/20 bg-white/5 hover:bg-white/12"
                )}
                onClick={() => setActiveFilter(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-8">
          {isError ? (
            <div className="mx-auto max-w-xl rounded-3xl border border-destructive/30 bg-destructive/10 p-8 text-center backdrop-blur-lg">
              <h2 className="text-xl font-semibold text-destructive">Unable to load portfolio highlights</h2>
              <p className="mt-2 text-sm text-destructive/80">{error instanceof Error ? error.message : "Please try again."}</p>
              <Button variant="outline" size="sm" className="mt-6" onClick={() => refetch()}>
                Retry
              </Button>
            </div>
          ) : null}

          {isLoading ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={`gallery-skeleton-${index}`}
                  className="h-72 rounded-3xl border border-white/10 bg-card/40 backdrop-blur-lg shadow-[0_20px_45px_-35px_rgba(18,40,90,0.5)] animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredGalleries.map((gallery, index) => {
                const coverPhoto = gallery.photos?.[0];
                const coverUrl = buildAssetUrl(coverPhoto?.photo_path);
                const categoryLabel = formatOption(gallery.option);

                return (
                  <Card
                    key={gallery.id}
                    className="group overflow-hidden border-white/10 bg-card/60 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_100px_-50px_rgba(18,40,90,0.65)] animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative h-64 overflow-hidden">
                      {coverUrl ? (
                        <img
                          src={coverUrl}
                          alt={coverPhoto?.caption ?? gallery.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 to-accent/10 text-primary">
                          No image available
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="absolute top-4 right-4 rounded-full border border-white/20 bg-background/80 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
                        {categoryLabel}
                      </div>
                    </div>
                    <CardContent className="space-y-4 p-6">
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-foreground">{gallery.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {stripHtml(gallery.description) ||
                            "Visual moments that highlight our creative process and outcomes for clients."}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground/80">
                        <span className="inline-flex h-2 w-2 rounded-full bg-primary/80" />
                        <span>
                          Captured{" "}
                          <strong className="text-foreground">
                            {gallery.created_at
                              ? new Date(gallery.created_at).toLocaleDateString(undefined, {
                                  month: "long",
                                  year: "numeric",
                                })
                              : "recently"}
                          </strong>
                        </span>
                      </div>
                      {gallery.photos?.slice(1, 4).length ? (
                        <div className="flex items-center gap-3">
                          {gallery.photos.slice(1, 4).map((photo) => {
                            const thumbUrl = buildAssetUrl(photo.photo_path);
                            return thumbUrl ? (
                              <img
                                key={photo.id}
                                src={thumbUrl}
                                alt={photo.caption ?? gallery.title}
                                className="h-14 w-14 rounded-xl object-cover opacity-90 transition-all group-hover:opacity-100"
                              />
                            ) : (
                              <div
                                key={photo.id}
                                className="h-14 w-14 rounded-xl bg-gradient-to-br from-muted/40 to-muted/20"
                              />
                            );
                          })}
                          {gallery.photos.length > 4 ? (
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-[11px] font-semibold text-muted-foreground/80 backdrop-blur">
                              +{gallery.photos.length - 4}
                            </div>
                          ) : null}
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {!isLoading && !filteredGalleries.length && !isError ? (
            <div className="mt-16 text-center text-muted-foreground">
              No gallery items in this category yet. Please check back soon.
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
