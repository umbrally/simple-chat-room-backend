const db = require('../models')
const Msg = db.Msg
const User = db.User

const chatController = {
  getHistoricalMsgs: (req, res) => {
    Msg.findAll({ include: User }).then(
      results => {
        return res.json({
          historicalMsgs: results
        })
      }
    )
  },
  addMsg: (req, res) => {
    Msg.create({
      content: req.body.msg,
      UserId: 1
    }).then(msg => {
      res.json(
        { status: 'success', message: msg }
      )
    })
  }
}
module.exports = chatController