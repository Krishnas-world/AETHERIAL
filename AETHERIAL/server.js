// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const httpServer = http.createServer(app);
const io = socketIo(httpServer);

// Serve static files
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A client connected');

  // Simulate helmet status updates every 2 seconds
  setInterval(() => {
    const helmetStatus = Math.random() < 0.5 ? 'Worn' : 'Not Worn';
    socket.emit('helmetStatusUpdate', { status: helmetStatus });
  }, 2000);
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
