import React, { useState, useEffect, useCallback } from 'react';
import { api } from './api';
import { User, Item, UserCreate, ItemCreate } from './types';
import './index.css';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import AddPersonForm from './components/AddPersonForm';
import UserSelector from './components/UserSelector';
import MessageBanner from './components/MessageBanner';
import { useUsers } from './hooks/useUsers';
import { useItems } from './hooks/useItems';
import Navbar from './components/Navbar';

function App() {
  const { users, loading: usersLoading, error: usersError, fetchUsers } = useUsers();
  const { items, loading: itemsLoading, error: itemsError, fetchItems } = useItems();
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>('dashboard');
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [refreshUnclaimedItems, setRefreshUnclaimedItems] = useState<(() => void) | null>(null);

  const handleCreateItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.createItem(newItemName, newItemDescription);
      setNewItemName('');
      setNewItemDescription('');
      fetchItems();
    } catch (err) {
      console.error('Failed to create item', err);
    }
  };

  const handleClaimItem = async (itemId: number) => {
    if (!selectedUser) {
      console.error('Please select a user first');
      return;
    }
    try {
      await api.claimItem(itemId, selectedUser);
    } catch (err) {
      console.error('Failed to claim item', err);
    }
  };

  const handleMarkBought = async (itemId: number) => {
    if (!selectedUser) {
      console.error('Please select a user first');
      return;
    }
    try {
      await api.markBought(itemId, selectedUser);
    } catch (err) {
      console.error('Failed to mark item as bought', err);
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
      <Navbar selectedTab={selectedTab} onTabChange={setSelectedTab} />
      <h1>Camping App</h1>
      <MessageBanner error={usersError || itemsError} />

      {selectedTab === 'createUser' && (
        <AddPersonForm onUserCreated={fetchUsers} />
      )}

      {selectedTab === 'createItem' && (
        <ItemForm onItemCreated={fetchItems} />
      )}

      {selectedTab === 'dashboard' && (
        <>
          <UserSelector users={users} selectedUser={selectedUser} onSelectUser={setSelectedUser} />
          <ItemList 
            users={users} 
            selectedUser={selectedUser}
            onClaimItem={handleClaimItem} 
            onMarkBought={handleMarkBought}
            onItemAction={handleItemAction}
            onRefreshRequested={handleRefreshRequested}
          />
        </>
      )}
    </div>
  );
}

export default App;