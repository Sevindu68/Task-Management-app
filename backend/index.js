const express=require("express")
const bodyParser=require("body-parser")
require("./db/mongoose")
const cors=require("cors")
const userRouter=(require("./routes/user"))
const task=require('./routes/task')


const app=express()

app.use(cors())
app.use(bodyParser.json())
app.use(userRouter)
app.use(task)
const port= 5000
app.listen(port, ()=>{
    console.log("Server is up and running "+port)
})
