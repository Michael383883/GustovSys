export const fetchProducts = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        if (!response.ok) {
            throw new Error("Error al obtener productos");
        }
        return response.json();
    } catch (error) {
        console.error("Error en fetchProducts:", error);
        return [];
    }
};
