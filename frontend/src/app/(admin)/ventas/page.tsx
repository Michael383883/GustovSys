// "use client";
// import { useState, useEffect } from "react";
// import VentaItem from "./components/VentaItem";
// import VentaForm from "./components/VentaForm";
// import { fetchProducts } from "../../../services/productService";

// export default function VentasPage() {
//     const [ventas, setVentas] = useState([]);
//     const [confirmacion, setConfirmacion] = useState("");
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const loadProducts = async () => {
//             try {
//                 const response = await fetchProducts();
//                 console.log("Respuesta del backend:", response);

//                 if (response.success && response.data && Array.isArray(response.data)) {
//                     const formattedVentas = response.data.map(product => ({
//                         name: product.name,
//                         price: parseFloat(product.price),
//                         quantity: 0,
//                         image_url: product.image_url 
//                     }));
//                     setVentas(formattedVentas);
//                 } else {
//                     console.error("La respuesta del backend no tiene la estructura esperada:", response);
//                     setVentas([]);
//                 }
//             } catch (error) {
//                 console.error("Error al cargar los productos:", error);
//                 setVentas([]);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         loadProducts();
//     }, []);

//     const handleUpdateQuantity = (index, amount) => {
//         setVentas(ventas.map((item, i) =>
//             i === index ? { ...item, quantity: Math.max(0, item.quantity + amount) } : item
//         ));
//     };

//     const handleConfirmarVenta = () => {
//         const itemsSeleccionados = ventas.filter(item => item.quantity > 0);
//         if (itemsSeleccionados.length === 0) {
//             alert("No hay productos seleccionados.");
//             return;
//         }
//         const fechaHora = new Date().toLocaleString();
//         console.log("Venta registrada:", { itemsSeleccionados, fechaHora });

//         setConfirmacion(`Venta registrada correctamente el ${fechaHora}`);
//         setVentas(ventas.map(item => ({ ...item, quantity: 0 })));
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 flex flex-col items-center">
//             <div className="container mx-auto p-6 pt-20 flex flex-col md:flex-row gap-6 w-full">
//                 <div className="flex-1 bg-white p-4 rounded-lg shadow-md max-h-[500px] flex flex-col">
//                     <h2 className="text-xl font-bold text-gray-800 text-center mb-4 sticky top-0 bg-white py-2 z-10">
//                         Módulo de Ventas
//                     </h2>
//                     <div className="flex-1 overflow-y-auto space-y-4">
//                         {loading ? (
//                             <p className="text-gray-500 text-center">Cargando productos...</p>
//                         ) : ventas.length > 0 ? (
//                             ventas.map((item, index) => (
//                                 <VentaItem
//                                     key={index}
//                                     name={item.name}
//                                     price={item.price}
//                                     quantity={item.quantity}
//                                     imageUrl={item.image_url}
//                                     onUpdateQuantity={(amount) => handleUpdateQuantity(index, amount)}
//                                 />
//                             ))
//                         ) : (
//                             <p className="text-gray-500 text-center">No hay productos disponibles.</p>
//                         )}
//                     </div>
//                 </div>
//                 <div className="w-[300px] bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
//                     <VentaForm selectedItems={ventas.filter(item => item.quantity > 0)} onSubmit={handleConfirmarVenta} />
//                     {confirmacion && (
//                         <div className="mt-4 p-3 bg-green-100 text-green-700 text-center rounded-md">
//                             {confirmacion}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }


"use client";
import { useState, useEffect } from "react";
import VentaItem from "./components/VentaItem";
import VentaForm from "./components/VentaForm";
import { fetchProducts } from "../../../services/productService";

// Define la interfaz para los productos
interface Product {
    name: string;
    price: number;
    quantity: number;
    image_url: string;
}

export default function VentasPage() {
    const [ventas, setVentas] = useState<Product[]>([]);
    const [confirmacion, setConfirmacion] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await fetchProducts();
                console.log("Respuesta del backend:", response);

                if (response.success && response.data && Array.isArray(response.data)) {
                    const formattedVentas: Product[] = response.data.map((product: any) => ({
                        name: product.name,
                        price: parseFloat(product.price),
                        quantity: 0,
                        image_url: product.image_url,
                    }));
                    setVentas(formattedVentas);
                } else {
                    console.error("La respuesta del backend no tiene la estructura esperada:", response);
                    setVentas([]);
                }
            } catch (error) {
                console.error("Error al cargar los productos:", error);
                setVentas([]);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

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
        setVentas(ventas.map(item => ({ ...item, quantity: 0 })));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <div className="container mx-auto p-6 pt-20 flex flex-col md:flex-row gap-6 w-full">
                <div className="flex-1 bg-white p-4 rounded-lg shadow-md max-h-[500px] flex flex-col">
                    <h2 className="text-xl font-bold text-gray-800 text-center mb-4 sticky top-0 bg-white py-2 z-10">
                        Módulo de Ventas
                    </h2>
                    <div className="flex-1 overflow-y-auto space-y-4">
                        {loading ? (
                            <p className="text-gray-500 text-center">Cargando productos...</p>
                        ) : ventas.length > 0 ? (
                            ventas.map((item, index) => (
                                <VentaItem
                                    key={index}
                                    name={item.name}
                                    price={item.price}
                                    quantity={item.quantity}
                                    imageUrl={item.image_url}
                                    onUpdateQuantity={(amount: number) => handleUpdateQuantity(index, amount)}
                                />
                            ))
                        ) : (
                            <p className="text-gray-500 text-center">No hay productos disponibles.</p>
                        )}
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
