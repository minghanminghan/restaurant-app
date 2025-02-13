import { config } from "dotenv";
config();
import { Server } from "socket.io";
import { MenuItem, Order, Restaurant } from "./db/db.js";


export const getIo = (server) => {
    const io = new Server(server, {
        cors: { origin: process.env.REACT_URL ?? 3000 },
    });

    // add socket middleware

    io.on("connection", async (socket) => {
        console.log(socket.handshake.query);
        const restaurant = await Restaurant.findOne({ name: socket.handshake.query.restaurant });
        if (restaurant === null) {
            socket.disconnect();
        }

        // validation
        const ORDER_IDX = parseInt(socket.handshake.query.order);
        if (ORDER_IDX < 0 || ORDER_IDX >= restaurant.capacity) {
            socket.disconnect();
            return;
        }
        const order = await Order.findOne(restaurant.orders[ORDER_IDX]);
        if (!order.isActive) {
            order.isActive = true;
        }
        order.connections++;
        //console.log('connect', order);

        // room scheme:
        // `${restaurant.name}-${ORDER_IDX}`
        // same as `${socket.handshake.query.restaurant}-${socket.handshake.query.order}`
        const TABLE_ID = `${restaurant.name}-${ORDER_IDX}`
        socket.join(TABLE_ID);
        await order.save();

        io.to(socket.id).emit('welcome', {
            menu: restaurant.menu,
            order: order
        });
        io.to(TABLE_ID).emit("conn", order.connections);


        socket.on("disconnect", async () => {
            order.connections -= 1;
            io.to(TABLE_ID).emit("conn", order.connections);
            await order.save();
        });
    
    
        // user actions: add item, remove item, order, pay
        socket.on("select", async (id) => { // reference menu[id]
            try {
                if (id >= 0 && id < restaurant.menu.length) {
                    throw new Error('invalid menu item');
                }
                const item = restaurant.menu[id];
                order.items[id] += 1;
                order.cost += item.cost;
                io.to(TABLE_ID).emit("select", order);

                order.markModified('items');
                await order.save();
                //console.log('increment',order);
            } 
            catch(e) {
                console.log(e);
            }
        });
    
    
        socket.on("deselect", async (id) => {
            try {
                if (id >= 0 && id < restaurant.menu.length) {
                    throw new Error('invalid menu item');
                }
                const item = restaurant.menu[id];
                if (order.items[id] === undefined) {
                    throw new Error('cannot decrement menu item');
                } else if (order.items[id] > 0) {
                    order.items[id] -= 1;
                    order.cost -= item.cost;
                    io.to(TABLE_ID).emit("select", order);
                    
                    order.markModified('items');
                    await order.save();
                    //console.log('decrement',order);
                }
            }
            catch(e) {
                console.log(e);
            }
        });
    

        // TODO: connect to stripe
        socket.on("order", async () => {
            // TODO: validate order


            // check order cost > 0
            if (order.cost > 0) {
                // move around orders
                restaurant.submitOrder(ORDER_IDX, order);

                // write client-side logic to handle this
                io.to(TABLE_ID).emit("submitted");
            }
        });
    });
};