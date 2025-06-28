import React from 'react';

interface MessageBannerProps {
  error?: string;
  success?: string;
}

const MessageBanner: React.FC<MessageBannerProps> = ({ error, success }) => (
  <>
    {error && <div className="error">{error}</div>}
    {success && <div className="success">{success}</div>}
  </>
);

export default MessageBanner; 