
import { useRoute, Link } from "wouter";
import { VENTURES } from "@/lib/ventures";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import SeoHead from "@/components/seo/SeoHead";
import { motion } from "framer-motion";

export default function VentureDetail() {
    const [match, params] = useRoute("/ventures/:slug");
    const slug = match ? params.slug : null;
    const venture = VENTURES.find((v) => v.slug === slug);

    if (!venture) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center flex-col">
                <h1 className="text-4xl font-bold mb-4">Venture Not Found</h1>
                <Button asChild variant="outline">
                    <Link href="/ventures">Back to All Ventures</Link>
                </Button>
            </div>
        );
    }

    const structuredData = {
        "@context": "https://schema.org",
        "@type": venture.schemaType,
        "name": venture.title,
        "description": venture.description,
        "brand": {
            "@type": "Brand",
            "name": "ZeengoCorp Innovations"
        },
        "url": `https://zeengocorp.com/ventures/${venture.slug}`
    };

    return (
        <>
            <SeoHead
                title={venture.title}
                description={venture.description}
                jsonLd={structuredData}
            />

            <div className="min-h-screen bg-black text-white">
                {/* Navigation Breadcrumb */}
                <div className="container mx-auto px-4 pt-8">
                    <Link href="/ventures" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft className="mr-2 w-4 h-4" /> Back to Ventures
                    </Link>
                </div>

                {/* Hero */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className={`inline-block p-4 rounded-2xl bg-zinc-900 mb-8 border border-zinc-800 ${venture.color}`}>
                                    <venture.icon className="w-12 h-12" />
                                </div>

                                <div className="flex items-center gap-4 mb-6">
                                    <Badge variant="outline" className="text-white border-white/20 px-3 py-1">
                                        A ZeengoCorp Majority Venture
                                    </Badge>
                                    <Badge
                                        className={`
                                      ${venture.status === 'Live' ? 'bg-green-500/20 text-green-400' : ''}
                                      ${venture.status === 'Scaling' ? 'bg-blue-500/20 text-blue-400' : ''}
                                      ${venture.status === 'In Development' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                                      ${venture.status === 'Prototype' ? 'bg-purple-500/20 text-purple-400' : ''}
                                    `}
                                    >
                                        {venture.status}
                                    </Badge>
                                </div>

                                <h1 className="text-5xl md:text-7xl font-bold mb-6">{venture.title}</h1>
                                <p className="text-xl md:text-2xl text-gray-300 font-light mb-8 border-l-4 border-white/20 pl-6">
                                    {venture.tagline}
                                </p>
                                <p className="text-lg text-gray-400 leading-relaxed mb-10">
                                    {venture.description}
                                </p>
                                <div className="flex gap-4">
                                    <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-bold text-lg px-8">
                                        {venture.cta}
                                    </Button>
                                    <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                                        Contact Sales
                                    </Button>
                                </div>
                            </motion.div>

                            {/* Stats & Features Card */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-zinc-900 rounded-3xl p-10 border border-zinc-800"
                            >
                                <div className="grid grid-cols-3 gap-6 mb-12">
                                    {venture.stats.map((stat) => (
                                        <div key={stat.label} className="text-center">
                                            <div className="text-3xl font-bold mb-1">{stat.value}</div>
                                            <div className="text-xs uppercase tracking-widest text-gray-500">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-6">
                                    {venture.features.map((feature) => (
                                        <div key={feature} className="flex items-center p-4 rounded-xl bg-black/50 border border-white/5">
                                            <CheckCircle2 className={`w-6 h-6 mr-4 ${venture.color}`} />
                                            <span className="text-lg font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Integration / Cross-Sell */}
                <section className="py-24 border-t border-white/5 bg-zinc-950">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-4">Part of the ZeengoCorp Ecosystem</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto mb-12">
                            Our ventures share infrastructure, data intelligence, and security protocols—scale one, and you scale with the power of the whole group.
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
}
