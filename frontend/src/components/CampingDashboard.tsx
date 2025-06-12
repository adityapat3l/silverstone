import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Paper } from '@mui/material';
import { Add as AddIcon, Check as CheckIcon } from '@mui/icons-material';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Item {
  id: number;
  name: string;
  description: string | null;
  claimed_by: number | null;
  is_bought: boolean;
}

const CampingDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
    fetchItems();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8000/users/');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:8000/items/');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleClaimItem = async (itemId: number, userId: number) => {
    try {
      await fetch(`http://localhost:8000/items/${itemId}/claim?user_id=${userId}`, {
        method: 'POST',
      });
      fetchItems(); // Refresh items after claiming
    } catch (error) {
      console.error('Error claiming item:', error);
    }
  };

  const handleMarkAsBought = async (itemId: number, userId: number) => {
    try {
      await fetch(`http://localhost:8000/items/${itemId}/mark_bought?user_id=${userId}`, {
        method: 'POST',
      });
      fetchItems(); // Refresh items after marking as bought
    } catch (error) {
      console.error('Error marking item as bought:', error);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    setSelectedUser(null);
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  const filteredItems = selectedUser
    ? items.filter(item => item.claimed_by === selectedUser.id)
    : items;

  return (
    <Box sx={{ width: '100%', maxWidth: 800, margin: '0 auto', padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab label="Items" />
          <Tab label="Members" />
        </Tabs>

        {selectedTab === 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              {selectedUser ? `${selectedUser.name}'s Items` : 'All Items'}
            </Typography>
            <List>
              {filteredItems.map((item) => (
                <ListItem key={item.id}>
                  <ListItemText
                    primary={item.name}
                    secondary={
                      <>
                        {item.description}
                        <br />
                        {item.claimed_by ? `Claimed by: ${users.find(u => u.id === item.claimed_by)?.name}` : 'Not claimed'}
                        {item.is_bought && ' (Bought)'}
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    {!item.claimed_by && (
                      <IconButton
                        edge="end"
                        onClick={() => handleClaimItem(item.id, selectedUser?.id || 1)}
                        disabled={!selectedUser}
                      >
                        <AddIcon />
                      </IconButton>
                    )}
                    {item.claimed_by && !item.is_bought && (
                      <IconButton
                        edge="end"
                        onClick={() => handleMarkAsBought(item.id, item.claimed_by!)}
                      >
                        <CheckIcon />
                      </IconButton>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {selectedTab === 1 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Party Members
            </Typography>
            <List>
              {users.map((user) => (
                <ListItem
                  key={user.id}
                  button
                  selected={selectedUser?.id === user.id}
                  onClick={() => handleUserSelect(user)}
                >
                  <ListItemText
                    primary={user.name}
                    secondary={user.email}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default CampingDashboard; 