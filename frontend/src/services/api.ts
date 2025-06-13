import axios from 'axios';
import { User, Item, UserCreate, ItemCreate } from '../types';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const userApi = {
    create: async (user: UserCreate): Promise<User> => {
        const response = await api.post<User>('/users/', user);
        return response.data;
    },
    getAll: async (): Promise<User[]> => {
        const response = await api.get<User[]>('/users/');
        return response.data;
    },
    getById: async (id: number): Promise<User> => {
        const response = await api.get<User>(`/users/${id}`);
        return response.data;
    },
    getItems: async (id: number): Promise<Item[]> => {
        const response = await api.get<Item[]>(`/users/${id}/items`);
        return response.data;
    },
};

export const itemApi = {
    create: async (item: ItemCreate): Promise<Item> => {
        const response = await api.post<Item>('/items/', item);
        return response.data;
    },
    getAll: async (): Promise<Item[]> => {
        const response = await api.get<Item[]>('/items/');
        return response.data;
    },
    getById: async (id: number): Promise<Item> => {
        const response = await api.get<Item>(`/items/${id}`);
        return response.data;
    },
    claim: async (itemId: number, userId: number): Promise<Item> => {
        const response = await api.post<Item>(`/items/${itemId}/claim?user_id=${userId}`);
        return response.data;
    },
    markBought: async (itemId: number, userId: number): Promise<Item> => {
        const response = await api.post<Item>(`/items/${itemId}/mark_bought?user_id=${userId}`);
        return response.data;
    },
}; 