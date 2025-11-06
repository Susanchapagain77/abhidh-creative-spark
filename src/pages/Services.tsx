import { Link } from "react-router-dom";
import { TrendingUp, Code, Palette, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import digitalMarketingImg from "@/assets/service-digital-marketing.jpg";
import developmentImg from "@/assets/service-development.jpg";
import creativeImg from "@/assets/service-creative.jpg";

const services = [
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    icon: TrendingUp,
    image: digitalMarketingImg,
    description: "We design end-to-end digital marketing solutions that help businesses get discovered, attract customers, and increase sales.",
    details: "From social media campaigns that connect emotionally with audiences to SEO strategies that improve online rankings, and from Google Ads campaigns that deliver instant visibility to data-driven reporting, we ensure every rupee you spend brings value.",
    features: [
      "Social Media Marketing & Management",
      "Search Engine Optimization (SEO)",
      "Google Ads & PPC Campaigns",
      "Content Marketing Strategy",
      "Email Marketing Automation",
      "Analytics & Performance Tracking",
      "Influencer Marketing",
      "Brand Awareness Campaigns",
    ],
  },
  {
    id: "it-development",
    title: "IT & Development Services",
    icon: Code,
    image: developmentImg,
    description: "A great business needs a strong digital foundation. We build robust, scalable, and user-friendly digital products.",
    details: "Our IT services include website design and development, mobile apps, e-commerce platforms, and custom software solutions. We focus on user-friendly design, robust functionality, and long-term support to keep businesses ahead in the digital era.",
    features: [
      "Custom Website Development",
      "E-Commerce Solutions",
      "Mobile App Development (iOS & Android)",
      "Custom Software Development",
      "API Development & Integration",
      "Cloud Solutions & Hosting",
      "Database Design & Management",
      "Maintenance & Technical Support",
    ],
  },
  {
    id: "creative-solutions",
    title: "Creative Solutions",
    icon: Palette,
    image: creativeImg,
    description: "A brand is not just a logo – it is a story. We craft identities that are unique, professional, and memorable.",
    details: "Our creative team helps businesses craft identities that stand out. From branding and graphic design to multimedia production and campaign strategy, we provide the creative spark that makes your brand shine.",
    features: [
      "Brand Identity & Logo Design",
      "Graphic Design & Visual Content",
      "Video Production & Animation",
      "Marketing Collateral Design",
      "UI/UX Design",
      "Photography & Image Editing",
      "Campaign Creative Strategy",
      "Print & Digital Media Design",
    ],
  },
];

export default function Services() {
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
          <div className="space-y-32">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""} animate-fade-in`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl gradient-accent">
                      <service.icon className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                      {service.title}
                    </h2>
                  </div>
                  
                  <p className="text-lg text-foreground mb-4">
                    {service.description}
                  </p>
                  
                  <p className="text-muted-foreground mb-6">
                    {service.details}
                  </p>

                  <Card className="gradient-card border-border/50">
                    <CardHeader>
                      <CardTitle className="text-xl">What We Offer</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <div className="mt-6">
                    <Link to="/contact">
                      <Button variant="hero" size="lg" className="group">
                        Get Started
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className={`${index % 2 === 1 ? "lg:order-1" : ""} animate-slide-in-right`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-custom-lg">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
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
