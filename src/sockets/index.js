import * as io from 'socket.io-client';

export const socketInstance = io('http://localhost:3000');