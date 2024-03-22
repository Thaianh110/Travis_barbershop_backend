const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const { generalAccessToken, generalRefreshToken } = require("./JwtService")
const createUser = async(newUser) => {
    return new Promise(async (resolve,reject) => {
        const {name,email,password,confirmPassword,phone} = newUser
        try{
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser !== null){
                resolve ({
                    status:"ERR",
                    message:"The email is already"
                })
            }
            const hash=bcrypt.hashSync(password,10);
            const createUser = await User.create({
                name,
                email,
                password: hash,
                confirmPassword: hash,
                phone
            })
            if(createUser){
                resolve({
                    status: 'OK',
                    message: 'succes',
                    data: createUser
                })
            }
            resolve({})
        }catch(e){
            reject(e)
        }
    })
}
// apI  đăng nhập người dùng
const loginUser = async(newUser) => {
    return new Promise(async (resolve,reject) => {
        const {email,password} = newUser
        try{
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser === null){
                resolve ({
                    status:"ERR",
                    message:"The user is not defined"
                })
            }
            const comparePassword = bcrypt.compareSync(password,checkUser.password)
            console.log('comparePassword',comparePassword)
            if(!comparePassword){
                resolve({
                    status:"ERR",
                    message:"the password or user is incorrect"
                })
            }
            const access_token = await generalAccessToken({
                id: checkUser.id,
                isAdmin:checkUser.isAdmin
            })
            const refresh_token = await generalRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            resolve({
                    status: 'OK',
                    message: 'succes',
                    access_token,
                    refresh_token
                
        })
            
        }catch(e){
            reject(e)
        }
    })
}
// api update user
const updateUser = async(id,data) => {
    return new Promise(async (resolve,reject) => {
        try{
            const checkUser = await User.findOne({
                _id: id
            })
            console.log('checkUser',checkUser);
            if(checkUser === null){
                resolve ({
                    status:"OK",
                    message:"The user is not defined"
                })
            }
            const userUpdate = await User.findByIdAndUpdate(id,data,{ new: true})
            
            resolve({
                    status: 'OK',
                    message: 'succes',
                   data: userUpdate
        })
            
        }catch(e){
            reject(e)
        }
    })
}
const deleteUser = async(id) => {
    return new Promise(async (resolve,reject) => {
        try{
            const checkUser = await User.findOne({
                _id: id
            })
            
            if(checkUser === null){
                resolve ({
                    status:"OK",
                    message:"The user is not defined"
                })
            }
            const userDelete = await User.findByIdAndDelete(id)
            console.log('userDelete',userDelete)
            resolve({
                    status: 'OK',
                    message: 'delete user succes',
        })
            
        }catch(e){
            reject(e)
        }
    })
}
const getAllUser = async(id) => {
    return new Promise(async (resolve,reject) => {
        try{
            const allUser = await User.find()
            resolve({
                    status: 'OK',
                    message: 'select all user succes',
                    data: allUser
        })
            
        }catch(e){
            reject(e)
        }
    })
}
const getDetailsUser = async(id) => {
    return new Promise(async (resolve,reject) => {
        try{
            const user = await User.findOne({
                _id: id
            })
            
            if(user === null){
                resolve ({
                    status:"OK",
                    message:"The user is not defined"
                })
            }
            resolve({
                    status: 'OK',
                    message: 'Succes',
                    data: user
        })
            
        }catch(e){
            reject(e)
        }
    })
}
module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser
}