import React from 'react';
import { User } from '../types';

interface UserSelectorProps {
  users: User[];
  selectedUser: number | null;
  onSelectUser: (userId: number) => void;
}

const UserSelector: React.FC<UserSelectorProps> = ({ users, selectedUser, onSelectUser }) => (
  <div>
    <h2>Select User</h2>
    <select
      value={selectedUser || ''}
      onChange={e => onSelectUser(Number(e.target.value))}
    >
      <option value="">Select a user</option>
      {users.map(user => (
        <option key={user.id} value={user.id}>
          {user.name} ({user.email})
        </option>
      ))}
    </select>
  </div>
);

export default UserSelector; 