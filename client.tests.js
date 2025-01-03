import { io } from 'socket.io-client';

const PORT = process.env.PORT || 3000;

const socket = io(`http://localhost:${PORT}`, {
    auth: {
        token: '',
    },
});

socket.on('connect', () => {
    console.log('Connected to server');

    socket.emit('joinRoom', 'profile_updates');

    socket.on('newMessage', (data) => {
        console.log('New message received:', data);
    });


    socket.on('loggedOut', (message) => {
        console.warn(message);
    });
});