const chatController = require('../controllers/chatController.js')
const userController = require('../controllers/userController.js')
const passport = require('../config/passport')
const authenticated = passport.authenticate('jwt', { session: false })

module.exports = (app) => {
  app.get('/chat', authenticated, chatController.getHistoricalMsgs
  )
  app.get('/get_current_user', authenticated, userController.getCurrentUser)
  app.post('/signin', userController.signIn)
  app.post('/signup', userController.signUp)
}