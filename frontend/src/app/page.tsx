'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const adminImage = '/logo.jpg';

import MenuList from './(admin)/menu/components/MenuList';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center text-center relative overflow-hidden">
      <motion.main
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center mt-32 p-8 bg-white rounded-lg shadow-xl w-4/5 max-w-4xl relative z-10"
      >

        <h2 className="text-5xl font-extrabold text-red-700 mb-4 drop-shadow-lg">
          Bienvenido al Panel Administrativo
        </h2>
        <p className="text-gray-700 text-lg mb-6 max-w-xl">
          Gestión del menú, ventas y reportes con una experiencia fluida y moderna.
        </p>
        <div className="relative w-full h-64 mb-8 rounded-2xl overflow-hidden shadow-2xl border-4 bg-gradient-to-r from-red-600 to-yellow-500 p-1">
          <div className="w-full h-full rounded-2xl overflow-hidden relative">
            <Image
              src={adminImage}
              alt="Panel Gustov"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              className="rounded-2xl"
            />
          </div>
        </div>

        <p className="text-gray-600 text-md">
          Una plataforma intuitiva diseñada para administrar tu restaurante de manera eficiente.
        </p>
      </motion.main>

      <section className="mt-16 w-full max-w-6xl p-6 bg-white shadow-lg rounded-lg text-gray-800">
        <h3 className="text-3xl font-bold text-red-700 mb-6">Menú Destacado</h3>
        <p className="text-gray-600 text-lg mb-4">
          Explora los platillos más populares y administra tu catálogo de comidas fácilmente.
        </p>
        <MenuList /> {/* Renderiza la lista de platos aquí */}
      </section>
    </div>
  );
};

export default Home;
