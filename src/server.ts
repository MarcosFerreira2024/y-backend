import express from "express";
import "reflect-metadata";
import { routes } from "./presentation/routes/routes";
import http from "http";
import dotenv from "dotenv";
import { configureSocket } from "./infrastructure/configs/socket/socket";
import { configureExpress } from "./infrastructure/configs/express";
import { setSocketInstance } from "./infrastructure/configs/socket/socketInstance";
dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

configureExpress(app);
const io = configureSocket(server);

setSocketInstance(io);

app.use(routes);

server.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
