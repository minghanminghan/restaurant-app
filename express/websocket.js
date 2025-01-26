import { config } from "dotenv";
config();
import { Server } from "socket.io";
import { httpServer } from "server.js";

/*
// temp model of db: id: { name, description, cost }
const menu = {
    0: {
        id: 0, // might be redundant
        name: "one",
        desc: "id=0, name='one', cost=1",
        cost: 1
    },
    1: {
        id: 1,
        name: "one thousand",
        desc: "id=1, name='one thousand', cost=1000",
        cost: 1000
    },
    2: {
        id: 2,
        name: "one million",
        desc: "id=2, name='one million', cost=1000000",
        cost: 1000000
    },
};

// caches
const select = {0: 0, 1: 0, 2: 0, count: 0, cost: 0};
const order = {0: 0, 1: 0, 2: 0, count: 0, cost: 0}; // monotonic non-decreasing
let conn_count = 0;
*/

// refactor cache here
// define select, order using Order model
// rmb changed method: Order.getCount() instead of Order.count


const io = new Server(httpServer, {cors: {
    origin: process.env.REACT
}});

// websocket config
io.on("connection", (socket) => {
    conn_count++;
    console.log("connections:", conn_count);
    io.to(socket.id).emit('welcome', {conn: conn_count, menu: menu, select: select, order: order});
    io.emit("conn", conn_count);


    socket.on("disconnect", () => {
        conn_count--;
        console.log("connections:", conn_count);
        io.emit("conn", conn_count);
    });


    // user actions: add item, remove item, order, pay
    socket.on("select", (id) => { // reference menu[id]
        if (select[id] !== undefined) {
            // increment cache item
            select[id]++;
            select['count']++;
            select['cost'] += menu[id].cost;
            io.emit("select", select);
            console.log("select:", select);
        }
    });


    socket.on("deselect", (id) => { // 
        if (select[id] !== undefined && select[id] > 0) {
            // remove index from list
            select[id]--;
            select['count']--;
            select['cost'] -= menu[id].cost;
            io.emit("select", select);
            console.log("select", select);
        }
    });

    socket.on("order", () => {
        if (select.count > 0) {
            // move all of select into order
            Object.keys(select).forEach(k => {
                order[k] += select[k];
                select[k] = 0;
            });
            io.emit("order", order, select);
            console.log("order", order);
        }
    });
});

export {
    io
};