const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    UserName: String,
    Avatar: {
        type:String,
        default:""
    },
    PublicId: {
        type:String,
        default:""
    },
    Password: String,
    Email: String,
    Age: Number,
    DOB: Date,
    Bio: String,
    City: String,
    State: String,
    Following:[
        {  
            _id:false,
            UserId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Users"
            }
        }
       ],
       Followers:[
        {   _id:false,
            UserId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Users"
            }
        }
       ],
    Profile:{
        type:Boolean,
        default:true
    },
    CreatedAt: {
        type: Date,
        default: Date.now()
    }
})

const Users = mongoose.model("Users", userSchema) || mongoose.models("Users")
module.exports =Users