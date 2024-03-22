const mongoose = require('mongoose');
const userSchema = new mongoose.Schema( 
    {
        name : {type: String , require: true},
        email: {type: String , require: true},
        password: {type: String , require: true},
        isAdmin: {type: Boolean , default: false , require: false},
        phone: {type: Number },
        access_token: {type: String, require:true},
        refresh_token: {type: String,require:true} ,
    },
    {
        timestamps: true ,

    }
);
const User = mongoose.model('User', userSchema);

module.exports = User;