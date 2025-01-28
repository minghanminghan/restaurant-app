import { config } from "dotenv";
config();
import { Server } from "socket.io";
import { MenuItem, Order, Restaurant } from "./db/db.js";

// isolating socket.io dependency to websocket.js file

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
*/

// refactor cache here
// define select, order using Order model
// rmb changed method: Order.getCount() instead of Order.count

export const getIo = (server) => {
    let CONNECTIONS = 0;
    const io = new Server(server, {
        cors: { origin: process.env.REACT_URL ?? 3000 },
    });

    // verify connection
    io.use(async function(socket, next) {
        const restaurant = await Restaurant.findOne({ name: socket.query.restaurant }).lean();
        if (restaurant === null) {
            next(new Error('Invalid restaurant'));
        }

        // validate order
        const order = parseInt(req.params.order);
        if (order < 0 || order >= restaurant.capacity) {
            next(new Error('Invalid order number'));
        }

        res.sendStatus(200);
    })


    io.on("connection", (socket) => {
        // TODO: implement validation

        CONNECTIONS++;
        console.log("connections:", CONNECTIONS);
        
        // configure menu, select, order
            // menu: grab from database and drop irrelevant fields (_id, etc.)
            // select, order: create cache
        io.to(socket.id).emit('welcome', {conn: CONNECTIONS, menu: menu, select: select, order: order});
        io.emit("conn", CONNECTIONS);
    
    
        socket.on("disconnect", () => {
            CONNECTIONS--;
            console.log("connections:", CONNECTIONS);
            io.emit("conn", CONNECTIONS);
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
};