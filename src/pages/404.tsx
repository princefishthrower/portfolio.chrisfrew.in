import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout';
import { StaticImage } from 'gatsby-plugin-image';
import SEO from '../components/SEO';

const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <div className="mx-auto min-h-screen max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="aspect-[3/4] w-full max-w-md overflow-hidden border border-black bg-white p-4">
            <StaticImage
              src="../assets/images/poster-proofs/alpine-glows-purple.png"
              alt="Artistic visualization"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mt-8 text-center">
            <h1 className="text-3xl font-semibold text-gray-900">
              Page Not Found
            </h1>
            <Link
              to="/"
              className="mt-8 inline-block rounded-md bg-gray-900 px-6 py-3 text-base font-medium text-white hover:bg-gray-800"
            >
              Return to Gallery
            </Link>
          </div>
        </div>
      </div>
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
    title={title}
    description={description}
    image={image}
    pathname={pathname}
  />
);

export default NotFoundPage;