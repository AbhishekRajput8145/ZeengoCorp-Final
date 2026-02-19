
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import SeoHead from "@/components/seo/SeoHead";

import { VENTURES } from "@/lib/ventures";

export default function Ventures() {
    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": VENTURES.map((venture, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `https://zeengocorp.com/ventures/${venture.slug}`,
            "name": venture.title,
            "description": venture.description
        }))
    };

    return (
        <>
            <SeoHead
                title="Our Companies & Ventures"
                description="Explore ZeengoCorp's portfolio of companies across Real Estate, Artificial Intelligence, Security, and Mobility."
                jsonLd={itemListSchema}
            />

            <div className="bg-black text-white min-h-screen">
                <section className="py-24">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center max-w-4xl mx-auto mb-20"
                        >
                            <h1 className="text-5xl md:text-7xl font-bold mb-8">Our Ventures</h1>
                            <p className="text-xl text-gray-300">
                                ZeengoCorp operates as a holding company for specialized ventures. Each company acts independently but shares our core DNA: practical innovation and rapid scale.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                            {VENTURES.map((venture, index) => (
                                <motion.div
                                    key={venture.slug}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-zinc-700 transition-all flex flex-col group"
                                >
                                    <div className="flex items-start justify-between mb-8">
                                        <div className={`p-4 rounded-xl bg-white/5 ${venture.color}`}>
                                            <venture.icon className="w-8 h-8" />
                                        </div>
                                        <Button variant="ghost" className="rounded-full text-white/50 group-hover:text-white group-hover:bg-white/10" asChild>
                                            <Link href={`/ventures/${venture.slug}`}>
                                                Details <ArrowRight className="ml-2 w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </div>

                                    <h2 className="text-3xl font-bold mb-3">{venture.title}</h2>
                                    <p className="text-gray-400 text-lg leading-relaxed mb-8 flex-grow">
                                        {venture.description}
                                    </p>

                                    <div className="pt-6 border-t border-white/5 flex gap-4 text-sm text-gray-500">
                                        <span>• Independent Operations</span>
                                        <span>• ZeengoCorp Backed</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-zinc-950 border-t border-white/5">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-8">Looking for Investment Opportunities?</h2>
                        <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                            <Link href="/investors">Visit Investor Relations</Link>
                        </Button>
                    </div>
                </section>
            </div>
        </>
    );
}
