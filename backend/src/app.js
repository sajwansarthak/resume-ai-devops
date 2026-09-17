const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors") 

const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://13.233.122.59/", // or your frontend EC2 URL
    credentials: true
}))

//Require all the routes here
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")
//Using all the auth routes here
app.use("/api/auth",authRouter)
//Using all the interview ai routes
app.use("/api/interview",interviewRouter)

module.exports = app