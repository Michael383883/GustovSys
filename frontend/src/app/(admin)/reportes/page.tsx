"use client";
import { useState } from "react";
import SalesTable from "./components/SalesTable";
import ReportStats from "./components/ReportStats";

const mockSalesData = [
    { date: "2025-02-19", dish: "Charque", quantity: 5, total: 60 },
    { date: "2025-02-19", dish: "Pique", quantity: 3, total: 42 },
    { date: "2025-02-19", dish: "Pailitar", quantity: 2, total: 20 },
    { date: "2025-02-19", dish: "Silpancho", quantity: 1, total: 15 },
];

export default function VentasReportPage() {
    const [reportGenerated, setReportGenerated] = useState(false);
    const reportDate = new Date().toISOString().split("T")[0];

    const handleGenerateReport = () => {
        setReportGenerated(true);
    };

    return (
        <div className="bg-gray-100 min-h-screen pt-20 px-6 flex">
            <div className="bg-white p-6 rounded-lg shadow-md w-80 h-fit sticky top-20">
                <h2 className="text-2xl font-bold text-gray-800">Reporte de Ventas</h2>
                <p className="text-sm text-gray-600 mt-2">
                    Fecha: <span className="font-semibold">{reportDate}</span>
                </p>
                <button
                    className="mt-4 w-full bg-orange-600 text-white font-semibold py-2 rounded-lg hover:bg-orange-700 transition duration-300"
                    onClick={handleGenerateReport}
                >
                    Generar Reporte
                </button>
            </div>
            {reportGenerated && (
                <div className="ml-6 flex-grow grid grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md h-fit">
                        <SalesTable salesData={mockSalesData} />
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md h-fit">
                        <ReportStats salesData={mockSalesData} />
                    </div>
                </div>
            )}
        </div>
    );
}
