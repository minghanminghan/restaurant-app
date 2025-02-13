import { io } from 'socket.io-client';

// validation call
// move this out of react app so call gets made before app spins up
// so validity is an environment variable and websocket makes less requests
/*
const INIT_URL = process.env.REACT_APP_BACKEND_URL + "/" + process.env.REACT_APP_RESTAURANT_NAME + "/" + process.env.REACT_APP_ORDER_NUMBER;
export const VALID_CONNECTION = await fetch(INIT_URL)
  .then(res => res.text())
  .then(data => data)
  .catch(err => err);
console.log(VALID_CONNECTION);
*/

export const socket = io(process.env.REACT_APP_BACKEND_URL, {
    query: { 
        "restaurant": process.env.REACT_APP_RESTAURANT_NAME,
        "order": process.env.REACT_APP_ORDER_NUMBER
     },
});

export const select = (id) => {
    socket.emit("select", String(id));
};

export const deselect = (id) => {
    socket.emit("deselect", String(id));
};

// TODO: integrate payment
export const order = () => {
    socket.emit("order");
};