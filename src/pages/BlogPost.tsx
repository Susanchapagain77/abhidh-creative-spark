import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchFromApi, ApiResponse, buildAssetUrl } from "@/lib/api";
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

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading, isError, error } = useQuery<ApiResponse<BlogPost>>({
    queryKey: ["creative-blog-post", slug],
    queryFn: () => fetchFromApi<ApiResponse<BlogPost>>(`/blogs/${slug}`),
    enabled: Boolean(slug),
  });

  const post = data?.data;

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Unable to load article</h1>
          <p className="text-muted-foreground">{error instanceof Error ? error.message : "Please try again later."}</p>
          <Link to="/blogs">
            <Button variant="hero">Back to Blogs</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!isLoading && !post) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Post Not Found</h1>
          <Link to="/blogs">
            <Button variant="hero">Back to Blogs</Button>
          </Link>
        </div>
      </div>
    );
  }

  const heroImage = buildAssetUrl(post?.image_url);
  const readTime = estimateReadTime(post?.content);
  const category = formatOption(post?.option);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {heroImage ? (
            <img src={heroImage} alt={post?.title ?? "Blog hero"} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-primary/25 via-secondary/25 to-background" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/65 via-transparent to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-6 py-24 lg:px-8">
          <Link
            to="/blogs"
            className="mb-8 inline-flex items-center gap-2 text-primary-foreground/80 transition hover:text-primary-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blogs
          </Link>

          <div className="max-w-3xl space-y-6">
            <Badge className="border border-white/20 bg-white/15 text-xs font-semibold text-white backdrop-blur">
              {category}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {post?.title ?? "Loading..."}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-white/85">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {post?.published_at
                    ? new Date(post.published_at).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Unpublished"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={`paragraph-${index}`} className="h-4 w-full animate-pulse rounded-full bg-muted/40" />
                ))}
              </div>
            ) : (
              <div
                className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-foreground prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-strong:font-semibold"
                dangerouslySetInnerHTML={{
                  __html:
                    post?.content ??
                    "<p>We&apos;re preparing this story. Please check back soon for a deep dive into our latest work.</p>",
                }}
              />
            )}

            {/* Share Section */}
            <div className="mt-16 border-t pt-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="flex items-center gap-2 text-xl font-semibold">
                  <Share2 className="h-5 w-5" />
                  Share this article
                </h3>
                <div className="flex gap-3">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary via-accent to-primary/80 py-24 text-primary-foreground">
        <div className="container mx-auto px-6 text-center lg:px-8">
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">Need Expert Help?</h2>
          <p className="mx-auto mt-6 mb-10 max-w-2xl text-lg leading-8 text-primary-foreground/85">
            Let&apos;s discuss how we can help transform your digital presence.
          </p>
          <Link to="/contact">
            <Button variant="hero" size="lg" className="rounded-full">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
