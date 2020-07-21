module.exports = app=>{
    const express = require('express')
    const router = express.Router()
    const Category = require('../model/category')
    const  verifyToken = require('../utils/verifyToken')
    const assert = require('http-assert')
    router.post('/category',verifyToken,async (req,res)=>{
        const {name} = req.body
        const model =  await Category.findOne({name})
        try {
            assert(name!='','401','名称不得为空')
            assert(!model,'401','该分类已存在')
            Category.create(req.body)
            res.send({
                status:200,
                msg:'创建成功'
            })
        }catch (err) {
            res.send({
                status:err.status,
                msg:err.message
            })
        }
    })



    app.use(router)
}