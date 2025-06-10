import React from 'react';
import { Link } from 'gatsby';
import { links } from '../constants/links';

const Footer = () => {
  return (
    <footer className="font-display mt-20 border-t border-gray-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-8 sm:space-y-0">
          {links.map((link) => {
            // Check if it's an internal link (starts with /)
            if (link.href.startsWith('/')) {
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm text-gray-500 transition duration-150 hover:text-gray-900"
                >
                  {link.label}
                </Link>
              );
            }
            
            // External links
            return (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-gray-500 transition duration-150 hover:text-gray-900"
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
