import React, { useState, useEffect } from 'react';
import { User, Item } from '../types';
import { api } from '../api';
import UserForm from './UserForm';
import ItemForm from './ItemForm';

const CampingDashboard: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [items, setItems] = useState<Item[]>([]);
    const [selectedUser, setSelectedUser] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState('home');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [unclaimedItems, setUnclaimedItems] = useState<Item[]>([]);

    useEffect(() => {
        fetchUsers();
        fetchItems();
    }, []);

    useEffect(() => {
        if (activeTab === 'items') {
            fetchUnclaimedItems();
        }
    }, [activeTab]);

    const fetchUsers = async () => {
        try {
            const data = await api.getUsers();
            setUsers(data);
        } catch (err) {
            setError('Failed to fetch users');
        }
    };

    const fetchItems = async () => {
        try {
            const data = await api.getItems();
            setItems(data);
        } catch (err) {
            setError('Failed to fetch items');
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

    const handleCreateUser = async (user: { name: string; email: string }) => {
        try {
            await api.createUser(user.name, user.email);
            setSuccess('User created successfully');
            fetchUsers();
        } catch (err) {
            setError('Failed to create user');
        }
    };

    const handleCreateItem = async (item: { name: string; description: string }) => {
        try {
            await api.createItem(item.name, item.description);
            setSuccess('Item created successfully');
            fetchItems();
        } catch (err) {
            setError('Failed to create item');
        }
    };

    const handleClaimItem = async (itemId: number) => {
        if (!selectedUser) {
            setError('Please select a user first');
            return;
        }
        try {
            await api.claimItem(itemId, selectedUser);
            setSuccess('Item claimed successfully');
            fetchItems();
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to claim item');
        }
    };

    const handleUnclaimItem = async (itemId: number) => {
        if (!selectedUser) {
            setError('Please select a user first');
            return;
        }
        try {
            await api.unclaimItem(itemId, selectedUser);
            setSuccess('Item unclaimed successfully');
            fetchItems();
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to unclaim item');
        }
    };

    const handleMarkBought = async (itemId: number) => {
        if (!selectedUser) {
            setError('Please select a user first');
            return;
        }
        try {
            await api.markBought(itemId, selectedUser);
            setSuccess('Item marked as bought');
            fetchItems();
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to mark item as bought');
        }
    };

    const handleMarkNotBought = async (itemId: number) => {
        if (!selectedUser) {
            setError('Please select a user first');
            return;
        }
        try {
            await api.markNotBought(itemId, selectedUser);
            setSuccess('Item marked as not bought');
            fetchItems();
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to mark item as not bought');
        }
    };

    const renderHomeTab = () => (
        <div>
            <div className="form-group">
                <label>Select User:</label>
                <select
                    value={selectedUser || ''}
                    onChange={(e) => setSelectedUser(Number(e.target.value))}
                >
                    <option value="">Select a user</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.name} ({user.email})
                        </option>
                    ))}
                </select>
            </div>

            {/* {selectedUser && (
                <>
                    <h2>Your Claimed Items</h2>
                    <ul className="item-list">
                        {items
                            .filter(item => item.claimed_by === selectedUser)
                            .map(item => (
                                <li key={item.id} className="item">
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <p className={item.is_bought ? 'status-bought' : 'status-claimed'}>
                                        Status: {item.is_bought ? 'Bought' : 'Claimed'}
                                    </p>
                                    <div className="item-actions">
                                        {item.is_bought ? (
                                            <>
                                                <button 
                                                    onClick={() => handleMarkNotBought(item.id)}
                                                    className="button-secondary"
                                                >
                                                    Unbuy
                                                </button>
                                                <button 
                                                    onClick={() => handleUnclaimItem(item.id)}
                                                    className="button-danger"
                                                >
                                                    Return to Unclaimed
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button 
                                                    onClick={() => handleMarkBought(item.id)}
                                                    className="button-primary"
                                                >
                                                    Mark as Bought
                                                </button>
                                                <button 
                                                    onClick={() => handleUnclaimItem(item.id)}
                                                    className="button-danger"
                                                >
                                                    Return to Unclaimed
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </li>
                            ))}
                    </ul>

                    <h2>Available Items</h2>
                    <ul className="item-list">
                        {items
                            .filter(item => !item.claimed_by)
                            .map(item => (
                                <li key={item.id} className="item">
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <button 
                                        onClick={() => handleClaimItem(item.id)}
                                        className="button-primary"
                                    >
                                        Claim
                                    </button>
                                </li>
                            ))}
                    </ul>
                </>
            )} */}
        </div>
    );

    const renderUsersTab = () => (
        <div>
            <h2>Create User</h2>
            <UserForm onSubmit={handleCreateUser} />
            <h2>All Users</h2>
            <ul className="user-list">
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} ({user.email})
                    </li>
                ))}
            </ul>
        </div>
    );

    const renderItemsTab = () => (
        <div>
            <h2>Create Item</h2>
            <ItemForm onSubmit={handleCreateItem} />
            <h2>All Items</h2>
            <ul className="item-list">
                {items.map(item => {
                    const claimedUser = users.find(u => u.id === item.claimed_by);
                    const isClaimedBySelected = selectedUser && item.claimed_by === selectedUser;
                    const isUnclaimed = !item.claimed_by;
                    return (
                        <li key={item.id} className="item">
                            <div className="item-header">
                                <h3>{item.name}</h3>
                            </div>
                            <p className="item-description">{item.description}</p>
                            <p className={item.is_bought ? 'status-bought' : item.claimed_by ? 'status-claimed' : 'status-available'}>
                                Status: {item.is_bought ? 'Bought' : item.claimed_by ? 'Claimed' : 'Available'}
                            </p>
                            <div>DEBUG: item.claimed_by = {item.claimed_by}, selectedUser = {selectedUser}</div>
                            <button>TEST BUTTON</button>
                            <p className="item-claimer">
                                Claimed by: {claimedUser ? `${claimedUser.name} (${claimedUser.email})` : item.claimed_by ? `User ID ${item.claimed_by}` : 'Unclaimed'}
                            </p>
                            <div className="item-actions">
                                {isUnclaimed && selectedUser && (
                                    <button
                                        onClick={() => handleClaimItem(item.id)}
                                        className="button-primary"
                                    >
                                        Claim
                                    </button>
                                )}
                                {isClaimedBySelected && !item.is_bought && (
                                    <button
                                        onClick={() => handleMarkBought(item.id)}
                                        className="button-primary"
                                    >
                                        Mark as Bought
                                    </button>
                                )}
                                {isClaimedBySelected && item.is_bought && (
                                    <button
                                        onClick={() => handleMarkNotBought(item.id)}
                                        className="button-secondary"
                                    >
                                        Mark as Not Bought
                                    </button>
                                )}
                                {isClaimedBySelected && (
                                    <button
                                        onClick={() => handleUnclaimItem(item.id)}
                                        className="button-danger"
                                    >
                                        Unclaim
                                    </button>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
            <h2>Unclaimed Items</h2>
            <ul className="item-list">
                {unclaimedItems.map(item => (
                    <li key={item.id} className="item">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p>Status: Available</p>
                        <button
                            onClick={() => selectedUser && handleClaimItem(item.id)}
                            disabled={!selectedUser}
                            className="button-primary"
                        >
                            Claim
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="container">
            <h1>Camping Dashboard</h1>

            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}

            <div className="tabs">
                <button
                    className={activeTab === 'home' ? 'active' : ''}
                    onClick={() => setActiveTab('home')}
                >
                    Home
                </button>
                <button
                    className={activeTab === 'users' ? 'active' : ''}
                    onClick={() => setActiveTab('users')}
                >
                    Users
                </button>
                <button
                    className={activeTab === 'items' ? 'active' : ''}
                    onClick={() => setActiveTab('items')}
                >
                    Items
                </button>
            </div>

            {activeTab === 'home' && renderHomeTab()}
            {activeTab === 'users' && renderUsersTab()}
            {activeTab === 'items' && renderItemsTab()}
        </div>
    );
};

export default CampingDashboard; 