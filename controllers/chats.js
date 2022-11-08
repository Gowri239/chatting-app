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
    let msgId = req.query.msg;
    console.log(msgId)
    try{
        
        const messages = await Chats.findAll()
        let index = messages.findIndex(msg => msg.id == msgId)
        
        console.log("567",index)
        let messagesToSend = messages.slice(index+1)
        console.log(messagesToSend.length)
        res.status(200).json({data:messagesToSend,success:true})
        
    }
    catch{
        res.status(500).json({error:err,success:false})
    }
}

module.exports = {sendMessage,getMessages}