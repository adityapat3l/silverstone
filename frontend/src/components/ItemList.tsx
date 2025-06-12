import React, { useEffect, useState } from 'react';
import { Item, User } from '../types';
import { api } from '../api';

interface ItemListProps {
    users: User[];
    onClaimItem: (itemId: number, userId: number) => void;
    onMarkBought: (itemId: number, userId: number) => void;
}

const ItemList: React.FC<ItemListProps> = ({ users, onClaimItem, onMarkBought }) => {
    const [selectedUser, setSelectedUser] = useState<number | null>(null);
    const [userItems, setUserItems] = useState<Item[]>([]);
    const [unclaimedItems, setUnclaimedItems] = useState<Item[]>([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchUnclaimedItems();
        if (selectedUser) {
            fetchUserItems();
        }
    }, [selectedUser]);

    const fetchUserItems = async () => {
        if (!selectedUser) return;
        try {
            const items = await api.getUserItems(selectedUser);
            setUserItems(items);
        } catch (err) {
            setError('Failed to fetch user items');
        }
    };

    const fetchUnclaimedItems = async () => {
        try {
            const items = await api.getUnclaimedItems();
            setUnclaimedItems(items);
        } catch (err) {
            setError('Failed to fetch unclaimed items');
        }
    };

    const handleUnclaimItem = async (itemId: number) => {
        if (!selectedUser) return;
        try {
            await api.unclaimItem(itemId, selectedUser);
            setSuccess('Item unclaimed successfully');
            fetchUserItems();
            fetchUnclaimedItems();
        } catch (err) {
            setError('Failed to unclaim item');
        }
    };

    const handleMarkNotBought = async (itemId: number) => {
        if (!selectedUser) return;
        try {
            await api.markNotBought(itemId, selectedUser);
            setSuccess('Item marked as not bought');
            fetchUserItems();
        } catch (err) {
            setError('Failed to mark item as not bought');
        }
    };

    return (
        <div>
            <div className="form-group">
                <label>Select User:</label>
                <select
                    value={selectedUser || ''}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedUser(Number(e.target.value))}
                >
                    <option value="">Select a user</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.name} ({user.email})
                        </option>
                    ))}
                </select>
            </div>

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
                                        <button onClick={() => onMarkBought(item.id, selectedUser)}>
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
                                onClick={() => selectedUser && onClaimItem(item.id, selectedUser)}
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