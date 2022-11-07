const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const userRoutes = require('./routes/users')
const chatRoutes = require('./routes/chats')

const sequelize = require('./util/database')
const User = require('./models/users')
const Chats = require('./models/chats')

app.use('/user',userRoutes)
app.use('/chats',chatRoutes)

User.hasMany(Chats)
Chats.belongsTo(User)


sequelize.sync()
  .then(() => {
    app.listen(3000)
  })
  .catch((err) => {
    console.log(err)
  })