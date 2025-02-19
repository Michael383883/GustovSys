"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Sale {
    dish: string;
    quantity: number;
    total: number;
}

interface ReportStatsProps {
    salesData: Sale[];
}

const ReportStats: React.FC<ReportStatsProps> = ({ salesData }) => {
    if (salesData.length === 0) {
        return <p className="text-center text-gray-600">No hay datos de ventas disponibles.</p>;
    }

    const totalPlatosVendidos = salesData.reduce((sum, sale) => sum + sale.quantity, 0);
    const totalIngresos = salesData.reduce((sum, sale) => sum + sale.total, 0);

    const ventasPorPlato = salesData.reduce((acc, sale) => {
        acc[sale.dish] = (acc[sale.dish] || 0) + sale.quantity;
        return acc;
    }, {} as Record<string, number>);

    const labels = Object.keys(ventasPorPlato);
    const values = Object.values(ventasPorPlato);

    const data = {
        labels,
        datasets: [
            {
                label: "Cantidad Vendida",
                data: values,
                backgroundColor: ["#D2691E", "#FF8C00", "#FFA500", "#FFD700"],
                borderColor: "#8B4513",
                borderWidth: 1,
                borderRadius: 6,
            },
        ],
    };

    return (
        <div className="text-gray-800">
            <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-gray-100 rounded-lg shadow-sm text-center">
                    <p className="text-sm font-semibold text-gray-600">Total Platos Vendidos</p>
                    <p className="text-2xl font-bold text-orange-600">{totalPlatosVendidos}</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg shadow-sm text-center">
                    <p className="text-sm font-semibold text-gray-600">Total en Efectivo</p>
                    <p className="text-2xl font-bold text-orange-600">Bs. {totalIngresos}</p>
                </div>
            </div>

            <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800">Ventas por Plato</h4>
                <Bar data={data} />
            </div>
        </div>
    );
};

export default ReportStats;
