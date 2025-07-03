import { Server } from "socket.io";

let io: Server | null = null;

export const setSocketInstance = (ioInstance: Server) => {
  io = ioInstance;
};

export const getSocketInstance = (): Server => {
  if (!io) {
    throw new Error("Socket.IO not initialized");
  }
  return io;
};
