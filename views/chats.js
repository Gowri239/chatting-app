
let token = localStorage.getItem('token')
let user_id = localStorage.getItem('user-id')
let user_name = localStorage.getItem('username')
const chatContainer = document.querySelector('.chats')
const usersContainer = document.querySelector('.users-list')
const send = document.getElementById('send-message')
send.addEventListener('submit',sendmessage)

let lastId ;
let chatArray = []

window.addEventListener('DOMContentLoaded',loadScreen)

async function loadScreen(e){
    e.preventDefault();
    setInterval(async ()=>{ 
        const messages = JSON.parse(localStorage.getItem('msg'))
        // console.log(messages.length)
        if(messages == undefined || messages.length == 0){
            lastId = 0
        }
        else{
            console.log(messages.length)
            lastId = messages[messages.length-1].id;
        }
       
        try{
            const response = await axios.get(`http://localhost:3000/chats/getMessages?msg=${lastId}`,{headers:{"Authorization":token}})

            var newArray = response.data.data
            console.log(newArray)
        
            saveToLocalStorage(newArray)
        
            const res = await axios.get("http://localhost:3000/user/getusers",{headers:{"Authorization":token}})
            showPeople(res.data.data)
        }
        catch(err){
            console.log(err)
        }
    },1000)
}

function saveToLocalStorage(arr){
    let oldMessages = JSON.parse(localStorage.getItem('msg'));

    if(oldMessages == undefined || oldMessages.length == 0){
        chatArray = chatArray.concat(arr)
    }else{
        chatArray =[]
        chatArray = chatArray.concat(oldMessages,arr);
    }
    localStorage.setItem('msg' , JSON.stringify(chatArray))
    console.log((JSON.parse(localStorage.getItem('msg'))).length)

    showChats()
}

function showPeople(users){
    usersContainer.innerHTML = ''
    users.map(user =>{
        let child = `<p>${user.name}</p>`
        
        usersContainer.innerHTML += child
    })
}

function showChats(){
    chatContainer.innerHTML = ''
    console.log(chatArray)
    chatArray.forEach(chat =>{
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
            // showOutgoingMessages(response.data.data)
            saveToLocalStorage(response.data.data)
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