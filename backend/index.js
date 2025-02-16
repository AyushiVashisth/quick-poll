const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const connection = require("./config/db");
const pollRoutes = require("./routes/pollRoutes");
const setupSocket = require("./socket/socketHandler");
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Add io to request object
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Homepage route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Routes
app.use("/api/polls", pollRoutes);

// Socket setup with enhanced connection tracking
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Broadcast new user connection
    io.emit('userCount', io.engine.clientsCount);
    
    // Handle live interactions
    socket.on('interaction', (data) => {
        io.emit('newInteraction', {
            type: data.type,
            position: data.position
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        io.emit('userCount', io.engine.clientsCount);
    });
});

// Start server
server.listen(process.env.PORT || 5000, async () => {
    try {
        console.log("Listening on port " + (process.env.PORT || 5000));
        await connection;
        console.log("Successfully connected to MongoDB Atlas");
    } catch (error) {
        console.log(error);
    }
});