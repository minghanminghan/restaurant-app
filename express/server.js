import { config } from "dotenv";
config();
import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {cors: {
    origin: "http://localhost:3000"
}});

// request logger
app.use((req, res, next) => {
    console.log(req.path, req.params, req.body);
    next();
});

// temp model of db: id: { name, description, cost }
const menu = {
    0: {
        id: 0, // might be redundant
        src: "img0.png",
        name: "one",
        desc: "id=0, name='one', cost=1",
        cost: 1
    },
    1: {
        id: 1,
        src: "img1.png",
        name: "one thousand",
        desc: "id=1, name='one thousand', cost=1000",
        cost: 1000
    },
    2: {
        id: 2,
        src: "img2.png",
        name: "one million",
        desc: "id=2, name='one million', cost=1000000",
        cost: 1000000
    },
};

// caches
const select = {0: 0, 1: 0, 2: 0, count: 0, cost: 0}; // TODO: fix this
const order = {0: 0, 1: 0, 2: 0, count: 0, cost: 0}; // monotonic non-decreasing
let conn_count = 0;

// websocket config
io.on("connection", (socket) => {
    conn_count++;
    console.log("connections:", conn_count);
    io.to(socket.id).emit('welcome', {menu: menu});
    io.to(socket.id).emit('cache', {select: select, order: order});    
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
        if (select[id] !== undefined) {
            // remove index from list
            io.emit("deselect", id);
            select[id]--;
            console.log("select:", select);
        }
    });

    // TODO: fix this logic
    socket.on("order", () => {
        io.emit("order");
        // move all of select into order
        order.push(...select);
        select.splice(0);
        console.log(order);
    });


    socket.on("pay", (transaction) => {
        // 
    });
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/app.html'));
});


const PORT = process.env.EXPRESS_PORT ?? 3001;
httpServer.listen(PORT, () => {
    console.log('listening on port', PORT);
});