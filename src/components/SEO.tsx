import React from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  pathname?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title = "Chris Frewin - Print Portfolio",
  description = "A collection of prints inspired by the Alps, Adirondacks, science fiction, and everything in between.",
  image = "/img/alpine-glows-purple.png",
  pathname = "",
}) => {
  const siteUrl = "https://portfolio.chrisfrewin.in";

  const seo = {
    title,
    description,
    image: `${siteUrl}${image}`,
    url: `${siteUrl}${pathname}`,
  };

  return (
    <>
      <html lang="en"/>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      {/* Open Graph */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
    </>
  );
};

export default SEO;