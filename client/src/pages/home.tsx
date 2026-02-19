
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Rocket, Shield, Building2, Cpu, Car, BookOpen, Globe, ChevronRight } from "lucide-react";
import SeoHead from "@/components/seo/SeoHead";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { HOMEPAGE_CONTENT } from "@/lib/content";
import { VENTURES } from "@/lib/ventures";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Turnstile } from "@/components/ui/turnstile";
import { useRef, useEffect, useState } from "react";

const TURNSTILE_SITE_KEY = "0x4AAAAAAACKiLPAChAxdXBJs";

const leadFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  interest: z.string().min(1, "Please select an area of interest"),
  bot_field: z.string().optional(),
  token: z.string().optional()
});

// Animated counter component
function AnimatedCounter({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-bold mb-3 gradient-text">
        {count}{suffix}
      </div>
      <div className="text-gray-400 text-sm uppercase tracking-widest font-medium">{label}</div>
    </div>
  );
}

// Service icon mapping
const SERVICE_ICONS = [Cpu, Shield, Building2];

export default function Home() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.95]);

  const form = useForm<z.infer<typeof leadFormSchema>>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      email: "",
      interest: "",
    },
  });

  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      interestArea: string;
      message: string;
      bot_field?: string;
      token?: string;
    }) => {
      await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible."
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      });
    }
  });

  const onSubmit = (data: z.infer<typeof leadFormSchema>) => {
    contactMutation.mutate({
      name: data.name,
      email: data.email,
      interestArea: data.interest,
      message: "Lead from Homepage Hero Form",
      bot_field: data.bot_field,
      token: data.token
    });
  };

  // JSON-LD Organization Schema for SEO
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ZeengoCorp Innovations Pvt. Ltd.",
    "alternateName": "ZeengoCorp",
    "url": "https://zeengocorp.com",
    "logo": "https://zeengocorp.com/logo.png",
    "description": "ZeengoCorp is a venture builder and innovation studio that funds, builds, and scales high-impact ventures in AI, real estate, security, mobility, and digital publishing.",
    "foundingDate": "2024",
    "founder": {
      "@type": "Person",
      "name": "Abhishek Rajput"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.linkedin.com/company/zeengocorp"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": "https://zeengocorp.com/contact"
    }
  };

  return (
    <>
      <SeoHead
        title="ZeengoCorp - We Build What Matters"
        description="ZeengoCorp Innovations is a venture builder and innovation studio. We fund, build, and scale high-impact ventures in AI, real estate, security, mobility, and digital publishing."
        url="/"
        jsonLd={organizationSchema}
      />

      <div className="bg-black text-white min-h-screen font-sans selection:bg-white/30 selection:text-white">

        {/* Dynamic Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#333] rounded-full blur-[200px] opacity-15" style={{ animation: 'subtle-pulse 8s ease-in-out infinite' }} />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#1a1a2e] rounded-full blur-[200px] opacity-15" style={{ animation: 'subtle-pulse 8s ease-in-out infinite 4s' }} />
          <div className="absolute top-[40%] left-[50%] w-[30%] h-[30%] bg-[#0a0a20] rounded-full blur-[150px] opacity-10" style={{ animation: 'subtle-pulse 6s ease-in-out infinite 2s' }} />
        </div>

        {/* ============ HERO SECTION ============ */}
        <motion.section
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-4 z-10"
        >
          <div className="container mx-auto grid lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Typographic Hero */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-7"
            >
              <div className="inline-block px-4 py-1.5 mb-8 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm">
                <span className="text-xs font-semibold tracking-widest uppercase text-gray-300">🚀 Venture Builder & Innovation Studio</span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-black mb-8 leading-[0.92] tracking-tighter">
                We Build <br />
                <span className="gradient-text">
                  What Matters.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-xl font-light">
                {HOMEPAGE_CONTENT.hero.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-black hover:bg-gray-200 font-bold rounded-full px-8 py-6 text-base transition-all hover:scale-[1.03] active:scale-[0.97]"
                >
                  <Link href="/about">Discover More</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 py-6 text-base font-medium"
                >
                  <Link href="/ventures">Our Ventures</Link>
                </Button>
              </div>
            </motion.div>

            {/* Spacer */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-1 hidden lg:block"
            ></motion.div>

            {/* Right Column: Glassmorphic Lead Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-4 bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-[0_0_80px_-20px_rgba(255,255,255,0.08)] relative overflow-hidden group"
            >
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <h3 className="text-2xl font-bold mb-2">Build with us</h3>
              <p className="text-gray-400 mb-6 text-sm">Join the next wave of innovation.</p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Name" {...field} className="bg-black/40 border-white/10 text-white h-12 px-4 rounded-xl focus:ring-1 focus:ring-white/20 transition-all placeholder:text-gray-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Email" {...field} className="bg-black/40 border-white/10 text-white h-12 px-4 rounded-xl focus:ring-1 focus:ring-white/20 transition-all placeholder:text-gray-500" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="interest"
                    render={({ field }) => (
                      <FormItem>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-black/40 border-white/10 text-white h-12 px-4 rounded-xl focus:ring-1 focus:ring-white/20 transition-all">
                              <SelectValue placeholder="I'm interested in..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#111] border-white/10 text-white">
                            <SelectItem value="Building a Venture">Building a Venture</SelectItem>
                            <SelectItem value="Investing">Investing</SelectItem>
                            <SelectItem value="Partnership">Partnership</SelectItem>
                            <SelectItem value="AI Solutions">AI Solutions</SelectItem>
                            <SelectItem value="Real Estate">Real Estate</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Honeypot Field - Hidden */}
                  <FormField
                    control={form.control}
                    name="bot_field"
                    render={({ field }) => (
                      <FormItem className="hidden">
                        <FormControl>
                          <Input {...field} tabIndex={-1} autoComplete="off" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-center">
                    <Turnstile
                      siteKey={TURNSTILE_SITE_KEY}
                      onVerify={(token) => {
                        form.setValue("token", token);
                        form.trigger("token");
                      }}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-white text-black hover:bg-gray-200 font-bold h-12 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? "Starting..." : "Start Conversation"}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20 animate-bounce"
          >
            <ArrowRight className="w-6 h-6 rotate-90" />
          </motion.div>
        </motion.section>

        {/* ============ ABOUT / MISSION SECTION ============ */}
        <section className="relative py-28 bg-black z-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="block text-sm font-semibold tracking-[0.2em] text-gray-500 mb-8 uppercase">Our Mission</span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-12">
                We are an incubator for high-impact ventures. We provide{" "}
                <span className="text-white/40">capital</span>,{" "}
                <span className="text-white/40">technical resources</span>, and{" "}
                <span className="text-white/40">operational support</span> to builders.
              </h2>
              <div className="grid md:grid-cols-2 gap-10 border-t border-white/10 pt-10">
                <div className="group">
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-gray-300 transition-colors">Venture Building</h3>
                  <p className="text-gray-400 leading-relaxed">
                    We don't just invest; we co-build. From ideation to product-market fit, our internal teams work alongside founders to de-risk execution.
                  </p>
                </div>
                <div className="group">
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-gray-300 transition-colors">Strategic Capital</h3>
                  <p className="text-gray-400 leading-relaxed">
                    We deploy patience capital that understands the nonlinear journey of innovation. We bet on people first, ideas second.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============ SERVICES SECTION ============ */}
        <section className="relative py-28 bg-zinc-950/50 z-20">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-sm font-semibold tracking-[0.2em] text-gray-500 uppercase">What We Do</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">Our Services</h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
                From AI-powered tools to real estate solutions, we build technology that solves real problems.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {HOMEPAGE_CONTENT.services.map((service, index) => {
                const Icon = SERVICE_ICONS[index];
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                  >
                    <Link href={service.link}>
                      <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 h-full hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 group cursor-pointer card-glow">
                        <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                          <Icon className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                        <p className="text-gray-400 leading-relaxed mb-4">{service.description}</p>
                        <span className="inline-flex items-center text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                          Learn More <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ VENTURES SHOWCASE ============ */}
        <section className="relative py-28 bg-black z-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-sm font-semibold tracking-[0.2em] text-gray-500 uppercase">Portfolio</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">Our Ventures</h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
                Ventures we're building and scaling — from prototype to market leader.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {VENTURES.map((venture, index) => {
                const Icon = venture.icon;
                const statusColors: Record<string, string> = {
                  'Live': 'bg-green-500/20 text-green-400 border-green-500/30',
                  'Scaling': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
                  'In Development': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
                  'Prototype': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
                };
                return (
                  <motion.div
                    key={venture.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Link href={`/ventures/${venture.slug}`}>
                      <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 group cursor-pointer h-full">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors`}>
                            <Icon className={`w-6 h-6 ${venture.color}`} />
                          </div>
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusColors[venture.status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
                            {venture.status}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold mb-2 text-white">{venture.title}</h3>
                        <p className="text-sm text-gray-500 mb-3 font-medium">{venture.tagline}</p>
                        <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">{venture.description}</p>
                        <div className="mt-4 flex items-center text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                          Explore <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 font-medium"
              >
                <Link href="/ventures">View All Ventures <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* ============ STATS SECTION ============ */}
        <section className="relative py-24 z-20 gradient-border">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-zinc-950 to-black" />
          <div className="container mx-auto px-4 relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <AnimatedCounter target={5} suffix="+" label="Ventures Launched" />
              <AnimatedCounter target={20} suffix="+" label="Team Members" />
              <AnimatedCounter target={12} suffix="+" label="Cities Reached" />
              <AnimatedCounter target={2} suffix="+" label="Years Building" />
            </div>
          </div>
        </section>

        {/* ============ TESTIMONIALS SECTION ============ */}
        <section className="relative py-28 bg-black z-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-sm font-semibold tracking-[0.2em] text-gray-500 uppercase">Testimonials</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">What People Say</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {HOMEPAGE_CONTENT.testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 relative overflow-hidden"
                >
                  <div className="absolute top-4 left-6 text-6xl font-serif text-white/5 select-none">"</div>
                  <blockquote className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6 relative z-10 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-white">{testimonial.author.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{testimonial.author}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CTA SECTION ============ */}
        <section className="relative py-28 z-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6">{HOMEPAGE_CONTENT.cta.title}</h2>
              <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                {HOMEPAGE_CONTENT.cta.content}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-black hover:bg-gray-200 font-bold rounded-full px-8 py-6 text-base transition-all hover:scale-[1.03] active:scale-[0.97]"
                >
                  <Link href="/contact">{HOMEPAGE_CONTENT.cta.primary}</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 py-6 text-base font-medium"
                >
                  <Link href="/contact">{HOMEPAGE_CONTENT.cta.secondary}</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
}