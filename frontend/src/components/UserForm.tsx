import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { UserCreate } from '../types';

interface UserFormProps {
    onSubmit: (user: UserCreate) => void;
}

export const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, email });
        setName('');
        setEmail('');
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Create New User
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
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
            >
                Create User
            </Button>
        </Box>
    );
}; 