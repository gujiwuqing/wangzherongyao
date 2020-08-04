const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name:{
        type:String
    },
    icon:{
        type:String
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
module.exports = mongoose.model('Article',schema)