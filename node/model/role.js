const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name:{
        type:String
    },
    typeId:{
        type:String
    }
})
module.exports = mongoose.model('Role',schema)