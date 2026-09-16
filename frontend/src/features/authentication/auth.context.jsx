import { createContext,useState,useEffect  } from "react";
import { getMe } from "./services/auth.api";

export const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
    
    const[user,setUser] = useState(null)
    //In production it is set to true for user hydration
    const[loading,setLoading] = useState(true)

    return(
        <AuthContext.Provider value={{user,setUser,loading,setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}