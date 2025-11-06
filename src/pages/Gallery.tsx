import { Card, CardContent } from "@/components/ui/card";
import digitalMarketingImg from "@/assets/service-digital-marketing.jpg";
import developmentImg from "@/assets/service-development.jpg";
import creativeImg from "@/assets/service-creative.jpg";
import heroImage from "@/assets/hero-creative.jpg";

const portfolioItems = [
  {
    title: "Social Media Campaign",
    category: "Digital Marketing",
    image: digitalMarketingImg,
    description: "Complete social media overhaul for a tech startup, resulting in 300% engagement increase",
  },
  {
    title: "E-Commerce Platform",
    category: "Web Development",
    image: developmentImg,
    description: "Custom e-commerce solution with integrated payment gateway and inventory management",
  },
  {
    title: "Brand Identity Design",
    category: "Creative Design",
    image: creativeImg,
    description: "Complete brand identity package including logo, color palette, and style guide",
  },
  {
    title: "Mobile App Development",
    category: "App Development",
    image: heroImage,
    description: "Cross-platform mobile app with seamless user experience and modern UI",
  },
  {
    title: "SEO Optimization",
    category: "Digital Marketing",
    image: digitalMarketingImg,
    description: "SEO strategy implementation leading to first-page rankings for key terms",
  },
  {
    title: "Video Production",
    category: "Creative Design",
    image: creativeImg,
    description: "Promotional video campaign with animated graphics and professional editing",
  },
];

const categories = ["All", "Digital Marketing", "Web Development", "App Development", "Creative Design"];

export default function Gallery() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="gradient-hero py-24 sm:py-32">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-6xl mb-6 animate-fade-in">
            Our Portfolio
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/90 animate-fade-in-up">
            Explore our latest projects and success stories that showcase our expertise
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full text-sm font-semibold transition-smooth bg-muted hover:bg-secondary hover:text-secondary-foreground"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioItems.map((item, index) => (
              <Card
                key={item.title}
                className="group overflow-hidden border-border/50 hover:shadow-accent transition-smooth cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                  />
                  <div className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-60 transition-smooth" />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-secondary text-secondary-foreground">
                      {item.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-secondary transition-smooth">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies CTA */}
      <section className="gradient-primary py-24">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl mb-6">
            Want to See More?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/80 mb-10">
            Discover detailed case studies and learn how we helped businesses achieve their goals
          </p>
        </div>
      </section>
    </div>
  );
}
