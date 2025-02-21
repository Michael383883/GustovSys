"use client";
import { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import { fetchProducts } from "../../../../services/productService";
interface MenuListProps {
    refreshKey: string;
}

interface Product {
    name: string;
    price: string;
    image_url: string;
}
export default function MenuList({ refreshKey }: MenuListProps) {
    const [menu, setMenu] = useState<{ name: string; price: number; image: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await fetchProducts();
                console.log("Respuesta del backend:", response);


                if (response.success && response.data && Array.isArray(response.data)) {
                    // Mapea los datos para que coincidan con la estructura que esperamos
                    const formattedMenu = response.data.map((product: Product) => ({
                        name: product.name,
                        price: parseFloat(product.price),
                        image: product.image_url
                    }));


                    setMenu(formattedMenu);
                } else {
                    console.error("La respuesta del backend no tiene la estructura esperada:", response);
                }
            } catch (error) {
                console.error("Error al cargar los productos:", error);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [refreshKey]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {loading ? (
                <p className="text-gray-500 text-center col-span-3">Cargando productos...</p>
            ) : menu.length > 0 ? (
                menu.map((item, index) => (
                    <MenuItem key={index} name={item.name} price={item.price} image={item.image} />
                ))
            ) : (
                <p className="text-gray-500 text-center col-span-3">No hay productos disponibles.</p>
            )}
        </div>
    );
}