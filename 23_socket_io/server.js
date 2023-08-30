const http = require('http');
const express = require('express');
const SocketIO = require('socket.io');

const PORT = 8000;
const app = express();

const server = http.createServer(app);
const io = SocketIO(server);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/:room', (req, res) => {
  const room = req.params.room;
});

function getUserInRoom(room) {
  const users = [];
  const clients = io.sockets.adapter.rooms.get(room);
  if (clients) {
    clients.forEach((socketId) => {
      const userSocket = io.sockets.sockets.get(socketId);
      const info = { name: userSocket.user, key: socketId };
      users.push(info);
    });
  }
  return users;
}
const roomList = [];

io.on('connection', (socket) => {
  socket.emit('roomList', roomList);
  socket.on('create', (roomName, userName, cb) => {
    socket.join(roomName);
    socket.room = roomName;
    socket.user = userName;

    socket.to(roomName).emit('notice', `${socket.id}님이 입장하셨습니다.`);

    if (!roomList.includes(roomName)) {
      roomList.push(roomName);
      io.emit('roomList', roomList);
    }
    const usersInRoom = getUserInRoom(roomName);
    io.to(roomName).emit('userList', usersInRoom);
    cb();
  });

  socket.on('sendMessage', (message) => {
    if (message.user === 'all') {
      io.to(socket.room).emit(
        'newMessage',
        message.message,
        message.nick,
        false
      );
    } else {
      io.to(message.user).emit(
        'newMessage',
        message.message,
        message.nick,
        true
      );
      socket.emit('newMessage', message.message, message.nick, true);
    }
  });

  socket.on('disconnect', () => {
    if (socket.room) {
      socket.leave(socket.room);
    }
  });
});

server.listen(8000, () => {
  console.log(`http://localhost:${PORT}`);
});
