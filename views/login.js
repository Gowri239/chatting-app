const form = document.getElementById('login-form');
const errorDiv = document.getElementById('error')


form.addEventListener('submit' , login)
forgetPass.addEventListener('click' , forgetPassword)

async function login(e){
    e.preventDefault()
    try{
    const loginDetails = {
        email: e.target.email.value,
        password: e.target.password.value
    }
    const response = await axios.post("http://localhost:3000/user/login",loginDetails)
    if(response.status === 200){
        alert(response.data.message)
        localStorage.setItem('token',response.data.token)
    }
    } 
    catch(err){
       if(err.response.status === 401){
        alert(err.response.data.message)
       }
       if(err.response.status === 404){
        alert(err.response.data.message)
       }

       console.log(err)

    }

}


