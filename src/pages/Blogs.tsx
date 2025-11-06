import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import digitalMarketingImg from "@/assets/service-digital-marketing.jpg";
import developmentImg from "@/assets/service-development.jpg";
import creativeImg from "@/assets/service-creative.jpg";

const blogPosts = [
  {
    title: "10 Digital Marketing Trends to Watch in 2025",
    excerpt: "Stay ahead of the curve with these emerging digital marketing strategies that will dominate the industry.",
    image: digitalMarketingImg,
    category: "Digital Marketing",
    date: "2025-01-15",
    readTime: "5 min read",
    slug: "digital-marketing-trends-2025",
  },
  {
    title: "Building Scalable Web Applications: Best Practices",
    excerpt: "Learn the essential principles for creating web applications that can grow with your business needs.",
    image: developmentImg,
    category: "Development",
    date: "2025-01-10",
    readTime: "8 min read",
    slug: "scalable-web-applications",
  },
  {
    title: "The Psychology of Color in Brand Design",
    excerpt: "Discover how color choices impact brand perception and customer behavior in your marketing materials.",
    image: creativeImg,
    category: "Design",
    date: "2025-01-05",
    readTime: "6 min read",
    slug: "color-psychology-branding",
  },
  {
    title: "SEO in 2025: What Really Matters",
    excerpt: "Cut through the noise and focus on SEO strategies that actually move the needle for your website rankings.",
    image: digitalMarketingImg,
    category: "SEO",
    date: "2024-12-28",
    readTime: "7 min read",
    slug: "seo-2025-guide",
  },
  {
    title: "Mobile-First Development: Why It Matters",
    excerpt: "Understanding the importance of mobile-first approach in modern web development and how to implement it.",
    image: developmentImg,
    category: "Development",
    date: "2024-12-20",
    readTime: "5 min read",
    slug: "mobile-first-development",
  },
  {
    title: "Creating a Consistent Brand Voice",
    excerpt: "Learn how to develop and maintain a unique brand voice that resonates with your target audience.",
    image: creativeImg,
    category: "Branding",
    date: "2024-12-15",
    readTime: "6 min read",
    slug: "consistent-brand-voice",
  },
];

const categories = ["All", "Digital Marketing", "Development", "Design", "SEO", "Branding"];

export default function Blogs() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="gradient-hero py-24 sm:py-32">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-6xl mb-6 animate-fade-in">
            Insights & Updates
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/90 animate-fade-in-up">
            Stay informed with the latest trends, tips, and insights from the world of digital marketing and technology
          </p>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="px-4 py-2 text-sm font-semibold cursor-pointer hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-smooth"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <Card
                key={post.slug}
                className="group overflow-hidden border-border/50 hover:shadow-accent transition-smooth cursor-pointer flex flex-col animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="gradient-accent text-accent-foreground">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6 flex-grow">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-secondary transition-smooth line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                </CardContent>
                
                <CardFooter className="p-6 pt-0">
                  <Link to={`/blogs/${post.slug}`}>
                    <Button variant="link" className="p-0 h-auto group/btn">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="gradient-primary py-24">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl mb-6">
            Stay Updated
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/80 mb-10">
            Subscribe to our newsletter and never miss an update on the latest digital trends and insights
          </p>
        </div>
      </section>
    </div>
  );
}
