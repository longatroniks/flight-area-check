import React from 'react';
import { MenuItemProps } from '../../assets/types';
import { Link } from 'react-router-dom';

const MenuItem: React.FC<MenuItemProps> = ({ name, link }) => {
  return (
    <li className="text-lg font-light font-heading relative text-black">
      <Link
        to={link}
        className="group relative inline-block transition-colors hover:text-primary pb-1"
      >
        {name}
        <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
      </Link>
    </li>
  );
};

export default MenuItem;
