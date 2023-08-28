const ws = require('ws');
const express = require('express');
const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('client');
});

const server = app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

const wss = new ws.Server({ server });

const sockets = [];

wss.on('connection', (socket) => {
  console.log('클라이언트가 연결 되었습니다.');
  sockets.push(socket);

  socket.on('message', (message) => {
    const msg = JSON.parse(message);
    console.log(`클라이언트로부터 받은 메시지: ${msg.message}`);

    sockets.forEach((elem) => {
      elem.send(`${msg.user}: ${msg.message}`);
    });
  });
  socket.on('error', (err) => {
    console.log('에러가 발생하였습니다.', err);
  });
  socket.on('close', () => {
    console.log('클라이언트와 연결이 종료됨');
  });
});
