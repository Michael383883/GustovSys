'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

const adminImage = '/logo.jpg';

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-red-800 to-yellow-600 p-4 shadow-lg fixed w-full z-50">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-3xl font-extrabold tracking-wide">Gustov</h1>
                <ul className="flex space-x-6">
                    {['Inicio', 'Menú', 'Ventas', 'Reportes'].map((item, index) => (
                        <li key={index}>
                            <Link href={`/${item.toLowerCase()}`}>
                                <motion.span whileHover={{ scale: 1.1 }} className="text-white text-lg font-medium hover:text-gray-300 transition duration-300">
                                    {item}
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