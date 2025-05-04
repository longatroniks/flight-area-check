import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import { MenuItemProps } from "../../assets/types";

interface TopBarProps {
    logo: React.FC;
    items: MenuItemProps[];
}

const TopBar: React.FC<TopBarProps> = ({ logo: Logo, items }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = (): void => setIsOpen((prev) => !prev);

    useEffect(() => {
        const handleResize = (): void => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <nav
            className={`bg-white w-full transition-all duration-300 ${isOpen ? "fixed inset-0 z-50 p-6" : "relative p-4 md:p-6"}`}
        >
            <div className="flex flex-col md:flex-row items-start md:items-center w-full">
                <div className="flex justify-between w-full items-center">
                    <Logo />
                    <ul className="hidden md:flex flex-col space-y-4 w-full md:flex-row md:space-y-0 md:space-x-6 md:w-auto md:justify-center">
                        {items.map((item, index) => (
                            <MenuItem key={index} name={item.name} link={item.link} />
                        ))}
                    </ul>
                    <button
                        onClick={toggleMenu}
                        className="md:hidden focus:outline-none"
                        aria-expanded={isOpen}
                        aria-label="Toggle menu"
                        style={{ touchAction: "manipulation" }}
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                            {isOpen ? (
                                <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                            )}
                        </svg>
                    </button>
                </div>

                <ul
                    className={`md:hidden flex flex-col space-y-4 w-full transition-all duration-300 ${isOpen
                            ? "max-h-screen opacity-100 mt-6 overflow-visible"
                            : "max-h-0 opacity-0 pointer-events-none overflow-hidden"
                        }`}
                >
                    {items.map((item, index) => (
                        <MenuItem key={index} name={item.name} link={item.link} />
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default TopBar;
