import MenuItem from "./MenuItem";

const menu = [
    { name: "Charque", price: 12, image: "/images/pailita.png" },
    { name: "Pique ", price: 14, image: "/images/pailita.png" },
    { name: "Pailitar", price: 10, image: "/images/pailita.png" }
];

export default function MenuList() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {menu.map((item, index) => (
                <MenuItem key={index} name={item.name} price={item.price} image={item.image} />
            ))}
        </div>
    );
}