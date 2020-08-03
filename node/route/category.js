module.exports = app=>{
    const express = require('express')
    const router = express.Router()
    const Category = require('../model/category')
    const  verifyToken = require('../utils/verifyToken')
    const assert = require('http-assert')
    router.post('/category/add',verifyToken,async (req,res)=>{
        const {name} = req.body
        console.log(req.body)
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

    router.post('/category/list',verifyToken,async(req,res)=>{
        
        const pageNo = Number(req.body.pageNo)
        const pageSize =Number(req.body.pageSize)
        const skip =( pageNo-1)*pageSize
        console.log(skip)
        try {
            assert(pageNo!=''||pageSize!='','401','参数不得为空')
            const list1 = await Category.find()
            const count = list1.length
            const list = await Category.find().populate('parentName').skip(skip).limit(pageSize)
            res.send({
                status:200,
                msg:'',
                list:list,
                count:count
            })
        }catch (err) {
            res.send({
                status:err.status,
                msg:err.message
            })
        }
       
    })

    router.post('/category/optionList',verifyToken,async(req,res)=>{
        const {pageNo,pageSize}  = req.body
        console.log(pageSize,pageNo)
        const model = await Category.find()
        console.log(model)
        res.send({
            status:'200',
            msg:'',
            list:model
        })
    })


    app.use(router)
}