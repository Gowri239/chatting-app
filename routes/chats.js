const express = require('express')
const router = express.Router()

const chatsController = require('../controllers/chats')
const userAuthentication = require('../middleware/auth')

router.post('/send-message',userAuthentication.authenticate,chatsController.sendMessage)
router.get('/getMessages',userAuthentication.authenticate,chatsController.getMessages)

module.exports = router
