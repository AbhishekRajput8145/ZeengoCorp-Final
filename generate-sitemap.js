
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VENTURES_SLUGS = [
    "real-estate",
    "zeengo-gpt",
    "security-manpower",
    "yatree",
    "publications"
];

const STATIC_ROUTES = [
    "",
    "about",
    "ventures",
    "services",
    "contact",
    "blogs",
    "resources",
    "investors",
    "careers",
    "privacy",
    "terms"
];

const DOMAIN = "https://zeengocorp.com";

function getPriority(route) {
    if (route === "") return "1.0";
    if (["about", "ventures", "services"].includes(route)) return "0.9";
    if (["blogs", "contact"].includes(route)) return "0.8";
    if (route.startsWith("ventures/")) return "0.7";
    if (["resources", "investors", "careers"].includes(route)) return "0.6";
    return "0.3";
}

function getChangeFreq(route) {
    if (["", "ventures", "blogs"].includes(route)) return "weekly";
    if (["privacy", "terms"].includes(route)) return "yearly";
    return "monthly";
}

function generateSitemap() {
    const today = new Date().toISOString().split("T")[0];
    const allRoutes = [
        ...STATIC_ROUTES,
        ...VENTURES_SLUGS.map(slug => `ventures/${slug}`)
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
            .map(route => {
                const url = route === "" ? `${DOMAIN}/` : `${DOMAIN}/${route}`;
                return `<url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${getChangeFreq(route)}</changefreq>
    <priority>${getPriority(route)}</priority>
  </url>`;
            })
            .join("\n  ")}
</urlset>`;

    const publicPath = path.resolve(__dirname, "client", "public", "sitemap.xml");

    try {
        fs.writeFileSync(publicPath, sitemap);
        console.log(`✅ Sitemap generated at ${publicPath} with ${allRoutes.length} URLs`);
    } catch (error) {
        console.error("❌ Error generating sitemap:", error);
    }
}

generateSitemap();
