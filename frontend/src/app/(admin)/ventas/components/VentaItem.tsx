import Image from "next/image";

interface VentaItemProps {
    name: string;
    price: number;
    quantity: number;
    onUpdateQuantity: (amount: number) => void;
}

export default function VentaItem({ name, price, quantity, onUpdateQuantity }: VentaItemProps) {
    return (
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-6">
                <Image src="/images/pailita.png" alt={name} width={80} height={80} className="rounded-lg" />
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
                    <span className="text-gray-600">{price} BS</span>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <button className="w-8 h-8 text-white bg-yellow-500 rounded-full" onClick={() => onUpdateQuantity(-1)}>-</button>
                <span className="text-lg font-semibold text-gray-700">{quantity}</span>
                <button className="w-8 h-8 text-white bg-red-500 rounded-full" onClick={() => onUpdateQuantity(1)}>+</button>
            </div>
        </div>
    );
}
