"use client";
import { useState } from "react";
import VentaItem from "./components/VentaItem";
import VentaForm from "./components/VentaForm";

const menu = [
    { name: "Charque", price: 12 },
    { name: "Pique", price: 14 },
    { name: "Pailitar", price: 10 },
    { name: "Silpancho", price: 15 },
    { name: "Chicharrón", price: 18 },
    { name: "Majadito", price: 13 },
    { name: "Lomo Saltado", price: 16 },
];

export default function VentasPage() {
    const [ventas, setVentas] = useState(menu.map(item => ({ ...item, quantity: 0 })));
    const [confirmacion, setConfirmacion] = useState("");

    const handleUpdateQuantity = (index: number, amount: number) => {
        setVentas(ventas.map((item, i) =>
            i === index ? { ...item, quantity: Math.max(0, item.quantity + amount) } : item
        ));
    };
    const handleConfirmarVenta = () => {
        const itemsSeleccionados = ventas.filter(item => item.quantity > 0);
        if (itemsSeleccionados.length === 0) {
            alert("No hay productos seleccionados.");
            return;
        }
        const fechaHora = new Date().toLocaleString();
        console.log("Venta registrada:", { itemsSeleccionados, fechaHora });

        setConfirmacion(`Venta registrada correctamente el ${fechaHora}`);
        setVentas(menu.map(item => ({ ...item, quantity: 0 })));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <div className="container mx-auto p-6 pt-20 flex flex-col md:flex-row gap-6 w-full">
                <div className="flex-1 bg-white p-4 rounded-lg shadow-md max-h-[500px] flex flex-col">
                    <h2 className="text-xl font-bold text-gray-800 text-center mb-4 sticky top-0 bg-white py-2 z-10">
                        Módulo de Ventas
                    </h2>
                    <div className="flex-1 overflow-y-auto space-y-4">
                        {ventas.map((item, index) => (
                            <VentaItem
                                key={index}
                                name={item.name}
                                price={item.price}
                                quantity={item.quantity}
                                onUpdateQuantity={(amount) => handleUpdateQuantity(index, amount)}
                            />
                        ))}
                    </div>
                </div>
                <div className="w-[300px] bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">


                    <VentaForm selectedItems={ventas.filter(item => item.quantity > 0)} onSubmit={handleConfirmarVenta} />
                    {confirmacion && (
                        <div className="mt-4 p-3 bg-green-100 text-green-700 text-center rounded-md">
                            {confirmacion}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
