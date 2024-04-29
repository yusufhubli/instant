const express = require("express")
const mongoose = require("mongoose")
const dotenv = require('dotenv')
const cors = require("cors")
const authReducer = require('./routes/auth.js' )
const userReducer = require('./routes/users.js' )
const postReducer = require('./routes/posts.js' )
const { verifyToken } = require("./middleware/auth.js")
const cloudinary = require('cloudinary').v2
const fileUpload = require("express-fileupload")
  



const app = express()
dotenv.config()

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});
app.use(express.json())
app.use(cors())
app.listen(5000,()=>{
    console.log("server at 5000")
})


app.use(fileUpload({
    useTempFiles: true
}
))

app.use('/auth',authReducer)
app.use('/user',userReducer)
app.use('/posts',postReducer)

mongoose.connect(process.env.MONGO_URL,{
    dbName:"instant"
}).then(()=>{
    console.log('db is connected')
}).catch(err=>{
    console.log(err)
})


