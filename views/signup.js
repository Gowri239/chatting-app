const form  = document.getElementById('signup-form')
const errorDiv = document.getElementById('error')

form.addEventListener('submit' , signup)

async function signup(e){
    e.preventDefault()
    errorDiv.innerHTML =''
    try{
        const signupDetails ={
        name: e.target.name.value,
        email: e.target.email.value,
        phonenumber: e.target.phonenumber.value,
        password: e.target.password.value
       }

        const response = await axios.post("http://localhost:3000/user/signup",signupDetails)
        if(response.status === 201){
           alert(response.data.message)
           window.location.href="../login/login.html"
        }else{
           throw new Error("Failed to login")
        }

    }
    catch(err){
        errorDiv.innerHTML += `<div style="color:red;red;text-align:center;padding:10px;margin-bottom:-30px">${err}</div>`
    }
    
}