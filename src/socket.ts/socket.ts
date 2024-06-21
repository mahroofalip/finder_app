// socket.ts
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:5000', { // Your backend URL
  withCredentials: true,
});

export default socket;
