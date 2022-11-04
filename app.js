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

const sequelize = require('./util/database')
const User = require('./models/users')

app.use('/user',userRoutes)



sequelize.sync({})
  .then(() => {
    app.listen(3000)
  })
  .catch((err) => {
    console.log(err)
  })