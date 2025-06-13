import React, { useState } from 'react';
import { ItemCreate } from '../types';

interface ItemFormProps {
    onSubmit: (item: ItemCreate) => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name && description) {
            onSubmit({ name, description });
            setName('');
            setDescription('');
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
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Item</button>
        </form>
    );
};

export default ItemForm; 