import React from 'react';
import Typography from '@mui/material/Typography';
import { OnlineBadge } from '../Badges/Badges';

const getTimeAgoSp = (timestamp: string | number): string => {
  const now = new Date();
  const updatedAt = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - updatedAt.getTime()) / 1000);
  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return `${updatedAt.toDateString()}`;
};

const Subheader: React.FC<{ messageRoom: any; user: any }> = ({ messageRoom, user }) => {
  const isOnline = (messageRoom.senderId === user?.id ? messageRoom.Receiver : messageRoom.Sender)?.isOnline;
  const updatedAt = (messageRoom.senderId === user?.id ? messageRoom.Receiver : messageRoom.Sender)?.updatedAt;

  return (
    <Typography>
      {isOnline
        ? "Online"
        : getTimeAgoSp(updatedAt)}
      <OnlineBadge />
    </Typography>
  );
};

export default Subheader;
