const express = require('express')
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 3000
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const chatController = require('./controllers/chatController.js')
const passport = require('./config/passport')
app.use(cors())
let onlineCount = 0;
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(passport.initialize())
let userName = ''
app.use('/chat', passport.authenticate('jwt', { session: false }),
  function (req, res, next) {
    console.log('使用者', req.user.name);
    userName = req.user.name
    next()
  }
)

const sockets = []

io.on('connection', (socket) => {
  // 有連線發生時增加人數
  // console.log('已經登入?', authenticated)
  onlineCount++;
  console.log('socket 連線', onlineCount)
  console.log('誰上線?', userName)
  // 發送人數給網頁
  io.emit("online", onlineCount);
  sockets.push(socket.id)

  // 前端使用者登入後傳入的event
  socket.on("signIn", (user) => {
    console.log('登入者?', user.userName)
    io.emit("signInUser", user)
  })
  // 前端使用者輸入訊息
  socket.on("send", async (msg) => {
    try {
      // 如果 msg 內容鍵值小於 2 等於是訊息傳送不完全
      // 因此我們直接 return ，終止函式執行。
      console.log('後端收到訊息', msg)
      if (Object.keys(msg).length < 2) return;
      let result = await chatController.addMsg(msg)
      if (!result) { throw new Error('儲存失敗') }
      // 廣播訊息到聊天室
      io.emit("msg", msg);
    }
    catch (error) {
      console.error(error)
      chat.emit("error", '無法儲存訊息!');
    }
  });

  socket.on('disconnect', () => {
    // 有人離線了，扣掉連線人數
    onlineCount = (onlineCount < 0) ? 0 : onlineCount -= 1;
    io.emit("online", onlineCount);
    sockets.slice(sockets.indexOf(socket.id), 0)
    console.log('有人離線了')
  });
});

http.listen(port, () => {
  console.log('APP is running');
});

require('./routes')(app)