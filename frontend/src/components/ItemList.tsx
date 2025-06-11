import React, { useEffect, useState } from 'react';
import { Item } from '../types';

const ItemList: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    
    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch('/api/items');
            const data = await response.json();
            setItems(data);
        };

        fetchItems();
    }, []);

    const handleClaimItem = async (itemId: number) => {
        await fetch(`/api/items/claim/${itemId}`, {
            method: 'POST',
        });
        setItems(items.map(item => 
            item.id === itemId ? { ...item, claimed: true } : item
        ));
    };

    const handleMarkAsBought = async (itemId: number) => {
        await fetch(`/api/items/bought/${itemId}`, {
            method: 'POST',
        });
        setItems(items.map(item => 
            item.id === itemId ? { ...item, bought: true } : item
        ));
    };

    return (
        <div>
            <h2>Items Needed</h2>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name} 
                        {!item.claimed && <button onClick={() => handleClaimItem(item.id)}>Claim</button>}
                        {item.claimed && !item.bought && <button onClick={() => handleMarkAsBought(item.id)}>Mark as Bought</button>}
                        {item.bought && <span> - Bought</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;