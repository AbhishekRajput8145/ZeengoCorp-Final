import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ExternalLink, BookOpen, Video, Download } from "lucide-react";

const AFFILIATE_PRODUCTS = [
  {
    title: "Business Analytics Suite",
    description: "Comprehensive analytics tools for business intelligence.",
    link: "#",
    price: "$99/month"
  },
  {
    title: "Security Management Platform",
    description: "Enterprise-grade security solution for businesses.",
    link: "#",
    price: "$199/month"
  },
  {
    title: "Real Estate CRM",
    description: "Customer relationship management for real estate professionals.",
    link: "#",
    price: "$149/month"
  }
];

const EDUCATIONAL_RESOURCES = [
  {
    type: "ebook",
    title: "Guide to Modern Security Solutions",
    description: "Comprehensive guide on implementing security measures.",
    icon: BookOpen
  },
  {
    type: "course",
    title: "Real Estate Technology Masterclass",
    description: "Learn about the latest tech in real estate.",
    icon: Video
  },
  {
    type: "whitepaper",
    title: "AI in Business Operations",
    description: "Research paper on AI implementation strategies.",
    icon: Download
  }
];

const WEB_STORIES = [
  {
    title: "Digital Transformation Success Story",
    description: "How a traditional business embraced technology.",
    date: "March 2024"
  },
  {
    title: "Security Implementation Case Study",
    description: "Securing a multinational corporation.",
    date: "February 2024"
  },
  {
    title: "AI Integration Journey",
    description: "Implementing AI in business processes.",
    date: "January 2024"
  }
];

export default function Resources() {
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
            <h1 className="text-5xl md:text-7xl font-bold mb-8">Resources</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our curated collection of tools, guides, and insights to help you succeed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Affiliate Products */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-center">Recommended Tools</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {AFFILIATE_PRODUCTS.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="bg-black border-gray-800">
                  <CardHeader>
                    <CardTitle>{product.title}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold mb-4">{product.price}</p>
                    <Button asChild className="w-full">
                      <a href={product.link} target="_blank" rel="noopener noreferrer">
                        Learn More
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Resources */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-center">Educational Resources</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {EDUCATIONAL_RESOURCES.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-900 p-8 rounded-lg"
              >
                <resource.icon className="w-12 h-12 mb-6" />
                <h3 className="text-2xl font-bold mb-4">{resource.title}</h3>
                <p className="text-gray-300 mb-6">{resource.description}</p>
                <Button variant="secondary" className="w-full">
                  Download Now
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Web Stories */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-center">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {WEB_STORIES.map((story, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-black p-8 rounded-lg"
              >
                <p className="text-sm text-gray-400 mb-4">{story.date}</p>
                <h3 className="text-2xl font-bold mb-4">{story.title}</h3>
                <p className="text-gray-300 mb-6">{story.description}</p>
                <Button variant="link" className="p-0">
                  Read Full Story →
                </Button>
              </motion.article>
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
            <h2 className="text-4xl font-bold mb-8">Explore All Resources</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover more tools and insights to help your business grow.
            </p>
            <Button asChild size="lg" className="glow-on-hover">
              <Link href="/contact">Get Access</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
