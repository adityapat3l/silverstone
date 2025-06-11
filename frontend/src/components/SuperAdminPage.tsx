import React, { useEffect, useState } from 'react';

const SuperAdminPage: React.FC = () => {
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        fetchUsers();
        fetchGroups();
    }, []);

    const fetchUsers = async () => {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
    };

    const fetchGroups = async () => {
        const response = await fetch('/api/groups');
        const data = await response.json();
        setGroups(data);
    };

    const handleDeleteUser = async (userId: string) => {
        await fetch(`/api/users/${userId}`, {
            method: 'DELETE',
        });
        fetchUsers();
    };

    const handleDeleteGroup = async (groupId: string) => {
        await fetch(`/api/groups/${groupId}`, {
            method: 'DELETE',
        });
        fetchGroups();
    };

    return (
        <div>
            <h1>Super Admin Page</h1>
            <h2>Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h2>Groups</h2>
            <ul>
                {groups.map(group => (
                    <li key={group.id}>
                        {group.name} <button onClick={() => handleDeleteGroup(group.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SuperAdminPage;