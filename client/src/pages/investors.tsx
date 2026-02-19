
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { FileText, TrendingUp, Users, Lock } from "lucide-react";
import SeoHead from "@/components/seo/SeoHead";

export default function Investors() {
    return (
        <>
            <SeoHead
                title="Investor Relations"
                description="ZeengoCorp Investor Relations. Financial highlights, corporate governance, and sustainable growth strategy."
            />

            <div className="bg-black text-white min-h-screen">
                <section className="py-24 bg-zinc-950 border-b border-white/5">
                    <div className="container mx-auto px-4 text-center max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-5xl md:text-6xl font-bold mb-8">Investor Relations</h1>
                            <p className="text-xl text-gray-400 leading-relaxed">
                                ZeengoCorp is built on the principles of disciplined capital allocation, rapid validation, and long-term value creation. We focus on building defensible assets in high-growth markets.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <section className="py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { title: "Corporate Governance", icon: Lock, desc: "Ethical leadership and transparent compliance." },
                                { title: "Financial Highlights", icon: TrendingUp, desc: "Consistent growth in revenue and asset value." },
                                { title: "Board & Leadership", icon: Users, desc: "Visionary leadership with diverse expertise." },
                                { title: "Reports & Filings", icon: FileText, desc: "Quarterly earnings and annual reports." }
                            ].map((item, i) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-zinc-900/50 p-8 rounded-xl border border-white/5"
                                >
                                    <item.icon className="w-10 h-10 mb-6 text-white" />
                                    <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                                    <p className="text-gray-400">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-zinc-900 border-y border-white/5">
                    <div className="container mx-auto px-4 text-center max-w-2xl">
                        <h2 className="text-3xl font-bold mb-6">Request Investor Deck</h2>
                        <p className="text-gray-400 mb-8">
                            For detailed financial information and strategic roadmap, please contact our IR team.
                        </p>
                        <Button size="lg" className="bg-white text-black hover:bg-gray-200">
                            Contact IR Team
                        </Button>
                    </div>
                </section>
            </div>
        </>
    );
}
