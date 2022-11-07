const User = require('../models/users')
const Chats = require('../models/chats')

const sendMessage = async (req,res) =>{
    try{
        const {message} = req.body
        if(message === undefined){
            return res.status(400).json({message:"Enter message",success:false})
        }
        const chats = await Chats.create({message,userId:req.user.id})
        res.status(201).json({data:chats,message:"Message stored",success:true})

    }
    catch(err){
        res.status(500).json(err)
    }
}

module.exports = {sendMessage}