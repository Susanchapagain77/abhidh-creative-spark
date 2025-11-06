import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Code, Palette, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-creative.jpg";
import digitalMarketingImg from "@/assets/service-digital-marketing.jpg";
import developmentImg from "@/assets/service-development.jpg";
import creativeImg from "@/assets/service-creative.jpg";

const services = [
  {
    title: "Digital Marketing",
    description: "End-to-end digital marketing solutions from social media campaigns to SEO strategies that improve rankings and deliver measurable results.",
    image: digitalMarketingImg,
    icon: TrendingUp,
    link: "/services#digital-marketing",
  },
  {
    title: "IT & Development",
    description: "Website design, mobile apps, e-commerce platforms, and custom software solutions with user-friendly design and robust functionality.",
    image: developmentImg,
    icon: Code,
    link: "/services#it-development",
  },
  {
    title: "Creative Solutions",
    description: "Branding, graphic design, multimedia production, and campaign strategy that crafts unique, professional, and memorable brand identities.",
    image: creativeImg,
    icon: Palette,
    link: "/services#creative-solutions",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Abhidh Creative - Digital Innovation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 gradient-hero opacity-90" />
        </div>
        
        <div className="container relative z-10 mx-auto px-6 lg:px-8">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-6 w-6 text-secondary animate-float" />
              <span className="text-sm font-semibold text-secondary uppercase tracking-wide">
                Where Creativity Meets Technology
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-6xl lg:text-7xl mb-6">
              Transform Your Digital Presence
            </h1>
            <p className="text-lg leading-8 text-primary-foreground/90 mb-8">
              Abhidh Creative is where creativity meets strategy, and innovation meets technology. 
              We help businesses stand out in crowded markets and grow in meaningful ways through 
              cutting-edge digital solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/services">
                <Button variant="hero" size="lg" className="group">
                  Explore Services
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="bg-background/10 backdrop-blur-sm border-primary-foreground/20 text-primary-foreground hover:bg-background/20">
                  Get Free Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16 animate-fade-in">
            <h2 className="text-base font-semibold leading-7 text-secondary">Our Services</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Comprehensive Digital Solutions
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We provide end-to-end services that help businesses thrive in the digital age
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {services.map((service, index) => (
              <Link
                key={service.title}
                to={service.link}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="h-full overflow-hidden border-border/50 hover:shadow-accent transition-smooth transform hover:-translate-y-2">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                    />
                    <div className="absolute inset-0 gradient-primary opacity-20 group-hover:opacity-30 transition-smooth" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg gradient-accent">
                        <service.icon className="h-5 w-5 text-accent-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold">{service.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <span className="text-secondary font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-smooth">
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-primary py-24 sm:py-32">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl mb-6">
            Ready to Build the Future Together?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/80 mb-10">
            We don't just provide services – we partner with businesses to build sustainable growth. 
            Whether you're a startup or an established company, our strategies deliver measurable results.
          </p>
          <Link to="/contact">
            <Button variant="cta" size="lg" className="shadow-accent">
              Get a Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
