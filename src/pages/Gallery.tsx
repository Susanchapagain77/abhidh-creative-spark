import { useMemo, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchFromApi, PaginatedResponse, buildAssetUrl } from "@/lib/api";
import { stripHtml, cn } from "@/lib/utils";
import { Play, ExternalLink, Image as ImageIcon, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

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
  media_type: "image_group" | "youtube";
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
  digital_marketing: "Digital Marketing",
  it_development: "IT & Development",
  creative_solutions: "Creative Solutions",
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
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get("filter") || "all";
  const [activeFilter, setActiveFilter] = useState(filterParam);

  // Sync activeFilter when search param changes
  useEffect(() => {
    setActiveFilter(filterParam);
  }, [filterParam]);

  const [lightbox, setLightbox] = useState<{ 
    isOpen: boolean; 
    photos: GalleryPhoto[]; 
    activeIndex: number;
    isVideo: boolean;
    youtubeUrl: string | null;
  }>({
    isOpen: false,
    photos: [],
    activeIndex: 0,
    isVideo: false,
    youtubeUrl: null,
  });

  const { data, isLoading, isError, error, refetch } = useQuery<PaginatedResponse<GalleryItem>>({
    queryKey: ["creative-gallery"],
    queryFn: () => fetchFromApi<PaginatedResponse<GalleryItem>>("/galleries?option=Abhidh%20Creative&per_page=50"),
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

  const openLightbox = (photos: GalleryPhoto[], index: number, isVideo = false, youtubeUrl: string | null = null) => {
    setLightbox({ isOpen: true, photos, activeIndex: index, isVideo, youtubeUrl });
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightbox(prev => ({
      ...prev,
      activeIndex: (prev.activeIndex + 1) % prev.photos.length
    }));
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightbox(prev => ({
      ...prev,
      activeIndex: (prev.activeIndex - 1 + prev.photos.length) % prev.photos.length
    }));
  };

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
                const isVideo = gallery.media_type === "youtube" || !!gallery.youtube_url;
                const coverPhoto = gallery.photos?.[0];
                const coverUrl = isVideo 
                  ? (getYouTubeThumbnail(gallery.youtube_url) || buildAssetUrl(coverPhoto?.photo_path))
                  : buildAssetUrl(coverPhoto?.photo_path);
                
                const categoryLabel = formatOption(gallery.option);

                return (
                  <Card
                    key={gallery.id}
                    className="group flex flex-col overflow-hidden border-white/10 bg-card/60 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_100px_-50px_rgba(18,40,90,0.65)] animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div 
                      className="relative aspect-video overflow-hidden cursor-pointer"
                      onClick={() => {
                        if (isVideo && gallery.youtube_url) {
                          openLightbox([], 0, true, gallery.youtube_url);
                        } else if (gallery.photos?.length) {
                          openLightbox(gallery.photos, 0);
                        }
                      }}
                    >
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
                          <div className="h-14 w-14 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 group-hover:scale-110 group-hover:bg-primary transition-all duration-500 shadow-xl">
                            <Play className="h-6 w-6 text-white fill-white" />
                          </div>
                        </div>
                      )}

                      {/* Image Overlay */}
                      {!isVideo && gallery.photos?.length > 0 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-500">
                           <div className="h-12 w-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 scale-90 group-hover:scale-100 transition-transform duration-500">
                            <Maximize2 className="h-5 w-5 text-white" />
                          </div>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                      
                      <div className="absolute top-4 right-4 z-10">
                        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-background/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary backdrop-blur shadow-sm">
                          {isVideo ? <Play className="h-3 w-3" /> : <ImageIcon className="h-3 w-3" />}
                          {categoryLabel}
                        </div>
                      </div>
                    </div>

                    <CardContent className="flex flex-1 flex-col p-8">
                      <div className="flex-1 space-y-5">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-2">
                             <h3 className="text-2xl font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors tracking-tight">
                              {gallery.title}
                            </h3>
                            {isVideo && (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openLightbox([], 0, true, gallery.youtube_url);
                                }}
                                className="text-primary hover:scale-110 transition-transform"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3 font-medium opacity-80">
                            {stripHtml(gallery.description) ||
                              "Visual moments that highlight our creative process and outcomes for clients."}
                          </p>
                        </div>

                        {gallery.photos?.length > 1 && (
                          <div className="flex items-center gap-2.5 pt-2">
                            {gallery.photos.slice(1, 5).map((photo, pIdx) => (
                              <div 
                                key={photo.id} 
                                className="relative h-12 w-12 overflow-hidden rounded-xl border border-white/10 cursor-zoom-in transition-all hover:scale-105 hover:border-primary/50 group/thumb"
                                onClick={() => openLightbox(gallery.photos, pIdx + 1)}
                              >
                                <img
                                  src={buildAssetUrl(photo.photo_path)}
                                  className="h-full w-full object-cover opacity-70 group-hover/thumb:opacity-100 transition-opacity"
                                  alt="Thumbnail"
                                />
                              </div>
                            ))}
                            {gallery.photos.length > 5 && (
                              <button 
                                onClick={() => openLightbox(gallery.photos, 5)}
                                className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[10px] font-bold text-muted-foreground hover:bg-white/10 hover:text-primary transition-all"
                              >
                                +{gallery.photos.length - 5}
                              </button>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                        <div className="flex items-center gap-2.5 text-[11px] font-semibold text-muted-foreground">
                          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                          <span className="uppercase tracking-wider">
                            {gallery.created_at
                              ? new Date(gallery.created_at).toLocaleDateString(undefined, {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              : "Recent"}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                           {isVideo ? (
                             <button 
                              onClick={() => openLightbox([], 0, true, gallery.youtube_url)}
                              className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline underline-offset-4 flex items-center gap-1"
                            >
                              <Play className="h-2 w-2 fill-primary" />
                              Play Video
                            </button>
                           ) : gallery.photos?.length > 0 && (
                            <button 
                              onClick={() => openLightbox(gallery.photos, 0)}
                              className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline underline-offset-4"
                            >
                              View Gallery
                            </button>
                          )}
                          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">
                            Portfolio
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {!isLoading && !filteredGalleries.length && !isError ? (
            <div className="mt-16 text-center py-20 rounded-3xl border border-dashed border-white/10 bg-white/5">
              <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground/20 mb-4" />
              <p className="text-muted-foreground font-medium">No portfolio items found in this category.</p>
              <Button variant="link" className="mt-2 text-primary" onClick={() => setActiveFilter("all")}>
                Reset all filters
              </Button>
            </div>
          ) : null}
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog 
        open={lightbox.isOpen} 
        onOpenChange={(open) => setLightbox(prev => ({ ...prev, isOpen: open }))}
      >
        <DialogContent className={cn(
          "max-w-[95vw] h-[90vh] p-0 border-none bg-black/95 backdrop-blur-2xl shadow-2xl flex flex-col items-center justify-center overflow-hidden gap-0",
          lightbox.isVideo && "aspect-video h-auto max-h-[90vh]"
        )}>
          <DialogTitle className="sr-only">{lightbox.isVideo ? "Video Player" : "Image Gallery View"}</DialogTitle>
          
          <button 
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            onClick={() => setLightbox(prev => ({ ...prev, isOpen: false }))}
          >
            <X className="h-6 w-6" />
          </button>

          {!lightbox.isVideo && lightbox.photos.length > 1 && (
            <>
              <button 
                className="absolute left-4 z-50 p-3 rounded-full bg-white/5 hover:bg-white/15 text-white transition-all hover:scale-110 active:scale-95"
                onClick={prevPhoto}
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button 
                className="absolute right-4 z-50 p-3 rounded-full bg-white/5 hover:bg-white/15 text-white transition-all hover:scale-110 active:scale-95"
                onClick={nextPhoto}
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          )}

          <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8">
            {lightbox.isVideo ? (
              <div className="w-full h-full aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${getYouTubeId(lightbox.youtubeUrl)}?autoplay=1`}
                  className="w-full h-full rounded-xl border border-white/10 shadow-2xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <>
                <img 
                  src={buildAssetUrl(lightbox.photos[lightbox.activeIndex]?.photo_path)}
                  alt={lightbox.photos[lightbox.activeIndex]?.caption || "Gallery view"}
                  className="max-w-full max-h-full object-contain shadow-2xl animate-in zoom-in-95 duration-300 select-none"
                />
                
                {lightbox.photos[lightbox.activeIndex]?.caption && (
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 text-white text-sm font-medium shadow-2xl">
                    {lightbox.photos[lightbox.activeIndex].caption}
                  </div>
                )}

                <div className="absolute bottom-4 right-8 text-white/40 text-xs font-mono tracking-widest uppercase">
                  {lightbox.activeIndex + 1} / {lightbox.photos.length}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
