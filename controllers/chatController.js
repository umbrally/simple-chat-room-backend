const db = require('../models')
const Msg = db.Msg
const User = db.User

const chatController = {
  getHistoricalMsgs: (req, res) => {
    Msg.findAll({ order: [['createdAt', 'ASC']], include: User }).then(
      results => {
        return res.json({
          historicalMsgs: results
        })
      }
    )
  },
  addMsg: (msg) => {
    return Msg.create({
      content: msg.content,
      UserId: msg.UserId
    }).then(msg => {
      return true
    })
  }
}
module.exports = chatController