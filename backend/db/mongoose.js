const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://sevindu:Sevi17498@cluster0.ucthoba.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0",
    {useNewUrlParser:true,
    useUnifiedTopology:true,

    }
)

const connection=mongoose.connection
connection.once("open",()=>{
    console.log("MongoDB connected")
})

mongoose.set('strictQuery',true)
