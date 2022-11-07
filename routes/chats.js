const express = require('express')
const router = express.Router()

const chatsController = require('../controllers/chats')
const userAuthentication = require('../middleware/auth')

router.post('/send-message',userAuthentication.authenticate,chatsController.sendMessage)

module.exports = router
