export interface User {
    id: number;
    name: string;
    email: string;
    items: Item[];
}

export interface Item {
    id: number;
    name: string;
    description: string;
    claimed_by: number | null;
    is_bought: boolean;
}

export interface UserCreate {
    name: string;
    email: string;
}

export interface ItemCreate {
    name: string;
    description: string;
}

export interface AddPersonFormProps {
    onAddPerson: (user: UserCreate) => void;
}

export interface ItemFormProps {
    onSubmit: (item: ItemCreate) => void;
}

export interface ItemListProps {
    items: Item[];
    users: User[];
    onClaim: (itemId: number, userId: number) => void;
    onMarkBought: (itemId: number, userId: number) => void;
} 