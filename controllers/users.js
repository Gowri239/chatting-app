const bcrypt = require('bcrypt')
const User = require('../models/users')

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

        const user = await User.findAll({where: {phonenumber}})
        if(user.length>0){
            return res.status(401).json({message:"User already exists",success:false})
        }

        const saltrounds = 10;
        const hashPassword = await bcrypt.hash(password,saltrounds)
        console.log("123",hashPassword)
    
        await User.create({name,email,phonenumber,password : hashPassword})
        res.status(201).json({message:"signup successful" })
        
    }
       
    catch(err){
        res.status(500).json(err)
    }
 }

 module.exports = {signup}