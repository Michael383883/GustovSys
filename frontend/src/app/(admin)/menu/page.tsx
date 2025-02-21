'use client'

import { useState, useEffect } from "react";
import MenuList from "./components/MenuList";
import AddDishModal from "./components/AddDishModal";
import { ToastContainer } from "react-toastify";

export default function MenuPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
    }, [refreshKey]);

    const refreshMenu = () => {
        setRefreshKey(prevKey => prevKey + 1);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen pt-20">
            <div className="max-w-5xl mx-auto">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
                        📋 Gestión del Menú
                    </h1>
                    <p className="text-lg text-gray-700 text-center mb-6">
                        Administra los platillos disponibles en el restaurante.
                    </p>
                </div>

                <MenuList refreshKey={refreshKey} />

                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all">
                        ➕ Agregar nuevo plato
                    </button>
                </div>

                {isModalOpen && <AddDishModal onClose={() => setIsModalOpen(false)} refreshMenu={refreshMenu} />}
            </div>
            <ToastContainer />
        </div>
    );
}
