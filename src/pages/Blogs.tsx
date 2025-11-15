import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { fetchFromApi, PaginatedResponse, buildAssetUrl } from "@/lib/api";
import { stripHtml } from "@/lib/utils";

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

const estimateReadTime = (content: string | null | undefined) => {
  const words = stripHtml(content).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

export default function Blogs() {
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

  const formatDate = (dateString?: string | null) => {
    if (!dateString) {
      return "Unpublished";
    }
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-background" />
        <div className="container relative mx-auto px-6 text-center lg:px-8">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl animate-fade-in">
            Insights & Updates
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground animate-fade-in-up">
            Stay ahead with fresh perspectives on design, marketing, development, and brand storytelling.
          </p>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="border-b py-12">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "hero" : "outline"}
                size="sm"
                className="rounded-full px-5 py-2 text-sm font-semibold transition-all"
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-8">
          {isError ? (
            <div className="mx-auto max-w-xl rounded-3xl border border-destructive/30 bg-destructive/10 p-8 text-center backdrop-blur-lg">
              <h2 className="text-xl font-semibold text-destructive">Unable to load blog posts</h2>
              <p className="mt-2 text-sm text-destructive/80">{error instanceof Error ? error.message : "Please try again."}</p>
              <Button variant="outline" size="sm" className="mt-6" onClick={() => refetch()}>
                Retry
              </Button>
            </div>
          ) : null}

          {isLoading ? (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={`blog-skeleton-${index}`}
                  className="h-96 rounded-3xl border border-white/10 bg-card/40 backdrop-blur-lg shadow-[0_20px_45px_-35px_rgba(18,40,90,0.5)] animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {filteredPosts.map((post, index) => {
                const readTime = estimateReadTime(post.content);
                const heroImage = buildAssetUrl(post.image_url);

                return (
                  <Card
                    key={post.id}
                    className="group flex flex-col overflow-hidden border-white/10 bg-card/60 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_100px_-45px_rgba(18,40,90,0.7)] animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative h-56 overflow-hidden">
                      {heroImage ? (
                        <img
                          src={heroImage}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 to-accent/10 text-primary">
                          Abhidh Creative
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/35 via-transparent to-transparent opacity-80" />
                      <div className="absolute top-4 left-4 rounded-full border border-white/20 bg-background/80 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
                        {formatOption(post.option)}
                      </div>
                    </div>

                    <CardContent className="flex flex-grow flex-col p-6">
                      <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="inline-flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(post.published_at)}</span>
                        </div>
                        <div className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{readTime} min read</span>
                        </div>
                      </div>

                      <h3 className="mb-3 line-clamp-2 text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                        {post.title}
                      </h3>

                      <p className="line-clamp-3 text-sm text-muted-foreground">
                        {stripHtml(post.content) ||
                          "Discover the strategies and creative approaches powering our latest client successes."}
                      </p>
                    </CardContent>

                    <CardFooter className="p-6 pt-0">
                      <Link to={`/blogs/${post.slug}`}>
                        <Button variant="link" className="group/btn h-auto p-0 text-primary">
                          Read Article
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}

          {!isLoading && !filteredPosts.length && !isError ? (
            <div className="mt-16 text-center text-muted-foreground">
              No articles are available for this topic yet. Please check back soon.
            </div>
          ) : null}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-br from-primary/20 via-secondary/10 to-background py-24">
        <div className="container mx-auto px-6 text-center lg:px-8">
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Stay Updated
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground/85">
            Subscribe to our newsletter and never miss an update on digital trends and creative possibilities.
          </p>
        </div>
      </section>
    </div>
  );
}
