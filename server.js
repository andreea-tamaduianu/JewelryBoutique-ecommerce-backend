const express=require('express')
const mongoose= require('mongoose')
const morgan= require('morgan')
const bodyParser= require('body-parser')
const cors= require('cors')
const fs =require('fs')
require('dotenv').config()

//import routes 

//app
const app=express()

//db
mongoose
.connect(process.env.MONGO_URI, {
    useNewUrlParser:true,
    useCreateIndex:true, 
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => console.log("DB Connected"))
.catch((err)=>console.log("DB Connection error",err))

mongoose.connection.on("error", err => {
    console.log(`DB connection error: ${err.message}`);
});

//middleware
app.use(morgan("dev"))
app.use(bodyParser.json({limit:"2mb"}))
app.use(cors())

//routes middleware
fs.readdirSync('./routes').map((r)=>app.use('/api',require('./routes/'+r)))

//port
const port = process.env.PORT || 8000;
app.listen(port,()=>console.log(`Server is running on port ${port}`))


