import { useRoute, Link } from "wouter";
import { getPostBySlug } from "@/lib/posts";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SeoHead from "@/components/seo/SeoHead";
import { motion } from "framer-motion";

// Lightweight Markdown Renderer (No external deps)
const MarkdownRenderer = ({ content }: { content: string }) => {
    const lines = content.split('\n');
    return (
        <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
            {lines.map((line, index) => {
                // Headers
                if (line.startsWith('# ')) return <h1 key={index} className="text-4xl font-bold text-white mt-8 mb-4">{line.slice(2)}</h1>;
                if (line.startsWith('## ')) return <h2 key={index} className="text-3xl font-bold text-white mt-8 mb-4">{line.slice(3)}</h2>;
                if (line.startsWith('### ')) return <h3 key={index} className="text-2xl font-bold text-white mt-6 mb-3">{line.slice(4)}</h3>;

                // Blockquote
                if (line.startsWith('> ')) return <blockquote key={index} className="border-l-4 border-gray-500 pl-4 italic text-gray-400 my-6">{line.slice(2)}</blockquote>;

                // List items (basic)
                if (line.startsWith('- ')) return <li key={index} className="ml-6 list-disc">{line.slice(2)}</li>;
                // Numbered list (basic regex for 1. 2.)
                if (/^\d+\.\s/.test(line)) return <div key={index} className="ml-6 mb-2">{line}</div>; // Keeping it simple div for now

                // Empty lines
                if (line.trim() === '') return <br key={index} />;

                // Paragraphs (default)
                // Basic bold/italic parsing could go here but plain text is safer for MVP
                const parsedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');

                return <p key={index} dangerouslySetInnerHTML={{ __html: parsedLine }} />;
            })}
        </div>
    );
};

export default function BlogDetail() {
    const [match, params] = useRoute("/blogs/:slug");
    const slug = match ? params.slug : null;
    const post = slug ? getPostBySlug(slug) : null;

    if (!post) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center flex-col">
                <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
                <Button asChild variant="outline">
                    <Link href="/blogs">Back to Blog</Link>
                </Button>
            </div>
        );
    }

    return (
        <>
            <SeoHead
                title={`${post.title} - ZeengoCorp Blog`}
                description={post.description}
                image={post.image}
            />

            <div className="bg-black text-white min-h-screen">
                {/* Hero */}
                <div className="relative h-[60vh] w-full overflow-hidden">
                    {post.image ? (
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${post.image})` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                        </div>
                    ) : (
                        <div className="absolute inset-0 bg-zinc-900" />
                    )}

                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
                        <div className="container mx-auto">
                            <Link href="/blogs" className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors">
                                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Articles
                            </Link>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className="flex gap-2 mb-4">
                                    {post.tags?.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium backdrop-blur-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">{post.title}</h1>
                                <p className="text-gray-300 text-lg md:text-xl max-w-2xl">
                                    {post.description}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 py-16 max-w-4xl">
                    <div className="prose prose-invert prose-lg max-w-none">
                        <MarkdownRenderer content={post.content} />
                    </div>

                    <div className="mt-16 pt-8 border-t border-gray-800">
                        <h3 className="text-lg font-bold mb-4">Share this article</h3>
                        <div className="flex gap-4">
                            {/* Social Share Placeholders */}
                            <Button variant="outline" size="sm" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${post.title}&url=${window.location.href}`, '_blank')}>
                                Twitter
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`, '_blank')}>
                                LinkedIn
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
