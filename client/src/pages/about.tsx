import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronRight, Target, Lightbulb, Users } from "lucide-react";
import SeoHead from "@/components/seo/SeoHead";

const UPCOMING_PROJECTS = [
  {
    title: "Real Estate Solutions",
    description: "AI-powered, trust-driven real estate platform connecting buyers, sellers, and verified brokers.",
    icon: "🏢"
  },
  {
    title: "Zeengo GPT",
    description: "Next-generation AI integration for WhatsApp Business API, providing intelligent customer interactions.",
    icon: "🤖"
  },
  {
    title: "Security & Manpower",
    description: "Premium security services with verified personnel and advanced tech-based solutions.",
    icon: "🛡️"
  },
  {
    title: "Yatree App",
    description: "Secure, compliance-focused ride-sharing application with real-time ride-matching.",
    icon: "🚗"
  },
  {
    title: "Digital Content & Publishing",
    description: "Expanding digital content through Zeengo publications, focusing on self-help and business strategy.",
    icon: "📚"
  }
];

export default function About() {
  const founderSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Abhishek Rajput",
    "jobTitle": "Founder & CEO",
    "affiliation": {
      "@type": "Organization",
      "name": "ZeengoCorp Innovations Pvt. Ltd."
    },
    "url": "https://zeengocorp.com/about",
    "sameAs": [
      "https://www.linkedin.com/in/abhishekrajput",
      "https://twitter.com/abhishekrajput"
    ],
    "description": "Founder of ZeengoCorp. Dedicated to building scalable, human-centered technologies."
  };

  return (
    <>
      <SeoHead
        title="About Us - We Build What Matters"
        description="ZeengoCorp combines human-centered design, engineering discipline, and rapid validation to turn ideas into products that create measurable value."
        jsonLd={founderSchema}
      />

      <div className="bg-black text-white min-h-screen">
        {/* Hero Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-10 tracking-tight">
                We Build What Matters.
              </h1>
              <div className="text-xl md:text-2xl text-gray-300 space-y-8 leading-relaxed">
                <p>
                  ZeengoCorp builds what matters. We believe the highest form of innovation is the one that people actually use — not the one that wins awards.
                </p>
                <p>
                  Our work combines human-centered design, engineering discipline, and rapid validation to turn ideas into products that create measurable value. We partner with founders and enterprises to prototype fast, test in real contexts, and scale only the solutions that show repeatable commercial and social outcomes.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-24 bg-zinc-950 border-t border-white/5">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-zinc-900/50 p-10 rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
              >
                <Target className="w-10 h-10 mb-6 text-white" />
                <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  To replace "innovation theater" with practical, scalable solutions. We aspire to build a portfolio of companies that independently solve critical challenges in real estate, mobility, and enterprise intelligence.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-zinc-900/50 p-10 rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
              >
                <Lightbulb className="w-10 h-10 mb-6 text-white" />
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Shorten the cycle between "idea" and "impact". We exist to create technology that reduces friction, increases access, and improves efficiency for millions of users globally.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-zinc-900 p-12 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <Users className="w-8 h-8 text-white" />
                    <h2 className="text-3xl font-bold">Leadership</h2>
                  </div>

                  <h3 className="text-2xl font-semibold mb-2">Abhishek Rajput</h3>
                  <div className="text-gray-500 mb-8 uppercase tracking-widest text-sm font-bold">Founder & CEO</div>

                  <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                    <p>
                      Abhishek Rajput is a dynamic entrepreneur who believes in the power of practical execution over theoretical strategy. A commerce graduate from Delhi University, he combines a strong foundation in business fundamentals with accolades in competitive sports like swimming and boxing—disciplines that taught him resilience and the value of rigorous training.
                    </p>
                    <p>
                      With leadership experience from prestigious NCC events nationwide and deep expertise in online marketing and sales, Abhishek founded ZeengoCorp to bridge the gap between "digital potential" and "real-world application". He is committed to building a culture where accountability and craftsmanship come first.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Ventures / Projects */}
        <section className="py-24 bg-zinc-950 border-t border-white/5">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Active Ventures</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {UPCOMING_PROJECTS.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-black p-8 rounded-xl border border-zinc-800 hover:border-zinc-600 transition-colors group"
                >
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 inline-block">{project.icon}</div>
                  <h3 className="text-xl font-bold mb-4">{project.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{project.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8">Join Our Innovation Journey</h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                If you value craftsmanship, accountability, and the humility to iterate until something genuinely matters, you'll fit right in.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-6 rounded-full font-bold"
              >
                <Link href="/contact">Partner With Us</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}