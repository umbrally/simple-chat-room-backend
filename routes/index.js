const chatController = require('../controllers/chatController.js')
module.exports = app => {
  app.get('/chat', chatController.getHistoricalMsgs
  )
}