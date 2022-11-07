const User = require('../models/users')
const Chats = require('../models/chats')

const sendMessage = async (req,res,next) =>{
    try{
        const {message} = req.body
        if(message === undefined){
            return res.status(400).json({message:"Enter message",success:false})
        }
        const chats = await Chats.create({message,userId:req.user.id,userName:req.user.name})
        res.status(201).json({data:chats,message:"Message stored",success:true})

    }
    catch(err){
        res.status(500).json({error:err,success:false})
    }
}

const getMessages = async(req,res,next) =>{
    try{
        console.log("234")
        const messages = await Chats.findAll()
        res.status(200).json({data:messages,success:true})

    }
    catch{
        res.status(500).json({error:err,success:false})
    }
}

module.exports = {sendMessage,getMessages}