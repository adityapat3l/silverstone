import React, { useState, useEffect, useCallback } from 'react';
import { api } from './api';
import { User, Item, UserCreate, ItemCreate } from './types';
import './index.css';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import AddPersonForm from './components/AddPersonForm';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [refreshUnclaimedItems, setRefreshUnclaimedItems] = useState<(() => void) | null>(null);

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
    } catch (err) {
      setError('Failed to mark item as bought');
    }
  };

  const handleItemAction = () => {
    fetchItems();
  };

  const handleItemCreated = () => {
    fetchItems();
    if (refreshUnclaimedItems) {
      refreshUnclaimedItems();
    }
  };

  const handleRefreshRequested = useCallback((refreshFn: () => void) => {
    setRefreshUnclaimedItems(() => refreshFn);
  }, []);

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
        <AddPersonForm onUserCreated={fetchUsers} />
      </div>

      <div>
        <h2>Add Items</h2>
        <ItemForm onItemCreated={handleItemCreated} />
      </div>

      <div>
        <h2>Tracked Items</h2>
        <ItemList 
          users={users} 
          selectedUser={selectedUser}
          onClaimItem={handleClaimItem} 
          onMarkBought={handleMarkBought}
          onItemAction={handleItemAction}
          onRefreshRequested={handleRefreshRequested}
        />
      </div>
    </div>
  );
}

export default App;