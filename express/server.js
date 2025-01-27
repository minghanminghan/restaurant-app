import { config } from "dotenv";
config();
import cors from "cors";
import express from "express";
import { createServer } from "http";
import { getIo } from "./websocket.js";
import path from "path";
import { fileURLToPath } from 'url';
import mongoose from "mongoose";
import { MenuItem, Order, Restaurant } from "./db/db.js";

const db = process.env.DB ?? "mongodb://127.0.0.1/restaurant";
await mongoose.connect(db).then(() => console.log('connected to mongoose:', db));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors({
    origin: process.env.REACT_URL, 
    credentials: true,            //access-control-allow-credentials:true    
    optionSuccessStatus: 200
}));
app.use('/static', express.static(path.join(__dirname, '/public')));
const httpServer = createServer(app);
getIo(httpServer);


// request logger
app.use((req, res, next) => {
    console.log(req.method, req.path, req.params, req.body);
    next();
});

app.get('/', (req, res) => {
    res.send('API is running!');
});

/*
// make this a socket route
app.get('/:restaurant/:order', async (req, res) => {
    // validate restaurant
    const restaurant = await Restaurant.findOne({ name: req.params.restaurant }).lean();
    if (restaurant === null) {
        res.status(404).send('invalid restaurant name');
    }

    // validate order
    const order = parseInt(req.params.order);
    if (order < 0 || order >= restaurant.capacity) {
        res.status(404).send('invalid order number');
    }

    res.sendStatus(200);
});
*/

const PORT = process.env.EXPRESS_PORT ?? 3001;
httpServer.listen(PORT, () => {
    console.log('listening on port', PORT);
});

export {
    app,
    httpServer
};