import React, { useState } from 'react';

const AddItemForm = () => {
    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logic to handle adding the item goes here
        console.log(`Item Added: ${itemName}, Quantity: ${itemQuantity}`);
        setItemName('');
        setItemQuantity(1);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="itemName">Item Name:</label>
                <input
                    type="text"
                    id="itemName"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="itemQuantity">Quantity:</label>
                <input
                    type="number"
                    id="itemQuantity"
                    value={itemQuantity}
                    onChange={(e) => setItemQuantity(Number(e.target.value))}
                    min="1"
                    required
                />
            </div>
            <button type="submit">Add Item</button>
        </form>
    );
};

export default AddItemForm;