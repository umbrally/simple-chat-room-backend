const chatController = require('../controllers/chatController.js')
const userController = require('../controllers/userController.js')
module.exports = app => {
  app.get('/chat', chatController.getHistoricalMsgs
  )
  app.post('/signin', userController.signIn)
  app.post('/signup', userController.signUp)
}