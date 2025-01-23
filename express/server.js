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
app.use('/static', express.static(path.join(__dirname, 'public')));
const httpServer = createServer(app);
const io = new Server(httpServer, {cors: {
    origin: process.env.REACT
}});

// request logger
app.use((req, res, next) => {
    console.log(req.method, req.path, req.params, req.body);
    next();
});

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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/app.html'));
});

app.get('/select', (req, res) => {
    res.send(select);
});

app.get('/order', (req, res) => {
    res.send(order);
});


const PORT = process.env.EXPRESS_PORT ?? 3001;
httpServer.listen(PORT, () => {
    console.log('listening on port', PORT);
});

export {
    app,
    httpServer,
    io
};