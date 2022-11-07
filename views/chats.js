
let token = localStorage.getItem('token')
let user_id = localStorage.getItem('user-id')
let user_name = localStorage.getItem('username')
const chatContainer = document.querySelector('.chats')
const usersContainer = document.querySelector('.users-list')
const send = document.getElementById('send-message')
send.addEventListener('submit',sendmessage)

async function loadScreen(e){
    e.preventDefault();
    try{
        const response = await axios.get("http://localhost:3000/chats/getMessages",{headers:{"Authorization":token}})
        console.log(response.data.data)
        showChats(response.data.data)
        const res = await axios.get("http://localhost:3000/user/getusers",{headers:{"Authorization":token}})
        showPeople(res.data.data)
    }
    catch(err){
        console.log(err)
    }
}

function showPeople(users){
    usersContainer.innerHTML = ''
    users.map(user =>{
        let child = `<p>${user.name}</p>`

        usersContainer.innerHTML += child
    })
}

function showChats(chats){
    chatContainer.innerHTML = ''
    chats.map(chat =>{
        console.log(chat.userName)
        if(chat.userId!=user_id){
            let child = `<div class="message-incoming">
                    <h5>${chat.userName}</h5>
                    <p>${chat.message}</p>
                    </div>`
                
            chatContainer.innerHTML += child
        }
        else{
            showOutgoingMessages(chat)
        }
       
    })
}

async function sendmessage(e){
    e.preventDefault()
    try{
        const message = {
            message : e.target.message.value
        }

        const response = await axios.post("http://localhost:3000/chats/send-message",message,{headers:{"Authorization":token}})
        e.target.message.value = ''
        if(response.status === 201){
            showOutgoingMessages(response.data.data)
        }

    }
    catch(err){
        document.body.innerHTML += `<div style="color:red;">${err.message}</div>`
    }
}

function showOutgoingMessages(chat){
    let child = `<div class="message-outgoing">
                 <h5>${user_name}</h5>
                 <p>${chat.message}</p>
                 </div>`
                  
    chatContainer.innerHTML += child

}