const bcrypt = require('bcrypt')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

function isStringInvalid(string){
    if(string == undefined || string.length === 0){
        return true
    } 
    else{
        return false
    }
}

const signup = async (req,res) => {
    try{
        const {name,email,phonenumber,password} = req.body
        console.log(email)
        if(isStringInvalid(name) || isStringInvalid(email) || isStringInvalid(phonenumber)|| isStringInvalid(password)){
            return res.status(400).json({message: "Enter all details",success: false})
        }

        const user = await User.findAll({where: {email}})
        if(user.length>0){
            return res.status(401).json({message:"User already exists",success:false})
        }
        else{
            const saltrounds = 10;
            const hashPassword = await bcrypt.hash(password,saltrounds)
            console.log("123",hashPassword)
            await User.create({name,email,phonenumber,password : hashPassword})
            res.status(201).json({message:"signup successful" })

        }
    
    }
       
    catch(err){
        res.status(500).json(err)
    }
 }

 function generateAccessToken(id){
    return jwt.sign({userId: id},'09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611')
 }

 const login = async(req,res) => {
    try{
        const {email,password} = req.body
        if(isStringInvalid(email) || isStringInvalid(password)){
            console.log(email)
            return res.status(400).json({message: "Enter all details",success:false})
        }

        const user = await User.findAll({where: {email}})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(req,result) => {
                if(result === true){
                    res.status(200).json({message: "user login successful",success:true,user:user,token: generateAccessToken(user[0].id)})
                }else{
                res.status(401).json({message: "user not authorized",success:false})
                }
            })
        }
        else{
            res.status(404).json({message:"User not found",success:false})
        }
    }
    catch(err){
        res.status(500).json({message:err,success:false})

    }

}


 module.exports = {signup,login}