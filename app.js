const express = require('express')
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

let onlineCount = 0;
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.send('<h1>你好web秀</h1>');
});
const sockets = []
io.on('connection', (socket) => {
  // 有連線發生時增加人數

  onlineCount++;
  console.log('socket 連線', onlineCount)
  // 發送人數給網頁
  io.emit("online", onlineCount);
  sockets.push(socket.id)
  socket.on("greet", () => {
    socket.emit("greet", onlineCount);
  });

  socket.on("send", (msg) => {
    // 如果 msg 內容鍵值小於 2 等於是訊息傳送不完全
    // 因此我們直接 return ，終止函式執行。
    console.log('後端收到訊息', msg)
    if (Object.keys(msg).length < 2) return;

    // 廣播訊息到聊天室
    io.emit("msg", msg);
  });

  socket.on('disconnect', () => {
    // 有人離線了，扣人
    onlineCount = (onlineCount < 0) ? 0 : onlineCount -= 1;
    io.emit("online", onlineCount);
    sockets.slice(sockets.indexOf(socket.id), 0)
  });
});

http.listen(port, () => {
  console.log('listening on *:3000');
});
require('./routes')(app)