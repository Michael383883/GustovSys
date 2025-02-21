
interface MenuItemProps {
    name: string;
    price: number;
    image?: string;
}

export default function MenuItem({ name, price, image }: MenuItemProps) {
    return (
        <div className="border rounded-lg shadow-lg p-4 flex flex-col items-center bg-white">
            <div className="w-48 h-48 mb-2 relative">
                <img
                    src={image || "/default-food.jpg"}
                    alt={name}
                    className="rounded-md object-contain w-full h-full"
                />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
            <p className="text-gray-700">Precio: Bs{price}</p>
        </div>
    );
}
