import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, BarChart, Clock, RefreshCcw, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useServices } from "@/hooks/useServices";
import { hexToRgba, stripHtml, cn } from "@/lib/utils";
import { buildAssetUrl } from "@/lib/api";

const deriveHighlights = (description?: string | null) => {
  if (!description) {
    return [];
  }

  const sanitized = stripHtml(description);
  const splits = sanitized
    .split(/[\n\.]/)
    .map((item) => item.trim())
    .filter(Boolean);

  return splits.slice(0, 4);
};

const categories = [
  { id: "all", label: "All Services" },
  { id: "digital_marketing", label: "Digital Marketing" },
  { id: "it_development", label: "IT & Development" },
  { id: "creative_solutions", label: "Creative Solutions" },
];

export default function Services() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") || "all";

  const { services, isLoading, isError, error, refetch } = useServices(20, categoryFilter);
  const hasServices = services.length > 0;

  const handleCategoryChange = (id: string) => {
    if (id === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", id);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-secondary py-24 sm:py-32">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-secondary-foreground sm:text-6xl mb-6 animate-fade-in">
            Our Services
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-secondary-foreground/90 animate-fade-in-up">
            Comprehensive digital solutions tailored to help your business thrive in today's competitive landscape
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="border-b py-8 sticky top-0 z-20 bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={categoryFilter === cat.id ? "hero" : "outline"}
                size="sm"
                className={cn(
                  "rounded-full px-6 transition-all duration-300",
                  categoryFilter === cat.id ? "shadow-lg shadow-primary/20 scale-105" : "hover:bg-primary/5"
                )}
                onClick={() => handleCategoryChange(cat.id)}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Details */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-8">
          {isError ? (
            <div className="mx-auto max-w-xl rounded-3xl border border-destructive/30 bg-destructive/10 p-8 text-center backdrop-blur-lg">
              <h2 className="text-xl font-semibold text-destructive">Unable to load services</h2>
              <p className="mt-2 text-sm text-destructive/80">
                {error instanceof Error ? error.message : "Please try again later."}
              </p>
              <Button variant="outline" size="sm" className="mt-6" onClick={() => refetch()}>
                <RefreshCcw className="mr-2 h-4 w-4" />
                Retry
              </Button>
            </div>
          ) : null}

          {isLoading ? (
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={`service-skeleton-${index}`}
                  className="h-96 rounded-3xl border border-white/10 bg-card/40 backdrop-blur-lg shadow-[0_20px_55px_-40px_rgba(18,40,90,0.55)] animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {(hasServices ? services : []).map((service, index) => {
                const highlights = deriveHighlights(service.description);
                const accent = service.accentColor ?? "#1d4ed8";
                const accentLight = hexToRgba(accent, 0.15);
                const accentBorder = hexToRgba(accent, 0.35);

                return (
                  <Card
                    key={service.id}
                    className="group relative overflow-hidden border bg-card/65 backdrop-blur-xl transition-all duration-500 shadow-[0_4px_20px_-8px_rgba(18,40,90,0.25)] hover:-translate-y-2 hover:shadow-[0_45px_110px_-55px_rgba(18,40,90,0.7)] animate-fade-in"
                    style={{ 
                      animationDelay: `${index * 0.12}s`,
                      borderColor: hexToRgba(accent, 0.15),
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = hexToRgba(accent, 0.4);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = hexToRgba(accent, 0.15);
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(150deg, ${hexToRgba(accent, 0.25)}, ${hexToRgba(accent, 0.1)} 40%, transparent 70%)`,
                        boxShadow: `inset 0 0 60px ${hexToRgba(accent, 0.15)}`,
                      }}
                    />
                    <CardContent className="relative space-y-6 p-10">
                      {/* Thumbnail */}
                      {service.thumbnail_url && (
                        <div className="relative h-48 w-full overflow-hidden rounded-lg border border-white/5">
                          <img
                            src={buildAssetUrl(service.thumbnail_url)}
                            alt={service.name}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>
                      )}

                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <Badge
                          className="border border-white/20 bg-white/10 text-xs font-semibold uppercase tracking-wide text-primary backdrop-blur"
                          style={{ color: accent, borderColor: accentBorder, backgroundColor: accentLight }}
                        >
                          {service.category_label}
                        </Badge>
                        {service.featured && (
                          <Badge variant="default" className="text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-3">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">{service.name}</h2>
                        <p className="text-muted-foreground/90 leading-relaxed font-medium">
                          {stripHtml(service.description) ||
                            "Experience a curated mix of strategy, design, and technology tailored to your goals."}
                        </p>
                      </div>

                      {highlights.length ? (
                        <Card className="border border-white/10 bg-white/5 backdrop-blur">
                          <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
                              <BarChart className="h-4 w-4 text-primary" />
                              Key outcomes
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <ul className="grid grid-cols-1 gap-3 text-sm text-muted-foreground">
                              {highlights.map((highlight, itemIndex) => (
                                <li key={`${service.id}-highlight-${itemIndex}`} className="flex items-start gap-2 leading-relaxed">
                                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: accent }} />
                                  {highlight}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ) : null}

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
                        <div className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground/80">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>
                            Updated{" "}
                            <strong className="text-foreground">
                              {service.updated_at
                                ? new Date(service.updated_at).toLocaleDateString(undefined, {
                                    year: "numeric",
                                    month: "short",
                                  })
                                : "recently"}
                            </strong>
                          </span>
                        </div>
                        <Link to={`/services/${service.slug}`}>
                          <Button variant="hero" size="lg" className="group rounded-full px-8 shadow-lg shadow-primary/20">
                            Explore Service
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {!isLoading && !hasServices ? (
                <div className="lg:col-span-2 py-20 text-center border border-dashed border-white/10 rounded-3xl bg-white/5 animate-fade-in">
                  <Layers className="h-12 w-12 mx-auto text-muted-foreground/20 mb-4" />
                  <h3 className="text-xl font-semibold text-foreground">No services found in this category</h3>
                  <p className="mt-2 text-muted-foreground">Please check back soon or reset the filters to see all services.</p>
                  <Button variant="link" className="mt-4 text-primary" onClick={() => handleCategoryChange("all")}>
                    Reset Filters
                  </Button>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary py-24">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-secondary-foreground sm:text-4xl mb-6">
            Ready to Elevate Your Business?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-secondary-foreground/80 mb-10">
            Let's discuss how our services can help you achieve your business goals
          </p>
          <Link to="/contact">
            <Button variant="cta" size="lg">
              Schedule a Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
