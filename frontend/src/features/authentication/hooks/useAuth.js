//creating hook layer used to manage our state layer and api layer

import { useContext,useEffect } from "react";
//importing our state layer
import { AuthContext } from "../auth.context";
//importing our api layer
import { login,register,logout,getMe } from "../services/auth.api";

export const useAuth = () =>{

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading} = context

    const handleLogin = async ({ email, password}) => { 
        setLoading(true)
        try{
            const data = await login({email,password})

            setUser(data.user)
        }catch(err){

        }finally{
            setLoading(false)
        }
    }

    const handleRegister = async ({username,email,password}) => {
        setLoading(true)
        try{
            const data = await register({username,email,password})

            setUser(data.user)
        }catch(err){
        
        }finally{
            setLoading(false)
        }
    }

    const handleLogout = async () =>{
        setLoading(true)
        try{
            const data = await logout()
            setUser(null)
        }catch(err){

        }finally{
            setLoading(false)
        }
    }

    //fixing the problem ->after login when you reloaded the page useState user becomes null so the protected.jsx was directing to login again using this we are getting the userinfo from cookie and setting the user data
    useEffect(() =>{

        const getAndSetUser = async() =>{
            try{
                const data = await getMe()
                setUser(data.user)
            }catch(err){
                console.log(err)
            }finally{
                setLoading(false)
            }
        }

        getAndSetUser()
    },[])

    return{ user,loading,handleLogin,handleLogout,handleRegister }
}