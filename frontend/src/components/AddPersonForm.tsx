import React, { useState } from 'react';
import { api } from '../api';

interface AddPersonFormProps {
    onUserCreated?: () => void;
}

const AddPersonForm: React.FC<AddPersonFormProps> = ({ onUserCreated }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await api.createUser(name, email);
            setName('');
            setEmail('');
            setSuccess('User created successfully');
            if (onUserCreated) onUserCreated();
        } catch (err) {
            setError('Failed to create user');
        }
    };

    return (
        <div>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
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
                <button type="submit">Add Person</button>
            </form>
        </div>
    );
};

export default AddPersonForm;