export type Post = {
    slug: string;
    title: string;
    date: string;
    description: string;
    content: string;
    image?: string;
    tags?: string[];
    readingTime?: string;
};

// Helper to parse frontmatter from markdown
function parseFrontmatter(markdown: string): { frontmatter: Record<string, any>, content: string } {
    const frontmatterRegex = /^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/;
    const match = markdown.match(frontmatterRegex);

    if (!match) {
        return { frontmatter: {}, content: markdown };
    }

    const frontmatterBlock = match[1];
    const content = match[2];

    const frontmatter: Record<string, any> = {};
    frontmatterBlock.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length) {
            // Basic parsing of string and array
            let value = valueParts.join(':').trim();

            // Remove quotes if present
            value = value.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');

            // Parse arrays [a, b, c]
            if (value.startsWith('[') && value.endsWith(']')) {
                const list = value.slice(1, -1).split(',').map(s => s.trim().replace(/^"(.*)"$/, '$1'));
                frontmatter[key.trim()] = list;
            } else {
                frontmatter[key.trim()] = value;
            }
        }
    });

    return { frontmatter, content };
}

export function getAllPosts(): Post[] {
    // Vite's import.meta.glob to load all markdown files (updated to modern syntax)
    const modules = import.meta.glob('../content/posts/*.md', { query: '?raw', import: 'default', eager: true });

    const posts: Post[] = [];

    for (const path in modules) {
        const slug = path.split('/').pop()?.replace('.md', '') || '';
        const markdown = modules[path] as string;
        const { frontmatter, content } = parseFrontmatter(markdown);

        if (slug) {
            posts.push({
                slug,
                title: frontmatter.title || 'Untitled',
                date: frontmatter.date || new Date().toISOString(),
                description: frontmatter.description || '',
                image: frontmatter.image,
                tags: frontmatter.tags || [],
                content: content,
                readingTime: Math.ceil(content.split(' ').length / 200) + ' min read'
            });
        }
    }

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
    const posts = getAllPosts();
    return posts.find(p => p.slug === slug);
}
