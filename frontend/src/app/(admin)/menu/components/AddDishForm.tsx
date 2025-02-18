import { useState } from "react";

export default function AddDishForm() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Nuevo plato agregado:", { name, price });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre del plato:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Precio:
                <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
            </label>
            <button type="submit">Agregar</button>
        </form>
    );
}
