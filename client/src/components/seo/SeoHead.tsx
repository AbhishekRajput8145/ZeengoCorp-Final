
import React from "react";
import { Helmet } from "react-helmet-async";

type SeoProps = {
    title: string;
    description: string;
    url?: string;
    image?: string;
    jsonLd?: Record<string, any> | null;
    noIndex?: boolean;
};

export const SeoHead: React.FC<SeoProps> = ({
    title,
    description,
    url,
    image,
    jsonLd,
    noIndex = false,
}) => {
    const fullTitle = `${title} | ZeengoCorp Innovations Pvt. Ltd.`;
    const defaultImage = "/attached_assets/logo.png"; // Replace with actual default OG image path
    const siteUrl = "https://zeengocorp.com"; // Replace with actual domain
    const canonicalUrl = url ? (url.startsWith("http") ? url : `${siteUrl}${url}`) : siteUrl;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:site_name" content="ZeengoCorp Innovations Pvt. Ltd." />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={image || defaultImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content="@zeengocorp" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image || defaultImage} />

            {/* Structured Data (JSON-LD) */}
            {jsonLd && (
                <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
            )}
        </Helmet>
    );
};

export default SeoHead;
