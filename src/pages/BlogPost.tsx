import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import digitalMarketingImg from "@/assets/service-digital-marketing.jpg";
import developmentImg from "@/assets/service-development.jpg";
import creativeImg from "@/assets/service-creative.jpg";

// Mock blog data - in a real app, this would come from a CMS or API
const blogData: Record<string, any> = {
  "digital-marketing-trends-2025": {
    title: "10 Digital Marketing Trends to Watch in 2025",
    image: digitalMarketingImg,
    category: "Digital Marketing",
    date: "2025-01-15",
    readTime: "5 min read",
    author: "Abhidh Creative Team",
    content: `
      <p>As we step into 2025, the digital marketing landscape continues to evolve at a rapid pace. Staying ahead of these trends is crucial for businesses looking to maintain their competitive edge.</p>
      
      <h2>1. AI-Powered Personalization</h2>
      <p>Artificial Intelligence is revolutionizing how we personalize content for users. From predictive analytics to automated content generation, AI enables marketers to deliver highly targeted experiences at scale.</p>
      
      <h2>2. Voice Search Optimization</h2>
      <p>With the growing adoption of smart speakers and voice assistants, optimizing for voice search has become essential. Focus on conversational keywords and natural language patterns.</p>
      
      <h2>3. Video Content Dominance</h2>
      <p>Short-form video content continues to dominate social media platforms. Brands that leverage platforms like TikTok, Instagram Reels, and YouTube Shorts will see higher engagement rates.</p>
      
      <h2>4. Privacy-First Marketing</h2>
      <p>With increasing privacy regulations and the phasing out of third-party cookies, marketers must adapt to a privacy-first approach. First-party data collection and contextual advertising are becoming more important.</p>
      
      <h2>5. Social Commerce Integration</h2>
      <p>Social media platforms are becoming full-fledged shopping destinations. Integrating e-commerce directly into social media strategies is no longer optional—it's essential.</p>
      
      <h2>Conclusion</h2>
      <p>These trends represent just the beginning of what's to come in digital marketing. Businesses that stay informed and adapt quickly will be best positioned for success in 2025 and beyond.</p>
    `,
  },
  "scalable-web-applications": {
    title: "Building Scalable Web Applications: Best Practices",
    image: developmentImg,
    category: "Development",
    date: "2025-01-10",
    readTime: "8 min read",
    author: "Abhidh Creative Team",
    content: `
      <p>Building scalable web applications requires careful planning, architecture decisions, and implementation strategies. This guide covers essential best practices for creating applications that can grow with your business.</p>
      
      <h2>Architecture Considerations</h2>
      <p>Start with a solid architecture foundation. Consider microservices, serverless functions, or monolithic architecture based on your specific needs and team capabilities.</p>
      
      <h2>Database Design</h2>
      <p>Proper database design is crucial for scalability. Implement indexing strategies, consider database sharding, and choose the right database type (SQL vs NoSQL) for your use case.</p>
      
      <h2>Caching Strategies</h2>
      <p>Implement multiple layers of caching—from CDN caching for static assets to application-level caching for dynamic content. This significantly reduces server load and improves response times.</p>
      
      <h2>Load Balancing</h2>
      <p>Distribute traffic across multiple servers to ensure no single server becomes a bottleneck. Modern cloud providers make this easier than ever with managed load balancing services.</p>
      
      <h2>Monitoring and Analytics</h2>
      <p>Implement comprehensive monitoring from day one. Track performance metrics, error rates, and user behavior to identify bottlenecks before they become critical issues.</p>
    `,
  },
  "color-psychology-branding": {
    title: "The Psychology of Color in Brand Design",
    image: creativeImg,
    category: "Design",
    date: "2025-01-05",
    readTime: "6 min read",
    author: "Abhidh Creative Team",
    content: `
      <p>Colors have a profound psychological impact on how people perceive brands. Understanding color psychology is essential for creating effective brand identities.</p>
      
      <h2>The Power of Blue</h2>
      <p>Blue conveys trust, stability, and professionalism. It's no coincidence that many financial institutions and tech companies use blue in their branding.</p>
      
      <h2>Red for Energy and Urgency</h2>
      <p>Red evokes strong emotions—passion, excitement, and urgency. It's effective for calls-to-action and brands that want to convey energy and boldness.</p>
      
      <h2>Green and Growth</h2>
      <p>Green is associated with nature, growth, and health. It's popular among eco-friendly brands and companies in the wellness industry.</p>
      
      <h2>Cultural Considerations</h2>
      <p>Remember that color meanings can vary significantly across cultures. Always research your target market's cultural associations with colors before finalizing your brand palette.</p>
      
      <h2>Creating Color Harmony</h2>
      <p>A successful brand color palette typically includes a primary color, one or two secondary colors, and neutral tones. Ensure good contrast for accessibility and visual hierarchy.</p>
    `,
  },
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogData[slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link to="/blogs">
            <Button variant="hero">Back to Blogs</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 gradient-hero opacity-95" />
        </div>
        
        <div className="container relative z-10 mx-auto px-6 lg:px-8 py-24">
          <Link to="/blogs" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-8 transition-smooth">
            <ArrowLeft className="h-4 w-4" />
            Back to Blogs
          </Link>
          
          <div className="max-w-3xl">
            <Badge className="gradient-accent text-accent-foreground mb-4">
              {post.category}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl mb-6 animate-fade-in">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
              <div>
                <span>By {post.author}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div 
              className="prose prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-foreground
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-secondary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground prose-strong:font-semibold"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Share Section */}
            <div className="mt-16 pt-8 border-t">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
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
      <section className="gradient-primary py-24">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl mb-6">
            Need Expert Help?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/80 mb-10">
            Let's discuss how we can help transform your digital presence
          </p>
          <Link to="/contact">
            <Button variant="cta" size="lg" className="shadow-accent">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
