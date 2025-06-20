import React, { useState } from 'react';
import { api } from '../api';

interface ItemFormProps {
    onItemCreated?: () => void; // Optional callback to notify parent
}

const ItemForm: React.FC<ItemFormProps> = ({ onItemCreated }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name && description) {
            try {
                await api.createItem(name, description);
                setSuccess('Item created successfully');
                setName('');
                setDescription('');
                setError('');
                // Notify parent component that an item was created
                onItemCreated?.();
            } catch (err) {
                setError('Failed to create item');
                setSuccess('');
            }
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
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
};

export default ItemForm; 
