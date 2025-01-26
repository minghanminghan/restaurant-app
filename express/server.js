import { config } from "dotenv";
config();
import cors from "cors";
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use('/static', express.static(path.join(__dirname, '/public')));
const httpServer = createServer(app);

// request logger
app.use((req, res, next) => {
    console.log(req.method, req.path, req.params, req.body);
    next();
});

app.get('/', (req, res) => {
    res.send('API is running!');
});

const PORT = process.env.EXPRESS_PORT ?? 3001;
httpServer.listen(PORT, () => {
    console.log('listening on port', PORT);
});

export {
    app,
    httpServer
};