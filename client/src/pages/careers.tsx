
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Zap, Heart } from "lucide-react";
import SeoHead from "@/components/seo/SeoHead";

export default function Careers() {
    return (
        <>
            <SeoHead
                title="Careers at ZeengoCorp"
                description="Join the team building what matters. Explore career opportunities at ZeengoCorp Innovations."
            />

            <div className="bg-black text-white min-h-screen">
                <section className="py-24 relative overflow-hidden">
                    <div className="container mx-auto px-4 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-4xl"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-sm mb-8">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span>We are hiring builders</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-bold mb-8">Do Work That <br /> Matters.</h1>
                            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                                We don't care about your pedigree. We care about your craft.
                                If you want to solve hard problems in real estate, AI, and mobility, you belong here.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <section className="py-24 bg-zinc-950 border-t border-white/5">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-3 gap-12">
                            {[
                                { title: "Ownership", icon: Briefcase, desc: "You own your outcome. No micromanagement, just clear goals." },
                                { title: "Velocity", icon: Zap, desc: "We move fast. Ship, learn, iterate. Perfection is the enemy of done." },
                                { title: "Impact", icon: Heart, desc: "Work on products that real people use every day." }
                            ].map((val, i) => (
                                <div key={val.title} className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5">
                                    <val.icon className="w-8 h-8 mb-6 text-white" />
                                    <h3 className="text-2xl font-bold mb-4">{val.title}</h3>
                                    <p className="text-gray-400">{val.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-24">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-bold mb-12">Open Roles</h2>
                        <div className="space-y-4">
                            {/* Placeholder for Job Listings */}
                            <div className="p-8 rounded-xl bg-zinc-900 border border-zinc-800 flex justify-between items-center group hover:border-white/20 transition-all cursor-pointer">
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Senior Full Stack Engineer</h3>
                                    <p className="text-gray-500">Remote • Engineering</p>
                                </div>
                                <ArrowRight className="text-white/20 group-hover:text-white transition-colors" />
                            </div>
                            <div className="p-8 rounded-xl bg-zinc-900 border border-zinc-800 flex justify-between items-center group hover:border-white/20 transition-all cursor-pointer">
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Product Designer</h3>
                                    <p className="text-gray-500">New Delhi • Design</p>
                                </div>
                                <ArrowRight className="text-white/20 group-hover:text-white transition-colors" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
