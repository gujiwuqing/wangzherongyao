module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const Category = require('../model/category')
    const verifyToken = require('../utils/verifyToken')
    const assert = require('http-assert')

    router.get('/category/info',verifyToken,async(req,res)=>{
        const {id} = req.query
        const model = await Category.findById({_id:id})
        res.send({
            status: 200,
            msg: '',
            model:model
        })
    })


    router.post('/category/add', verifyToken, async (req, res) => {
        const {
            name
        } = req.body
        console.log(req.body)
        const model = await Category.findOne({
            name
        })
        try {
            assert(name != '', '401', '名称不得为空')
            assert(!model, '401', '该分类已存在')
            Category.create(req.body)
            res.send({
                status: 200,
                msg: '创建成功'
            })
        } catch (err) {
            res.send({
                status: err.status,
                msg: err.message
            })
        }
    })

    router.post('/category/list', verifyToken, async (req, res) => {

        const pageNo = Number(req.body.pageNo)
        const pageSize = Number(req.body.pageSize)
        const skip = (pageNo - 1) * pageSize
        try {
            assert(pageNo != '' || pageSize != '', '401', '参数不得为空')
            const list1 = await Category.find()
            const count = list1.length
            const list = await Category.find().populate('parentName').skip(skip).limit(pageSize)
            res.send({
                status: 200,
                msg: '',
                list: list,
                count: count
            })
        } catch (err) {
            res.send({
                status: err.status,
                msg: err.message
            })
        }

    })

    router.post('/category/optionList', verifyToken, async (req, res) => {
        const {
            pageNo,
            pageSize
        } = req.body
        const model = await Category.find()
        res.send({
            status: 200,
            msg: '',
            list: model
        })
    })

    router.post('/category/delete', verifyToken, async (req, res) => {
        const {
            id
        } = req.body
        await Category.findByIdAndDelete(id, req.body)
        res.send({
            status: 200,
            msg: '删除成功',
        })
    })


    router.post('/category/update',verifyToken,async(req,res)=>{
        const {_id} = req.body
        const model =  await Category.findByIdAndUpdate({_id},req.body,{new:true})
        res.send({
            status: 200,
            msg: '更新成功',
            model:model
        })
    })

    app.use(router)
}