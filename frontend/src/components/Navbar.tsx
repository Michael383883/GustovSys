'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-red-800 to-yellow-600 p-4 shadow-lg fixed w-full z-50">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-3xl font-extrabold tracking-wide">
                    <Link href="/">Gustov</Link>
                </h1>
                <ul className="flex space-x-6">
                    {[
                        { name: 'Inicio', path: '/' },
                        { name: 'Menú', path: '/menu' },
                        { name: 'Ventas', path: '/ventas' },
                        { name: 'Reportes', path: '/reportes' }
                    ].map((item, index) => (
                        <li key={index}>
                            <Link href={item.path}>
                                <motion.span
                                    whileHover={{ scale: 1.1 }}
                                    className="text-white text-lg font-medium hover:text-gray-300 transition duration-300"
                                >
                                    {item.name}
                                </motion.span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};
export default Navbar;