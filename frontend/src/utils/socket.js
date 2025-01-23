import { io } from 'socket.io-client';
export const socket = io(process.env.REACT_APP_BACKEND_URL);

export const select = (id) => {
    socket.emit("select", id);
}

export const deselect = (id) => {
    socket.emit("deselect", id);
}

// TODO: integrate payment
export const order = () => {
    socket.emit("order");
}