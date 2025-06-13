import React, { useState, useEffect } from 'react';
import { api } from './api';
import { User, Item, UserCreate, ItemCreate } from './types';
import './index.css';
import ItemList from './components/ItemList';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchUsers();
    fetchItems();
  }, []);

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

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.createUser(newUserName, newUserEmail);
      setNewUserName('');
      setNewUserEmail('');
      setSuccess('User created successfully');
      fetchUsers();
    } catch (err) {
      setError('Failed to create user');
    }
  };

  const handleCreateItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.createItem(newItemName, newItemDescription);
      setNewItemName('');
      setNewItemDescription('');
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
    } catch (err) {
      setError('Failed to claim item');
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
    } catch (err) {
      setError('Failed to mark item as bought');
    }
  };

  return (
    <div className="container">
      <h1>Camping App</h1>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <div>
        <h2>Select User</h2>
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

      <div>
        <h2>Create User</h2>
        <form onSubmit={handleCreateUser}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={newUserName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewUserName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={newUserEmail}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewUserEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Create User</button>
        </form>
      </div>

      <div>
        <h2>Create Item</h2>
        <form onSubmit={handleCreateItem}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={newItemName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewItemName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={newItemDescription}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewItemDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit">Create Item</button>
        </form>
      </div>

      <div>
        <h2>Items</h2>
        <ItemList users={users} onClaimItem={handleClaimItem} onMarkBought={handleMarkBought} />
      </div>
    </div>
  );
}

export default App;