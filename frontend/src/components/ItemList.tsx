import React, { useEffect, useState, useCallback } from 'react';
import { Item, User } from '../types';
import { api } from '../api';

interface ItemListProps {
    users: User[];
    selectedUser: number | null;
    onClaimItem: (itemId: number, userId: number) => void;
    onMarkBought: (itemId: number, userId: number) => void;
    onItemAction?: () => void; // Callback to notify parent of item actions
}

const ItemList: React.FC<ItemListProps> = ({ users, selectedUser, onClaimItem, onMarkBought, onItemAction }) => {
    const [userItems, setUserItems] = useState<Item[]>([]);
    const [unclaimedItems, setUnclaimedItems] = useState<Item[]>([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const fetchUserItems = useCallback(async () => {
        if (!selectedUser) return;
        try {
            const items = await api.getUserItems(selectedUser);
            setUserItems(items);
        } catch (err) {
            setError('Failed to fetch user items');
        }
    }, [selectedUser]);

    const fetchUnclaimedItems = useCallback(async () => {
        try {
            const items = await api.getUnclaimedItems();
            setUnclaimedItems(items);
        } catch (err) {
            setError('Failed to fetch unclaimed items');
        }
    }, []);

    useEffect(() => {
        fetchUnclaimedItems();
        if (selectedUser) {
            fetchUserItems();
        } else {
            setUserItems([]);
        }
    }, [selectedUser, fetchUserItems, fetchUnclaimedItems]);

    const handleUnclaimItem = async (itemId: number) => {
        if (!selectedUser) return;
        try {
            await api.unclaimItem(itemId, selectedUser);
            setSuccess('Item unclaimed successfully');
            await fetchUserItems();
            await fetchUnclaimedItems();
            onItemAction?.();
        } catch (err) {
            setError('Failed to unclaim item');
        }
    };

    const handleMarkBought = async (itemId: number) => {
        if (!selectedUser) return;
        try {
            await onMarkBought(itemId, selectedUser);
            // Refresh user items after marking as bought
            await fetchUserItems();
            onItemAction?.();
        } catch (err) {
            setError('Failed to mark item as bought');
        }
    };

    const handleMarkNotBought = async (itemId: number) => {
        if (!selectedUser) return;
        try {
            await api.markNotBought(itemId, selectedUser);
            setSuccess('Item marked as not bought');
            await fetchUserItems();
            onItemAction?.();
        } catch (err) {
            setError('Failed to mark item as not bought');
        }
    };

    const handleClaimItem = async (itemId: number) => {
        if (!selectedUser) return;
        try {
            await onClaimItem(itemId, selectedUser);
            // Refresh both lists after claiming
            await fetchUserItems();
            await fetchUnclaimedItems();
        } catch (err) {
            setError('Failed to claim item');
        }
    };

    return (
        <div>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}

            {selectedUser && (
                <div>
                    <h2>Your Items</h2>
                    <ul className="item-list">
                        {userItems.map(item => (
                            <li key={item.id} className="item">
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                <p>Status: {item.is_bought ? 'Bought' : 'Claimed'}</p>
                                <div className="item-actions">
                                    {item.is_bought ? (
                                        <button onClick={() => handleMarkNotBought(item.id)}>
                                            Mark as Not Bought
                                        </button>
                                    ) : (
                                        <button onClick={() => handleMarkBought(item.id)}>
                                            Mark as Bought
                                        </button>
                                    )}
                                    <button onClick={() => handleUnclaimItem(item.id)}>
                                        Unclaim Item
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div>
                <h2>Unclaimed Items</h2>
                <ul className="item-list">
                    {unclaimedItems.map(item => (
                        <li key={item.id} className="item">
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <button
                                onClick={() => handleClaimItem(item.id)}
                                disabled={!selectedUser}
                            >
                                Claim
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ItemList;