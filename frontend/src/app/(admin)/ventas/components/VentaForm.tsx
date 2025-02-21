
"use client";

interface VentaFormProps {
    selectedItems: { name: string; price: number; quantity: number }[];
    onSubmit: () => void;
}
export default function VentaForm({ selectedItems, onSubmit }: VentaFormProps) {
    const total = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleConfirm = async () => {
        const saleData = {
            items: selectedItems,
            total: total.toFixed(2),
        };

        console.log("Datos a enviar:", saleData);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/sales", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(saleData),
            });

            if (!response.ok) {
                throw new Error("Error en la solicitud");
            }

            const data = await response.json();
            console.log("Respuesta del servidor:", data);
            onSubmit();
        } catch (error) {
            console.error("Error al enviar los datos:", error);
        }
    };

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
            <button onClick={handleConfirm} className="mt-4 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700">
                Confirmar Venta
            </button>
        </div>
    );
}
