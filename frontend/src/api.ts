import axios from 'axios';
import { User, Item } from './types';

const API_URL = 'http://localhost:8000/api';

export const api = {
    // User endpoints
    async createUser(name: string, email: string): Promise<User> {
        const response = await axios.post<User>(`${API_URL}/users/`, { name, email });
        return response.data;
    },

    async getUsers(): Promise<User[]> {
        const response = await axios.get<User[]>(`${API_URL}/users/`);
        return response.data;
    },

    // Item endpoints
    async createItem(name: string, description: string): Promise<Item> {
        const response = await axios.post<Item>(`${API_URL}/items/`, { name, description });
        return response.data;
    },

    async getItems(): Promise<Item[]> {
        const response = await axios.get<Item[]>(`${API_URL}/items/`);
        return response.data;
    },

    async getUserItems(userId: number): Promise<Item[]> {
        const response = await axios.get<Item[]>(`${API_URL}/items/user/${userId}`);
        return response.data;
    },

    async getUnclaimedItems(): Promise<Item[]> {
        const response = await axios.get<Item[]>(`${API_URL}/items/unclaimed`);
        return response.data;
    },

    async claimItem(itemId: number, userId: number): Promise<Item> {
        const response = await axios.post<Item>(`${API_URL}/items/${itemId}/claim?user_id=${userId}`);
        return response.data;
    },

    async unclaimItem(itemId: number, userId: number): Promise<Item> {
        const response = await axios.post<Item>(`${API_URL}/items/${itemId}/unclaim?user_id=${userId}`);
        return response.data;
    },

    async markBought(itemId: number, userId: number): Promise<Item> {
        const response = await axios.post<Item>(`${API_URL}/items/${itemId}/mark_bought?user_id=${userId}`);
        return response.data;
    },

    async markNotBought(itemId: number, userId: number): Promise<Item> {
        const response = await axios.post<Item>(`${API_URL}/items/${itemId}/mark_not_bought?user_id=${userId}`);
        return response.data;
    }
}; 