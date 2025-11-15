import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Code, Palette, TrendingUp, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-creative.jpg";
import digitalMarketingImg from "@/assets/service-digital-marketing.jpg";
import developmentImg from "@/assets/service-development.jpg";
import creativeImg from "@/assets/service-creative.jpg";
import projectEcommerce from "@/assets/project-ecommerce.jpg";
import projectMobileApp from "@/assets/project-mobile-app.jpg";
import projectBranding from "@/assets/project-branding.jpg";
import { useTrainers } from "@/hooks/useTrainers";

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

const pastProjects = [
  {
    title: "E-Commerce Revolution",
    description: "Complete e-commerce platform with 250% increase in online sales",
    image: projectEcommerce,
    stats: { metric: "Revenue Growth", value: "+250%" },
  },
  {
    title: "FinTech Mobile App",
    description: "Cross-platform mobile banking app with 100K+ downloads",
    image: projectMobileApp,
    stats: { metric: "Active Users", value: "100K+" },
  },
  {
    title: "Premium Brand Identity",
    description: "Complete rebrand for luxury hospitality chain across 15 properties",
    image: projectBranding,
    stats: { metric: "Brand Recognition", value: "+180%" },
  },
];

export default function Home() {
  const { trainers, isLoading: trainersLoading, isError: trainersError, error: trainersErrorObj, refetch } = useTrainers();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Abhidh Creative - Digital Innovation"
            className="w-full h-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-primary/55 to-primary/25" />
        </div>
        
        <div className="container relative z-10 mx-auto px-6 lg:px-8">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/85 shadow-[0_12px_35px_-20px_rgba(16,24,64,0.6)] backdrop-blur-md">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 shadow-inner">
                <Sparkles className="h-4 w-4 text-white" />
              </span>
              <span>Where Creativity Meets Technology</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl mb-6">
              Transform Your Digital Presence
            </h1>
            <p className="text-lg leading-8 text-white/85 mb-8">
              Abhidh Creative is where creativity meets strategy, and innovation meets technology. 
              We help businesses stand out in crowded markets and grow in meaningful ways through 
              cutting-edge digital solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/services">
                <Button variant="hero" size="lg" className="group rounded-full">
                  Explore Services
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-white/40 text-white/85 hover:bg-white/15 hover:text-white"
                >
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
            <h2 className="text-base font-semibold leading-7 text-primary">Our Services</h2>
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
                    <span className="text-primary font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-smooth">
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

      {/* Past Projects Section */}
      <section className="py-24 sm:py-32 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16 animate-fade-in">
            <h2 className="text-base font-semibold leading-7 text-primary">Our Work</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Past Projects That Delivered Results
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Real projects, real impact, real growth for our clients
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {pastProjects.map((project, index) => (
              <Card
                key={project.title}
                className="group overflow-hidden border-border/50 hover:shadow-accent transition-smooth animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                  />
                  <div className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-40 transition-smooth" />
                  <div className="absolute bottom-4 right-4 bg-background/95 backdrop-blur-sm rounded-lg p-3 shadow-custom-md">
                    <p className="text-xs font-semibold text-muted-foreground">{project.stats.metric}</p>
                    <p className="text-2xl font-bold text-primary">{project.stats.value}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-secondary transition-smooth">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/gallery">
              <Button variant="secondary" size="lg" className="group">
                View All Projects
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16 animate-fade-in">
            <h2 className="text-base font-semibold leading-7 text-primary">Our Team</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Meet the Experts Behind Your Success
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              A passionate team of professionals dedicated to transforming your vision into reality
            </p>
          </div>

          {trainersError ? (
            <div className="mx-auto max-w-xl rounded-3xl border border-destructive/30 bg-destructive/10 p-8 text-center backdrop-blur-lg">
              <h3 className="text-xl font-semibold text-destructive">Unable to load team roster</h3>
              <p className="mt-2 text-sm text-destructive/80">
                {trainersErrorObj instanceof Error ? trainersErrorObj.message : "Please try again later."}
              </p>
              <Button variant="outline" size="sm" className="mt-6" onClick={() => refetch()}>
                <RefreshCcw className="mr-2 h-4 w-4" />
                Retry
              </Button>
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {trainersLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={`trainer-skeleton-${index}`}
                    className="h-80 rounded-[28px] border border-white/10 bg-card/40 backdrop-blur-lg shadow-[0_20px_65px_-45px_rgba(18,40,90,0.55)] animate-pulse"
                  />
                ))
              : trainers.map((trainer, index) => (
                  <Card
                    key={trainer.id}
                    className="group text-center overflow-hidden border-border/50 hover:shadow-custom-lg transition-smooth animate-fade-in"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div className="relative h-80 overflow-hidden">
                      {trainer.photoUrl ? (
                        <img
                          src={trainer.photoUrl}
                          alt={trainer.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 via-accent/15 to-background text-primary text-3xl font-semibold">
                          {trainer.name.charAt(0)?.toUpperCase()}
                        </div>
                      )}
                      <div className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-20 transition-smooth" />
                    </div>
                    <CardContent className="p-6 space-y-2">
                      <h3 className="text-xl font-semibold">{trainer.name}</h3>
                      <p className="text-primary font-medium">
                        {trainer.expertise ?? "Creative Specialist"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {trainer.years_of_experience
                          ? `${trainer.years_of_experience}+ years of experience`
                          : "Seasoned practitioner from our global network"}
                      </p>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary py-24 sm:py-32">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-secondary-foreground sm:text-4xl mb-6">
            Ready to Build the Future Together?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-secondary-foreground/80 mb-10">
            We don't just provide services – we partner with businesses to build sustainable growth. 
            Whether you're a startup or an established company, our strategies deliver measurable results.
          </p>
          <Link to="/contact">
            <Button variant="cta" size="lg">
              Get a Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
