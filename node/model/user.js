const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    createTime:{
        type:Number,
        default: new Date().getTime()
    },
    sex:{
        type:Boolean
    },
    age:{
        type:String
    },
    avatar:{
        type:String
    },
    status:{
        type:Boolean
    }
})

module.exports = mongoose.model('User',schema)