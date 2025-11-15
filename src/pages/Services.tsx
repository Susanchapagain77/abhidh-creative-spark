import { Link } from "react-router-dom";
import { ArrowRight, BarChart, Clock, Layers, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePrograms } from "@/hooks/usePrograms";
import { hexToRgba, stripHtml } from "@/lib/utils";

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

export default function Services() {
  const { programs, isLoading, isError, error, refetch } = usePrograms(9);
  const hasPrograms = programs.length > 0;

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
              {(hasPrograms ? programs : []).map((program, index) => {
                const highlights = deriveHighlights(program.description);
                const accent = program.accentColor ?? "#1d4ed8";
                const accentLight = hexToRgba(accent, 0.15);
                const accentBorder = hexToRgba(accent, 0.35);

                return (
                  <Card
                    key={program.id}
                    className="group relative overflow-hidden border border-white/10 bg-card/65 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_45px_110px_-55px_rgba(18,40,90,0.7)]"
                    style={{ animationDelay: `${index * 0.12}s` }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(150deg, ${hexToRgba(accent, 0.2)}, transparent 60%)`,
                      }}
                    />
                    <CardContent className="relative space-y-6 p-10">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <Badge
                          className="border border-white/20 bg-white/10 text-xs font-semibold uppercase tracking-wide text-primary backdrop-blur"
                          style={{ color: accent, borderColor: accentBorder, backgroundColor: accentLight }}
                        >
                          {program.categoryLabel}
                        </Badge>
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-muted-foreground backdrop-blur">
                          <Layers className="h-3.5 w-3.5 text-primary" />
                          <span>{program.courses_count ?? 0} offerings</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground">{program.name}</h2>
                        <p className="text-muted-foreground/90 leading-relaxed">
                          {stripHtml(program.description) ||
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
                                <li key={`${program.id}-highlight-${itemIndex}`} className="flex items-start gap-2 leading-relaxed">
                                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: accent }} />
                                  {highlight}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ) : null}

                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground/80">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>
                            Updated{" "}
                            <strong className="text-foreground">
                              {program.updated_at
                                ? new Date(program.updated_at).toLocaleDateString(undefined, {
                                    year: "numeric",
                                    month: "short",
                                  })
                                : "recently"}
                            </strong>
                          </span>
                        </div>
                        <Link to={`/contact?program=${program.id}`}>
                          <Button variant="hero" size="lg" className="group rounded-full">
                            Partner with us
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {!isLoading && !hasPrograms ? (
                <Card className="border border-dashed border-white/20 bg-card/40 p-10 text-center text-muted-foreground">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-foreground">Services coming soon</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      We are curating new creative and technology programs for our partners. Let us know what you need and we&apos;ll build it
                      together.
                    </p>
                    <Link to="/contact">
                      <Button variant="secondary">
                        Start a conversation
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
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
