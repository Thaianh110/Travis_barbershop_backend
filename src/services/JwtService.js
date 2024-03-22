const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
dotenv.config()
 const generalAccessToken = async (payload) => {
    const access_token = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN,{expiresIn:"1h"})
    return access_token
}
// cap lai token moi
const generalRefreshToken = async (payload) => {
    console.log('payload',payload)
    const refresh_token = jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN,{expiresIn:"365d"})
    return refresh_token
}
const refreshTokenJwtService =(token) => {
    return new Promise((resolve,reject) =>{
        try {
            jwt.verify(token,process.env.REFRESH_TOKEN, async(err,user) =>{
                if(err){
                    console.log('err',err)
                    resolve ({
                        status: "ERR",
                        message:"the authentication"
                    })
                }
                const {payload} = user
                const access_token = await generalAccessToken({
                    id: payload?.id,
                    isAdmin: payload?.isAdmin
                })
                resolve({
                    status:"OK",
                    message:"success",
                    access_token
                })
            })

        } catch (error) {
            
        }
    })
}
module.exports= {
    generalAccessToken,
    generalRefreshToken,
    refreshTokenJwtService
}