const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")

dotenv.config()

const authMiddleWare = (req,res,next) =>{
    const token =req.headers.token.split(' ')[1]
    jwt.verify(token , process.env. ACCESS_TOKEN, function(err,user) {
        if(err){
            return res.status(404).json({
                message: "The authentic",
                status: "ERR"
            })
        }
        if(user.isAdmin) {
           next()
       }else{
        return res.status(404).json({
            message: "The authentic",
            status: "ERR"
        })
       }

    });  
}
const authUserMiddleWare = (req,res,next) =>{
    const token =req.headers.token.split(' ')[1]
    const userId= req.params.id
    jwt.verify(token , process.env. ACCESS_TOKEN, function(err,user) {
        if(err){
            return res.status(404).json({
                message: "The authentic",
                status: "ERR"
            })
        }
        if(user?.isAdmin || user?.id === userId ) {
           next()
       }else{
        return res.status(404).json({
            message: "The authentic",
            status: "ERR"
        })
       }

    });  
}

module.exports = { 
    authMiddleWare,
    authUserMiddleWare
}