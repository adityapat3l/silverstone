import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Typography,
    Paper,
    Box,
} from '@mui/material';
import { CheckCircle, ShoppingCart } from '@mui/icons-material';
import { Item, User } from '../types';

interface ItemListProps {
    items: Item[];
    users: User[];
    onClaim: (itemId: number, userId: number) => void;
    onMarkBought: (itemId: number, userId: number) => void;
}

export const ItemList: React.FC<ItemListProps> = ({
    items,
    users,
    onClaim,
    onMarkBought,
}) => {
    const getUserName = (userId: number | null) => {
        if (!userId) return 'Unclaimed';
        const user = users.find((u) => u.id === userId);
        return user ? user.name : 'Unknown User';
    };

    return (
        <Paper sx={{ p: 2, maxWidth: 800, mx: 'auto', mt: 2 }}>
            <Typography variant="h6" gutterBottom>
                Items
            </Typography>
            <List>
                {items.map((item) => (
                    <ListItem
                        key={item.id}
                        divider
                        sx={{
                            bgcolor: item.is_bought ? 'action.hover' : 'background.paper',
                        }}
                    >
                        <ListItemText
                            primary={item.name}
                            secondary={
                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.description}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Claimed by: {getUserName(item.claimed_by)}
                                    </Typography>
                                </Box>
                            }
                        />
                        <ListItemSecondaryAction>
                            {!item.claimed_by && (
                                <IconButton
                                    edge="end"
                                    onClick={() => onClaim(item.id, users[0]?.id)}
                                    disabled={users.length === 0}
                                >
                                    <ShoppingCart />
                                </IconButton>
                            )}
                            {item.claimed_by && !item.is_bought && (
                                <IconButton
                                    edge="end"
                                    onClick={() => onMarkBought(item.id, item.claimed_by!)}
                                >
                                    <CheckCircle />
                                </IconButton>
                            )}
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};