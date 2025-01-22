import { io } from 'socket.io-client';
export const socket = io(process.env.REACT_APP_BACKEND);

// create an object to hold states of socket, import elsewhere


// update socket state here
socket.on();