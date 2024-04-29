

const jwt = require('jsonwebtoken')

 const verifyToken = async(req,res,next) =>{
    try{
let token = req.header('Authorization')

if(!token){
    return res.status(400).send('access denied')
}
// if(token){
//     token = token.slice(7,token.length).trimLeft()
// }

if (token == process.env.AUTH_SECRET) {
    next()
}
}catch(err){
    res.status(400).json({error:err.message})
}
}

module.exports = verifyToken