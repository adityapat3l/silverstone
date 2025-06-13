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

export type Group = {
  id: string;
  name: string;
  members: User[];
  items: Item[];
};

export type SuperAdmin = {
  id: string;
  name: string;
  email: string;
};