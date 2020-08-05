const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name:{
        type:String
    },
    phone:{
        type:String
    },
    sex:{
        type:String
    },
    age:{
        type:Number
    },
    status:{
        type:Boolean
    },
    avatar:{
        type:String
    },
    createTime:{
        type:Number,
        default: new Date().getTime()
    }
})
module.exports = mongoose.model('Role',schema)