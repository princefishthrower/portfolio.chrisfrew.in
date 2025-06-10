import React, { PropsWithChildren } from 'react';
import Footer from './Footer';
import { Header } from './Header';

interface LayoutProps extends PropsWithChildren {
  title?: string;
  description?: string;
  image?: string;
  pathname?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  // title,
  // description,
  // image,
  // pathname
}) => {
  return <><Header/>{children}<Footer /></>;
};

export default Layout;