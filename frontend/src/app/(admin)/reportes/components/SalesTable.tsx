import React from "react";

interface Sale {
    dish: string;
    quantity: number;
    total: number;
}

interface SalesTableProps {
    salesData: Sale[];
}

const SalesTable: React.FC<SalesTableProps> = ({ salesData }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
                <thead className="bg-gray-200 text-gray-700">
                    <tr>
                        <th className="px-4 py-2 text-left">Plato</th>
                        <th className="px-4 py-2 text-left">Cantidad</th>
                        <th className="px-4 py-2 text-left">Total (Bs.)</th>
                    </tr>
                </thead>
                <tbody>
                    {salesData.map((sale, index) => (
                        <tr key={index} className="border-b text-gray-800">
                            <td className="px-4 py-3">{sale.dish}</td>
                            <td className="px-4 py-3">{sale.quantity}</td>
                            <td className="px-4 py-3 font-semibold text-orange-600">Bs. {sale.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesTable;
