import * as React from 'react';
import { Link } from 'gatsby';
import { links } from '../constants/links';

export function Header() {
  return (
    <header className="font-display text-sm text-gray-500 text-center mb-20 border-b border-gray-200 bg-white py-4">
      <Link to="/">
        <h1>
          Christopher Frewin
        </h1>
        <h2>
          Artist & Photographer
        </h2>
      </Link>
      <nav className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-8 sm:space-y-0 mt-4">
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
    </header>
  );
}
