import { Server } from "socket.io";
import http from "http";
import { container } from "tsyringe";
import VerifyTokenUseCase from "../../../application/useCases/Authentication/VerifyTokenUseCase";

export const configureSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("Missing token"));

    try {
      const payload = await container
        .resolve(VerifyTokenUseCase)
        .execute(token);

      (socket as any).userId = payload.user_id;
      return next();
    } catch (error) {
      return next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    const userId = (socket as any).userId;
    socket.join(`user:${userId}`);
  });

  return io;
};
