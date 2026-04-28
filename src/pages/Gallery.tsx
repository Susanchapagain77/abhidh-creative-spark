import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchFromApi, PaginatedResponse, buildAssetUrl } from "@/lib/api";
import { stripHtml, cn } from "@/lib/utils";
import { Play, ExternalLink, Image as ImageIcon } from "lucide-react";

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
  media_type: "image" | "video";
  youtube_url: string | null;
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

const getYouTubeId = (url: string | null) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const getYouTubeThumbnail = (url: string | null) => {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
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
      <section className="border-b py-8 sticky top-0 z-10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeFilter === category.id ? "hero" : "outline"}
                size="sm"
                className={cn(
                  "rounded-full px-5 transition-all duration-300",
                  activeFilter === category.id ? "shadow-lg shadow-primary/20 scale-105" : "hover:bg-primary/5 border-muted-foreground/20"
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
      <section className="py-20">
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
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={`gallery-skeleton-${index}`}
                  className="h-[450px] rounded-3xl border border-white/10 bg-card/40 backdrop-blur-lg animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {filteredGalleries.map((gallery, index) => {
                const isVideo = gallery.media_type === "video" || !!gallery.youtube_url;
                const coverPhoto = gallery.photos?.[0];
                const coverUrl = isVideo 
                  ? (getYouTubeThumbnail(gallery.youtube_url) || buildAssetUrl(coverPhoto?.photo_path))
                  : buildAssetUrl(coverPhoto?.photo_path);
                
                const categoryLabel = formatOption(gallery.option);

                return (
                  <Card
                    key={gallery.id}
                    className={cn(
                      "group flex flex-col overflow-hidden border-white/10 bg-card/60 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_100px_-50px_rgba(18,40,90,0.65)] animate-fade-in",
                      isVideo && "cursor-pointer"
                    )}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => {
                      if (isVideo && gallery.youtube_url) {
                        window.open(gallery.youtube_url, "_blank");
                      }
                    }}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      {coverUrl ? (
                        <img
                          src={coverUrl}
                          alt={coverPhoto?.caption ?? gallery.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 to-accent/10 text-primary">
                          <ImageIcon className="h-10 w-10 opacity-20" />
                        </div>
                      )}
                      
                      {/* Video Overlay */}
                      {isVideo && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-500">
                          <div className="h-14 w-14 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 group-hover:scale-110 group-hover:bg-primary transition-all duration-500">
                            <Play className="h-6 w-6 text-white fill-white" />
                          </div>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                      
                      <div className="absolute top-4 right-4 z-10">
                        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-background/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary backdrop-blur">
                          {isVideo ? <Play className="h-3 w-3" /> : <ImageIcon className="h-3 w-3" />}
                          {categoryLabel}
                        </div>
                      </div>
                    </div>

                    <CardContent className="flex flex-1 flex-col p-8">
                      <div className="flex-1 space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                             <h3 className="text-xl font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                              {gallery.title}
                            </h3>
                            {isVideo && <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />}
                          </div>
                          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                            {stripHtml(gallery.description) ||
                              "Visual moments that highlight our creative process and outcomes for clients."}
                          </p>
                        </div>

                        {gallery.photos?.length > 1 && !isVideo && (
                          <div className="flex items-center gap-2 pt-2">
                            {gallery.photos.slice(1, 5).map((photo) => (
                              <div key={photo.id} className="relative h-10 w-10 overflow-hidden rounded-lg border border-white/10">
                                <img
                                  src={buildAssetUrl(photo.photo_path)}
                                  className="h-full w-full object-cover opacity-60 hover:opacity-100 transition-opacity"
                                  alt="Thumbnail"
                                />
                              </div>
                            ))}
                            {gallery.photos.length > 5 && (
                              <div className="text-[10px] font-medium text-muted-foreground ml-1">
                                +{gallery.photos.length - 5} more
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
                        <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>
                            {gallery.created_at
                              ? new Date(gallery.created_at).toLocaleDateString(undefined, {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              : "Recently Uploaded"}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60">
                          Portfolio
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {!isLoading && !filteredGalleries.length && !isError ? (
            <div className="mt-16 text-center py-20 rounded-3xl border border-dashed border-white/10">
              <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground/20 mb-4" />
              <p className="text-muted-foreground font-medium">No items found in this category.</p>
              <Button variant="link" className="mt-2 text-primary" onClick={() => setActiveFilter("all")}>
                Clear filters
              </Button>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
