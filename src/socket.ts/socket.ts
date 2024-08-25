import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:5000', { 
  withCredentials: true,
  reconnection: true, 
  reconnectionAttempts: Infinity, 
  reconnectionDelay: 1000, 
  reconnectionDelayMax: 5000, 
  timeout: 20000, 
});

socket.on('connect_error', (err) => {
  console.error('Socket connection error:', err);
});

socket.on('connect_timeout', () => {
  console.warn('Socket connection timed out.');
});

socket.on('reconnect_attempt', (attemptNumber) => {
  console.log(`Reconnect attempt #${attemptNumber}`);
});

socket.on('reconnect_failed', () => {
  console.error('Reconnection failed.');
});

export default socket;
