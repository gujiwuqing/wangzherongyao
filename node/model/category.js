const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name:{
        type:String
    },
    parentName:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    createTime:{
        type:Number,
        default:new Date().getTime()
    },
    updateTime:{
        type:Number,
        default:new Date().getTime()
    }
})
module.exports = mongoose.model('Category',schema)