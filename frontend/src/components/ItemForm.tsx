import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { ItemCreate } from '../types';

interface ItemFormProps {
    onSubmit: (item: ItemCreate) => void;
}

export const ItemForm: React.FC<ItemFormProps> = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, description });
        setName('');
        setDescription('');
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Create New Item
            </Typography>
            <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                required
            />
            <TextField
                fullWidth
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                margin="normal"
                required
                multiline
                rows={3}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
            >
                Create Item
            </Button>
        </Box>
    );
}; 