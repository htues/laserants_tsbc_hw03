export type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

export type ShoppingCartTypes = {
    onClose: () => void;
    children: React.ReactNode;
}