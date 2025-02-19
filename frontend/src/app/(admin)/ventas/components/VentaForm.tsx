"use client";
import { useState } from "react";

interface VentaFormProps {
    selectedItems: { name: string; price: number; quantity: number }[];
    onSubmit: () => void;
}

export default function VentaForm({ selectedItems, onSubmit }: VentaFormProps) {
    const total = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="p-6 bg-gray-50 shadow-md rounded-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Resumen de la Venta</h2>
            <ul className="mb-4 text-black">
                {selectedItems.map((item, index) => (
                    <li key={index} className="flex justify-between py-2 border-b">
                        <span>{item.name} x {item.quantity}</span>
                        <span>{(item.price * item.quantity).toFixed(2)} BS</span>
                    </li>
                ))}
            </ul>
            <div className="text-lg font-bold text-gray-900">Total: {total.toFixed(2)} BS</div>
            <button onClick={onSubmit} className="mt-4 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700">
                Confirmar Venta
            </button>
        </div>
    );
}
