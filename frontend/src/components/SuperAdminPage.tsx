import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { api } from '../api';

const SuperAdminPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await api.getUsers();
            setUsers(data);
        } catch (err) {
            setError('Failed to fetch users');
        }
    };

    const handleDeleteUser = async (userId: number) => {
        try {
            // TODO: Implement delete user functionality in the API
            setError('Delete user functionality not implemented');
        } catch (err) {
            setError('Failed to delete user');
        }
    };

    return (
        <div className="container">
            <h1>Super Admin Page</h1>
            {error && <div className="error">{error}</div>}

            <div>
                <h2>Users</h2>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            {user.name} <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SuperAdminPage;