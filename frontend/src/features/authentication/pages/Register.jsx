import React, { useState } from "react";
import { useNavigate,Link } from "react-router"
import { useAuth } from "../hooks/useauth";

const Register = () =>{

    const { loading,handleRegister} = useAuth()

    //two way binding
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    //using nvaigate hook used to lead user to the different page after registering
    const navigate = useNavigate()

    const handleSubmit = async(e) =>{
        e.preventDefault()
        await handleRegister({username,email,password})
        navigate("/")
    }

    if(loading){
        return (<main><h1>Loading....</h1></main>)
    }
    return(
        <main>
            <div className="form-container">
                <h1>Register new user</h1>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input 
                        onChange={(e) =>{setUsername(e.target.value)}}
                        type="text" id="username" name="username" placeholder="Enter username"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                        onChange={(e) => {setEmail(e.target.value)}}
                        type="email" id="email" name="email" placeholder="Enter email address" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                        onChange={(e) => {setPassword(e.target.value)}}
                        type="text" name="password" id="password" placeholder="Enter password" />
                    </div>

                    <button className="button primary-button">Register</button>
                </form>
                <p>Already have an account ?<Link to={"/login"}> Login</Link></p>
            </div>
        </main>
    )
}
//after creating the login and register ui -> We have to create anavigation ui so user can switch between register and login

export default Register