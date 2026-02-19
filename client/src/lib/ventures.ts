
import { Globe, Cpu, Shield, Car, BookOpen, LucideIcon } from "lucide-react";

export type Venture = {
    slug: string;
    title: string;
    tagline: string;
    description: string;
    icon: LucideIcon;
    color: string;
    features: string[];
    stats: { label: string; value: string }[];
    cta: string;
    schemaType: "Product" | "Service";
    status: "Live" | "In Development" | "Prototype" | "Scaling";
};

export const VENTURES: Venture[] = [
    {
        slug: "real-estate",
        title: "Zeengo Real Estate",
        tagline: "Trust & Transparency in Property Markets",
        description: "An AI-driven ecosystem connecting buyers, sellers, and verified brokers. We eliminate information asymmetry in the real estate market through verified listings, smart contracts, and data-driven valuation models.",
        icon: Globe,
        color: "text-blue-400",
        features: [
            "Verified Listings Only",
            "AI-Powered Valuation",
            "Smart Contract Integration",
            "Direct Broker Connection"
        ],
        stats: [
            { label: "Listings", value: "10k+" },
            { label: "Cities", value: "12" },
            { label: "Trust Score", value: "99%" }
        ],
        cta: "Find Your Property",
        schemaType: "Service",
        status: "Scaling"
    },
    {
        slug: "zeengo-gpt",
        title: "Zeengo GPT",
        tagline: "Conversational Intelligence for Enterprise",
        description: "Built on the WhatsApp Business API, Zeengo GPT enables enterprises to automate customer support, sales, and user engagement with human-like precision. It's not just a chatbot; it's a full-stack conversation engine.",
        icon: Cpu,
        color: "text-purple-400",
        features: [
            "WhatsApp API Native",
            "Sentiment Analysis",
            "Automated Sales Funnels",
            "24/7 Customer Engagement"
        ],
        stats: [
            { label: "Messages Processed", value: "1M+" },
            { label: "Avg Response", value: "<1s" },
            { label: "Conversion Lift", value: "35%" }
        ],
        cta: "Automate Your Business",
        schemaType: "Product",
        status: "Live"
    },
    {
        slug: "security-manpower",
        title: "Zeengo Security",
        tagline: "Premium Protection for Modern Assets",
        description: "Combining rigorously trained personnel with advanced surveillance technology. Zeengo Security provides comprehensive protection for corporate campuses, residential complexes, and high-value assets.",
        icon: Shield,
        color: "text-red-400",
        features: [
            "Verified Personnel",
            "Tech-Enabled Patrols",
            "24/7 Command Center",
            "Emergency Response Team"
        ],
        stats: [
            { label: "Guards Deployed", value: "500+" },
            { label: "Sites Secured", value: "50+" },
            { label: "Incidents Prevented", value: "99%" }
        ],
        cta: "Secure Your Assets",
        schemaType: "Service",
        status: "Live"
    },
    {
        slug: "yatree",
        title: "Yatree Mobility",
        tagline: "Safe, Compliant, Reliable Rides",
        description: "A secure, compliance-focused ride-sharing application designed to facilitate cost-effective commuting through real-time ride-matching and user-friendly interfaces.",
        icon: Car,
        color: "text-green-400",
        features: [
            "Real-time Ride Matching",
            "Fixed Pricing Model",
            "Background Verified Drivers",
            "Cost-Effective Commuting"
        ],
        stats: [
            { label: "Active Drivers", value: "2k+" },
            { label: "Rides Completed", value: "50k+" },
            { label: "User Rating", value: "4.8" }
        ],
        cta: "Ride with Yatree",
        schemaType: "Service",
        status: "In Development"
    },
    {
        slug: "publications",
        title: "Zeengo Publications",
        tagline: "Knowledge for the Growth Mindset",
        description: "Expanding digital content creation through Zeengo publications, eBooks, and online platforms. We emphasize self-help, business strategy, personality development, and children's mindset growth.",
        icon: BookOpen,
        color: "text-yellow-400",
        features: [
            "Business Strategy",
            "Self-Help & Growth",
            "Children's Mindset",
            "Digital & Print Formats"
        ],
        stats: [
            { label: "Readers", value: "100k+" },
            { label: "Titles", value: "25+" },
            { label: "Subscribers", value: "15k" }
        ],
        cta: "Read Our Insights",
        schemaType: "Product",
        status: "Scaling"
    }
];
