import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

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

export const api = {
    // User endpoints
    createUser: async (name: string, email: string): Promise<User> => {
        const response = await axios.post(`${API_URL}/users/`, { name, email });
        return response.data;
    },

    getUsers: async (): Promise<User[]> => {
        const response = await axios.get(`${API_URL}/users/`);
        return response.data;
    },

    // Item endpoints
    createItem: async (name: string, description: string): Promise<Item> => {
        const response = await axios.post(`${API_URL}/items/`, { name, description });
        return response.data;
    },

    getItems: async (): Promise<Item[]> => {
        const response = await axios.get(`${API_URL}/items/`);
        return response.data;
    },

    claimItem: async (itemId: number, userId: number): Promise<Item> => {
        const response = await axios.post(`${API_URL}/items/${itemId}/claim?user_id=${userId}`);
        return response.data;
    },

    markBought: async (itemId: number, userId: number): Promise<Item> => {
        const response = await axios.post(`${API_URL}/items/${itemId}/mark_bought?user_id=${userId}`);
        return response.data;
    }
}; 