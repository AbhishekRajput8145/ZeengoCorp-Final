import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Building2, Shield, Brain } from "lucide-react";

const SERVICES = [
  {
    id: "real-estate",
    icon: Building2,
    title: "Real Estate Solutions",
    description: "Comprehensive property consultation, listings, and investment advisory services powered by cutting-edge technology.",
    features: [
      "Property Management Systems",
      "Investment Analytics",
      "Smart Property Solutions",
      "Market Analysis Tools"
    ]
  },
  {
    id: "security",
    icon: Shield,
    title: "Security Services",
    description: "Advanced security solutions combining human expertise with state-of-the-art technology for comprehensive protection.",
    features: [
      "Physical Security",
      "Cybersecurity Solutions",
      "Surveillance Systems",
      "Risk Assessment"
    ]
  },
  {
    id: "ai",
    icon: Brain,
    title: "AI-Driven Tools (Zeengo GPT)",
    description: "Innovative AI solutions designed to automate, optimize, and transform business operations.",
    features: [
      "Process Automation",
      "Predictive Analytics",
      "Natural Language Processing",
      "Business Intelligence"
    ]
  }
];

export default function Services() {
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8">Our Services</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Innovative solutions designed to transform industries and drive success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="space-y-32">
            {SERVICES.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className="scroll-mt-20"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="grid md:grid-cols-2 gap-16 items-center"
                >
                  <div className="order-2 md:order-none">
                    <service.icon className="w-16 h-16 mb-8" />
                    <h2 className="text-4xl font-bold mb-6">{service.title}</h2>
                    <p className="text-gray-300 text-lg mb-8">
                      {service.description}
                    </p>
                    <ul className="space-y-4 mb-8">
                      {service.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center text-gray-300"
                        >
                          <div className="w-2 h-2 bg-white rounded-full mr-4" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                    <Button 
                      asChild 
                      size="lg" 
                      className="bg-white text-black hover:bg-gray-100 font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300"
                    >
                      <Link href="/contact">Learn More</Link>
                    </Button>
                  </div>
                  <div className="bg-gray-900 aspect-square rounded-lg order-1 md:order-none transform hover:scale-105 transition-transform duration-300">
                    {/* Service illustration placeholder */}
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden">
                      <service.icon className="w-32 h-32 text-gray-700" />
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8">Ready to Transform Your Business?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how our services can help you achieve your goals.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-black hover:bg-gray-100 font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300"
            >
              <Link href="/contact">Get Started</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}