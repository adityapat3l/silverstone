import React, { useState } from 'react';
import { UserCreate } from '../types';

interface UserFormProps {
    onSubmit: (user: UserCreate) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name && email) {
            onSubmit({ name, email });
            setName('');
            setEmail('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add User</button>
        </form>
    );
};

export default UserForm; 