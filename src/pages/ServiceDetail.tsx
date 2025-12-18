import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useService } from "@/hooks/useServices";
import { buildAssetUrl } from "@/lib/api";
import { stripHtml, hexToRgba } from "@/lib/utils";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { service, isLoading, isError, error, refetch } = useService(slug || "");

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-96 w-full max-w-4xl animate-pulse rounded-3xl border border-white/10 bg-card/40 backdrop-blur-lg" />
      </div>
    );
  }

  if (isError || !service) {
    return (
      <div className="container mx-auto px-6 py-24">
        <div className="mx-auto max-w-xl rounded-3xl border border-destructive/30 bg-destructive/10 p-8 text-center backdrop-blur-lg">
          <h2 className="text-xl font-semibold text-destructive">Service not found</h2>
          <p className="mt-2 text-sm text-destructive/80">
            {error instanceof Error ? error.message : "The service you're looking for doesn't exist."}
          </p>
          <div className="mt-6 flex gap-4 justify-center">
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Retry
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate("/services")}>
              Back to Services
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const accent = service.accentColor ?? "#1d4ed8";
  const accentLight = hexToRgba(accent, 0.15);
  const accentBorder = hexToRgba(accent, 0.35);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-background">
        {service.thumbnail_url && (
          <>
            <div className="absolute inset-0 z-0">
              <img
                src={buildAssetUrl(service.thumbnail_url)}
                alt={service.name}
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-primary/60 to-primary/30" />
            </div>
          </>
        )}
        
        <div className="container relative z-10 mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/services")}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Button>

            <div className="mb-6">
              <Badge
                className="border border-white/20 bg-white/10 text-xs font-semibold uppercase tracking-wide text-primary backdrop-blur"
                style={{ color: accent, borderColor: accentBorder, backgroundColor: accentLight }}
              >
                {service.category_label}
              </Badge>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              {service.name}
            </h1>

            {service.description && (
              <p className="text-lg leading-8 text-white/85 mb-8">
                {stripHtml(service.description)}
              </p>
            )}

            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button variant="hero" size="lg" className="group rounded-full">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      {service.content && (
        <section className="py-24">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <div dangerouslySetInnerHTML={{ __html: service.content }} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-secondary py-24">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-secondary-foreground sm:text-4xl mb-6">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-secondary-foreground/80 mb-10">
            Let's discuss how {service.name} can help you achieve your business goals
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

