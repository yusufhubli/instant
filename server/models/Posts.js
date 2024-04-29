const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    },
    Image:String,
    PublicId:String,
    Description:String,
    CreatedAt:{
        type:Date,
        default:Date.now()
    },
    Likes:[
       {
        _id:false,
        UserId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Users"
        }
       }
    ],
    DisLikes:[
        {
            _id:false,
         UserId:{
             type:mongoose.Schema.Types.ObjectId,
             ref:"Users"
         }
        }
     ],
     Comments:[
        {
         _id:false,
         UserId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Users"
        },
         comment:String,
        
        }
     ],
})

const Posts = mongoose.model("Posts",postSchema)
//export default Posts
module.exports = Posts