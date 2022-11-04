const jwt = require('jsonwebtoken')
const User = require('../models/users')

const authenticate = (req,res,next) => {
    try{
        const token = req.header('Authorization')
        console.log(token)
        const user = jwt.verify(token,'09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611')
        console.log("userid is:",user.userId)
        User.findByPk(user.userId).then(user => {
            req.user = user
            next()
        })
    }
    catch(err){
        console.log(err)
        return res.status(401).json({success: false})

    }
    
}

module.exports = { authenticate }