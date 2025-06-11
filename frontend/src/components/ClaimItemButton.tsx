import React from 'react';

interface ClaimItemButtonProps {
    itemId: string;
    onClaim: (itemId: string) => void;
}

const ClaimItemButton: React.FC<ClaimItemButtonProps> = ({ itemId, onClaim }) => {
    const handleClaim = () => {
        onClaim(itemId);
    };

    return (
        <button onClick={handleClaim}>
            Claim Item
        </button>
    );
};

export default ClaimItemButton;