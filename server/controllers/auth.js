const Users = require("../models/Users.js")
const bcrypt = require("bcrypt")

 const login =async(req,res)=>{
    try {
        const {Email,Password} = req.body
        const user = await Users.findOne({Email:Email})
       // console.log(user)
        if(user){
            res.status(200).json(user._id)
        }else{
           res.status(201).json({message:"user does not exist"})
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

 const register =async(req,res)=>{
   // console.log(req.body)
    try {
        const {UserName,Email,Password} = req.body
        const user = await Users.findOne({Email:Email})
        //console.log(user)
        if(user){
            res.status(200).json({message:"user already exist"})
        }else{
            const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(Password,salt)
            const newuser = await Users.create({UserName,Email,Password:passwordHash})
            const follow = await Follows.create({UserId:newuser._id})
            res.status(200).json(newuser._id)
        }

    } catch (error) {
        res.status(400).json(error)
    }
}

 const logout =async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = {register,login,logout}