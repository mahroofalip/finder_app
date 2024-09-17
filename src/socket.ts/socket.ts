import { io, Socket } from 'socket.io-client';
import { BASE_URL } from '../consts';

// Create the socket instance
const socket: Socket = io(`${BASE_URL}`, { 
  withCredentials: true,
  transports: ["websocket"], // Ensures it only uses WebSocket
});

// Handle connection errors
socket.on('connect_error', (err) => {
  console.error('Socket connection error:', err);
});

// Handle connection timeout
socket.on('connect_timeout', () => {
  console.warn('Socket connection timed out.');
});

// Handle reconnection attempts
socket.on('reconnect_attempt', (attemptNumber) => {
  console.log(`Reconnection attempt #${attemptNumber}`);
});

// Handle reconnection failures
socket.on('reconnect_failed', () => {
  console.error('Reconnection failed.');
});

// Handle successful connection
socket.on('connect', () => {
  console.log('Socket connected successfully');
});

export default socket;
