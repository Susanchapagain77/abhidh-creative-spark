import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useContactForm } from "@/hooks/useContactForm";
import { useSearchParams } from "react-router-dom";

export default function Contact() {
  const [searchParams] = useSearchParams();
  const defaultSubject = searchParams.get("program")
    ? `Creative program inquiry: ${searchParams.get("program")}`
    : searchParams.get("service")
      ? `Service inquiry: ${searchParams.get("service")}`
      : "";

  const { form, onSubmit, isSubmitting } = useContactForm(defaultSubject);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-background" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-semibold text-primary backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Let&apos;s Build Your Next Digital Solution
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Contact Abhidh Creative</h1>
            <p className="text-lg text-muted-foreground/90 md:text-xl">
              Share your vision, and our creative team will help you craft the perfect digital solution for your business.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_0.9fr]">
            <Card className="border border-white/10 bg-card/70 backdrop-blur">
              <CardContent className="space-y-6 p-8">
                <h2 className="text-2xl font-semibold text-foreground">Tell us about your project</h2>
                <p className="text-sm text-muted-foreground">
                  Our team typically responds within 24 hours. We&apos;ll schedule a discovery call to understand your goals and
                  suggest the best solution fit.
                </p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>Full name</FormLabel>
                            <FormControl>
                              <Input placeholder="Alex Sharma" autoComplete="name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>Work email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="you@company.com" autoComplete="email" required {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>Contact number</FormLabel>
                            <FormControl>
                              <Input placeholder="+977-9800000000" autoComplete="tel" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>How can we help?</FormLabel>
                            <FormControl>
                              <Input placeholder="Custom website for our business" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Share details about your project requirements</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={6}
                              placeholder="Tell us about your business, preferred timeline, expected outcomes, or any specific features you want to focus on."
                              className="resize-y"
                              required
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full rounded-full bg-accent px-6 py-6 text-base font-semibold text-accent-foreground hover:bg-accent/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit request"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card className="border border-accent/20 bg-gradient-to-br from-primary/10 via-background to-background shadow-xl">
              <CardContent className="space-y-6 p-8">
                <h2 className="text-2xl font-semibold text-foreground">Why partner with Abhidh Creative?</h2>
                <ul className="space-y-4 text-sm text-foreground">
                  {[
                    "Customized solutions aligned with your brand",
                    "Expert designers and developers with industry experience",
                    "Flexible engagement models (project-based, retainer, hybrid)",
                    "Post-launch support and maintenance",
                    "Dedicated project manager for every engagement",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-foreground backdrop-blur">
                  <h3 className="text-lg font-semibold">We&apos;d love to meet you</h3>
                  <p>
                    Visit us at <strong>Nardevi, Kathmandu, Nepal</strong> or call us at{" "}
                    <a href="tel:+9779801110981" className="font-semibold text-primary">
                      +977-9801110981
                    </a>
                    .
                  </p>
                  <p>
                    You can also email us directly at{" "}
                    <a href="mailto:info@abhidhgroup.com" className="font-semibold text-primary">
                      info@abhidhgroup.com
                    </a>
                    .
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
