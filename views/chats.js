let token = localStorage.getItem('token')

const send = document.getElementById('send-message')
send.addEventListener('submit',sendmessage)

async function sendmessage(e){
    e.preventDefault()
    try{
        const message = {
            message : e.target.message.value
        }

        const response = await axios.post("http://localhost:3000/chats/send-message",message,{headers:{"Authorization":token}})
    }
    catch(err){
        document.body.innerHTML += `<div style="color:red;">${err.message}</div>`
    }
}