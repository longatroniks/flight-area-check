import React from 'react';
import TopBar from '../nav/TopBar';
import Logo from '../icons/Logo';
import { menuItems } from '../../assets/static-values';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-gray-50">
      <header>
        <TopBar logo={Logo} items={menuItems} />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
