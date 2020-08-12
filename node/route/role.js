module.exports = app=>{
    const express = require('express')
    const router  = express.Router()
    const verifyToken = require('../utils/verifyToken')
    const assert = require('http-assert')
    const Role = require('../model/role')
    router.post('/role/add',verifyToken,async(req,res)=>{
        const {name} = req.body
        const model1 = await Role.findOne({name})
        console.log(model1)
        try {
            assert(name != '', '401', '名称不得为空')
            assert(!model1, '401', '该分类已存在')
            await Role.create(req.body)
            res.send({
                status: 200,
                msg: '添加成功',
            })
        } catch (err) {
            res.send({
                status: err.status,
                msg: err.message
            })
        }
    })

    router.post('/role/list',verifyToken,async(req,res)=>{
        const list = await Role.find()
        console.log(list)
        res.send({
            status: 200,
            msg: '添加成功',
            list:list
        })
    })
    

    app.use(router)
}