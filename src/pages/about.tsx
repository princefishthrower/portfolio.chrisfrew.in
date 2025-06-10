import React from 'react';
import Layout from '../components/Layout';
import AboutPage from '../components/AboutPage';
import SEO from '../components/SEO';

const About: React.FC = () => {
  return (
    <Layout>
      <AboutPage />
    </Layout>
  );
};

export const Head = ({
  title,
  description,
  image,
  pathname
}: any) => (
  <SEO
    title={title || "About - Christopher Frewin"}
    description={description || "Learn about Christopher Frewin, an American artist living in Austria creating galactic and futuristic alpine artwork."}
    image={image}
    pathname={pathname}
  />
);

export default About;
