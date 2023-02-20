import express  from "express";
import { Server } from "ws"
import { createServer } from "http"
import cors from "cors"
import router from "./router";
import socket from "./socket";

const PORT = 4000;
const app = express();

app.use(express.json());
app.use(cors());
const server = createServer(app);

router(app);

server.listen(PORT, () => console.log(`Starting server on port ${PORT}`));

const ws = new Server({ path: "/ws", server });

socket(ws);