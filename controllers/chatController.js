const db = require('../models')
const Msg = db.Msg

const chatController = {
  getHistoricalMsgs: (req, res) => {

    return res.send('歷史資訊')
  }
}
module.exports = chatController