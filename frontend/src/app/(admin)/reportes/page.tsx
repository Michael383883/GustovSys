"use client";
import { useState, useEffect } from "react";
import SalesTable from "./components/SalesTable";
import ReportStats from "./components/ReportStats";

export default function VentasReportPage() {
    const [reportGenerated, setReportGenerated] = useState(false);
    const [salesData, setSalesData] = useState([]);
    const reportDate = new Date().toISOString().split("T")[0];

    const fetchSalesData = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/salestoday");
            if (!response.ok) {
                throw new Error("Error fetching sales data");
            }
            const data = await response.json();
            setSalesData(data);
        } catch (error) {
            console.error("Error fetching sales data:", error);
        }
    };

    const handleGenerateReport = () => {
        setReportGenerated(true);
        fetchSalesData();
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
                        <SalesTable salesData={salesData} />
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md h-fit">
                        <ReportStats salesData={salesData} />
                    </div>
                </div>
            )}
        </div>
    );
}
