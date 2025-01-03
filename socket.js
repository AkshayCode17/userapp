const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const setupSocketIO = (server) => {
    const io = new Server(server);

    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) return next(new Error('Authentication error'));

        try {
            const user = jwt.verify(token, process.env.JWT_SECRET_KEY); 
            socket.user = user;
            next();
        } catch (err) {
            next(new Error('Authentication error'));
        }
    });

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.user.userId}`);

        socket.on('joinRoom', (room) => {
            socket.join(room);
            console.log(`User ${socket.user.userId} joined room: ${room}`);
        });

        socket.on('broadcastMessage', ({ room, message }) => {
            io.to(room).emit('newMessage', { user: socket.user.userId, message });
        });

        socket.on("logout", () => {
            io.to(socket.user.userId).emit('loggedOut', 'You have been logged out due to single-session policy.');
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.user.userId}`);
        });
    });

    return io;
};

module.exports = setupSocketIO;
