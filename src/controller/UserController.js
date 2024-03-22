const UserService = require('../services/UserService');
const JwtService =require("../../src/services/JwtService");
const createUser = async(req,res) => {
    try{
        console.log(req.body);
        const {name,email,password,confirmPassword} = req.body
        const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
        const isCheckEmail=reg.test(email);
        if(!email || !password || !confirmPassword){
            return res.status(200).json({
                status:"ERR",
                message:"The input required"
            })
        }else if(!isCheckEmail){
            return res.status(200).json({
                status:"ERR",
                message:"The email is already"
            })
        }else if(password !== confirmPassword){
            return res.status(200).json({
                status:"ERR",
                message:"The password is not equal confirm password"
            })
        }
        console.log('isCheckEmail',isCheckEmail);
        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}
const loginUser = async(req,res) => {
    try{
        console.log(req.body);
        const {email,password} = req.body
        const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
        const isCheckEmail=reg.test(email);

        if(!email || !password ){
            return res.status(200).json({
                status:"ERR",
                message:"The input required"
            })
        }else if(!isCheckEmail){
            return res.status(200).json({
                status:"ERR",
                message:"The input is email"
            })
        }
        console.log('isCheckEmail',isCheckEmail);
        const response = await UserService.loginUser(req.body)
        const {refresh_token, ...newRespone }= response
        res.cookie('refresh-token',refresh_token, {
            HttpOnly: true,
            Secure:true
        })
        return res.status(200).json(newRespone)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}
const updateUser = async(req,res) => {
    try{
        const userId = req.params.id 
        const data = req.body
        if(!userId){
            return res.status(200).json({
                status: "ERR",
                message: "the userId is required"
            })
        }
        const response = await UserService.updateUser(userId,data)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}
const deleteUser = async(req,res) => {
    try{
        const userId = req.params.id 
        if(!userId){
            return res.status(200).json({
                status: "ERR",
                message: "the userId is required"
            })
        }
        const response = await UserService.deleteUser(userId)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}
const getAllUser = async(req,res) => {
    try{
        const response = await UserService.getAllUser() 
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}
const getDetailsUser = async(req,res) => {
    try{
        const userId = req.params.id 
        if(!userId){
            return res.status(200).json({
                status: "ERR",
                message: "the userId is required"
            })
        }
        const response = await UserService.getDetailsUser(userId)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const refreshToken = async (req,res) =>{
    try {
        const token= req.cookies.refresh_token
        if(!token){
            return res.status(200).json({
                status: "ERR",
                message: "the token is required"
            })
        }
        const response = await JwtService.refreshTokenJwtService(token)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken
}