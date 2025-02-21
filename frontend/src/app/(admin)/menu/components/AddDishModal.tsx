interface AddDishModalProps {
    onClose: () => void;
    refreshMenu: () => void;
}


import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddDishModal({ onClose, refreshMenu }: AddDishModalProps) {
    const [image, setImage] = useState<File | null>(null);
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const validFormats = ["image/jpeg", "image/png", "image/svg+xml"];
            if (!validFormats.includes(file.type)) {
                setError("Formato no permitido. Solo JPG, PNG, SVG.");
                setImage(null);
                return;
            }

            if (file.size > 2 * 1024 * 1024) {
                setError("La imagen no debe superar los 2MB.");
                setImage(null);
                return;
            }

            setError("");
            setImage(file);
        }
    };

    const removeImage = () => {
        setImage(null);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!name || !price || !image) {
            setError("Por favor, complete todos los campos.");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("image", image);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Error al agregar el plato.");
            setName("");
            setPrice("");
            setImage(null);
            setError("");

            toast.success("Producto registrado correctamente", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
            });

            refreshMenu();
            onClose();
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative flex flex-col">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-xl">
                    ✖
                </button>
                <h2 className="text-2xl font-bold text-orange-700 mb-4 text-center">🥘 Agregar Nuevo Plato</h2>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-4">
                        <span className="text-orange-800 font-bold">Nombre del Plato:</span>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border-2 border-orange-500 rounded-md bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                            placeholder="Ej. Pollo Asado" />
                    </label>
                    <label className="block mb-4">
                        <span className="text-orange-800 font-bold">Precio:</span>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}
                            className="w-full p-2 border-2 border-orange-500 rounded-md bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                            placeholder="Ej. 15.00" />
                    </label>
                    <label className="block mb-4">
                        <span className="text-orange-800 font-bold">Foto (JPG, PNG, SVG | máx. 2MB):</span>
                        <input type="file" accept=".jpg,.png,.svg" onChange={handleImageUpload}
                            className="w-full p-2 border-2 border-orange-500 rounded-md bg-orange-100 cursor-pointer" />
                        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
                    </label>
                    {image && (
                        <div className="relative w-full h-40 flex items-center justify-center border border-orange-500 rounded-md bg-gray-100 overflow-hidden">
                            <img src={URL.createObjectURL(image)} alt="Vista previa" className="max-h-full max-w-full object-contain" />
                            <button onClick={removeImage} type="button"
                                className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full hover:bg-red-700">
                                ❌
                            </button>
                        </div>
                    )}
                    <div className="flex justify-end space-x-4 mt-4">
                        <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

