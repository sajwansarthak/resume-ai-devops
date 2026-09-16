import {createBrowserRouter} from "react-router"
import Login from "./features/authentication/pages/login"
import Register from "./features/authentication/pages/Register"
import Protected from "./features/authentication/components/protected"
import Home from "./features/interview/pages/home"
import Interview from "./features/interview/pages/interview"

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path:"/",
        //made the home page protected so that you can't get to home page without logging in using ./component/protected.jsx
        element: <Protected><h1><Home/></h1></Protected>
    },
    {
        path:"/interview/:interviewId",
        element: <Protected><Interview/></Protected>
    }
])