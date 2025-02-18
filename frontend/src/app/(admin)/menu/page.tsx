import MenuList from "./components/MenuList";
import Link from "next/link";

export default function MenuPage() {
    return (
        <div>
            <h1>Menú</h1>
            <MenuList />
            <Link href="/admin/menu/add">Agregar nuevo plato</Link>
        </div>
    );
}
