import { Server } from "socket.io";
import http from "http";
import express from "express";

// Create an Express application
const app = express();

// Create a HTTP server using the Express application
const server = http.createServer(app);

// Create a new instance of Socket.IO and attach it to the HTTP server
const io = new Server(server, {
    // Configure CORS for Socket.IO server
    cors: {
        // origin: ["http://localhost:5173"], // Allow requests from this origin
        origin:["https://chat-app-s-9ekl.onrender.com"],
        methods: ['GET', 'POST'] // Allow only specified HTTP methods
    }
});


export const getReceiverSocketId = (receiverid) => {
    return userSocketmap[receiverid];
}

const userSocketmap = {}  //{userId:socketId}


// Handle socket connection event
io.on('connection', (socket) => {
    console.log('a user connected ', socket.id);

    const userId = socket.handshake.query.userId;
    if (userId != "undefined") userSocketmap[userId] = socket.id;

    // io emit() is used events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketmap))

    // Handle socket disconnection event
    socket.on('disconnect', () => {
        console.log('user disconnected ', socket.id);
        delete userSocketmap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketmap))
    });
});

// Export the Express application, Socket.IO instance, and HTTP server
export { app, io, server };
